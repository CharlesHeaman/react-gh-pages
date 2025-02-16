import { useEffect, useState } from "react";
import MapsMap from "../../../../../../components/maps/MapsMap";
import MapsMarker from "../../../../../../components/maps/MapsMarker";
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { SiteResponseData } from "../../../../../../types/sites.types";

const ViewSiteOnMap = (props: {
    site: SiteResponseData,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (map) {
            props.site.data.coordinates && map.panTo(props.site.data.coordinates);
        }
    }, [map, props.site.data.coordinates]);

    return (
        <>
            <WindowOverlay
                title='Site on Map'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={800}
                top
            >
                <MapsMap
                    onLoad={(map: google.maps.Map) => setMap(map)}
                    maxHeight={600}
                >
                    {/* Site Marker */}
                    {props.site.data.coordinates ? <MapsMarker 
                        title={props.site.data.code} 
                        coordinates={props.site.data.coordinates} 
                        iconCode={"\ue0af"}
                    /> : null}
                </MapsMap>
            </WindowOverlay>            
        </>
    )
}

export default ViewSiteOnMap