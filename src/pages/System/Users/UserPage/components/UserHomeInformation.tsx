import { useState, useEffect } from "react"
import MapsMap from "../../../../../components/maps/MapsMap"
import MapsMarker from "../../../../../components/maps/MapsMarker"
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { User } from "../../../../../types/user.types"

const UserHomeInformation = (props: {
    userData: User
}) => {

    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (map) {
            props.userData.coordinates && map.panTo(props.userData.coordinates);
        }
    }, [map, props.userData.coordinates]);

    return (
        <section>
            <h2>Home</h2>
            <InfoGrid>
                <GridItem title='Address' span={4}>
                    <p>{props.userData.address}</p>
                </GridItem>
                <GridItem title='Postcode' span={2}>
                    <p>{props.userData.postcode}</p>
                </GridItem>
                <GridItem title="Latitude/Longitude">
                <p>{props.userData.coordinates ?
                    `${props.userData.coordinates.lat}, ${props.userData.coordinates.lng}` :
                    'Unknown'
                }</p>
                </GridItem>
                <GridItem>
                    <MapsMap
                        onLoad={(map: google.maps.Map) => setMap(map)}
                        maxHeight={300}
                    >
                        {/* Site Marker */}
                        {props.userData.coordinates ? <MapsMarker 
                            title="Home" 
                            coordinates={props.userData.coordinates} 
                            iconCode={"\ue0af"}
                        /> : null}
                    </MapsMap>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default UserHomeInformation