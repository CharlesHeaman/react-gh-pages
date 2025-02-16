import { useState, useEffect } from "react"
import MapsMap from "../../../../../components/maps/MapsMap"
import MapsMarker from "../../../../../components/maps/MapsMarker"
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { Site } from "../../../../../types/sites.types"

const SiteLocationInformation = (props: {
    siteData: Site,
    isPreview?: boolean
}) => {
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (map) {
            props.siteData.coordinates && map.panTo(props.siteData.coordinates);
        }
    }, [map, props.siteData.coordinates]);
    
    return (
        <section>
            <h2>Location Information</h2>
            <InfoGrid>
                <GridItem title='Address' span={4}>
                    <p>{props.siteData.address}</p>
                </GridItem>
                <GridItem title='Postcode' span={2}>
                    <p>{props.siteData.postcode}</p>
                </GridItem>
                <GridItem title="Latitude/Longitude">
                    <p>{props.siteData.coordinates ?
                        `${props.siteData.coordinates.lat}, ${props.siteData.coordinates.lng}` :
                        'Unknown'
                    }</p>
                </GridItem>
                <GridItem>
                    <MapsMap
                        onLoad={(map: google.maps.Map) => setMap(map)}
                        maxHeight={300}
                    >
                        {/* Site Marker */}
                        {props.siteData.coordinates ? <MapsMarker 
                            title={props.siteData.code} 
                            coordinates={props.siteData.coordinates} 
                            iconCode={"\ue0af"}
                        /> : null}
                    </MapsMap>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default SiteLocationInformation