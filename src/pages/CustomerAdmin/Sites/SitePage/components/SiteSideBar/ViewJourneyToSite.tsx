import { DirectionsRenderer } from "@react-google-maps/api";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import MapsMap from "../../../../../../components/maps/MapsMap";
import MapsMarker from "../../../../../../components/maps/MapsMarker";
import getMapDirections from "../../../../../../components/maps/utils/getMapDirections";
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { Coordinates, SiteResponseData } from "../../../../../../types/sites.types";
import getMapDistance from "../../../../../../components/maps/utils/getMapDistance";
import InfoGrid from "../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import GridItem from "../../../../../../components/ui/Containers/GridItem/GridItem";
import formatMiles from "../../../../../../utils/formatMiles";
import formatHours from "../../../../../../utils/formatHours";
import SubmitButton from "../../../../../../components/form/SubmitButton/SubmitButton";

const ViewJourneyToSite = (props: {
    site: SiteResponseData,
    show: boolean,
    hideFunc: () => void,
    showCopy?: boolean,
    distanceSetter?: Dispatch<SetStateAction<google.maps.DistanceMatrixResponse | null | undefined>>,
}) => {
    const [map, setMap] = useState<google.maps.Map>();
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>();
    const [distance, setDistance] = useState<google.maps.DistanceMatrixResponse | null>();

    const onLoad = useCallback((map: google.maps.Map) => {
        if (props.site.data.coordinates === null) return;
        getMapDirections(
            companyLocation,
            props.site.data.coordinates,
            setDirections
        );
        getMapDistance(
            companyLocation,
            props.site.data.coordinates,
            setDistance
        );
        setMap(map)
    }, []);

    const returnDistance = () => {
        props.distanceSetter && props.distanceSetter(distance);
        props.hideFunc();
    }

    useEffect(() => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            props.site.data.coordinates && bounds.extend(props.site.data.coordinates);
            bounds.extend({ lng: parseFloat(process.env.REACT_APP_WORK_LNG as string), lat: parseFloat(process.env.REACT_APP_WORK_LAT as string) });
            map.fitBounds(bounds, 30);
        }
    }, []);

    const companyLocation: Coordinates = { lng: parseFloat(process.env.REACT_APP_WORK_LNG as string), lat: parseFloat(process.env.REACT_APP_WORK_LAT as string) };

    return (
        <>
            <WindowOverlay
                title={`Journey from ${process.env.REACT_APP_COMPANY_NAME}`}
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={800}
                footer={props.showCopy ? <SubmitButton
                    text="Copy to Costing"
                    iconFont="content_copy"
                    clickFunc={returnDistance}
                /> : null}
                top
            >
                <InfoGrid>
                    <GridItem title='Mileage' span={2}>
                        <p>{formatMiles(distance ? distance.rows[0].elements[0].distance.value / 1609.34 : 0)} mi</p>
                    </GridItem>
                    <GridItem title='Travel Time' span={2}>
                        <p>{formatHours(distance ? distance.rows[0].elements[0].duration.value / (60 * 60) : 0)} hrs</p>
                    </GridItem>
                    <GridItem>
                        <MapsMap
                            onLoad={onLoad}
                            maxHeight={600}
                        >
                            {/* Site Marker */}
                            {props.site.data.coordinates ? <MapsMarker 
                                title={props.site.data.code} 
                                coordinates={props.site.data.coordinates} 
                                iconCode={"\ue0af"}
                            /> : null}
                            {/* Company Marker */}
                            {props.site.data.coordinates ? <MapsMarker 
                                title={process.env.REACT_APP_COMPANY_NAME as string} 
                                coordinates={companyLocation} 
                                iconCode={"\uf030"}
                            /> : null}                      
                            {/* Directions */}
                            {directions ? <DirectionsRenderer
                                directions={directions}
                                options={{
                                    markerOptions: {
                                        visible: false
                                    }
                                }}
                            /> : null}
                        </MapsMap>
                    </GridItem>
                </InfoGrid>
            </WindowOverlay>            
        </>
    )
}

export default ViewJourneyToSite