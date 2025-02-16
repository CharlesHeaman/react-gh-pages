import { ChangeEvent, useEffect, useState } from "react";
import ActionButton from "../../../../components/form/ActionButton/ActionButton";
import FormErrorMessage from "../../../../components/form/FormErrorMessage/FormErrorMessage";
import PostcodeInput from "../../../../components/form/PostcodeInput/PostcodeInput";
import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput";
import MapsMap from "../../../../components/maps/MapsMap";
import MapsMarker from "../../../../components/maps/MapsMarker";
import getMapLatLng from "../../../../components/maps/utils/getMapLatLng";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { Coordinates } from "../../../../types/sites.types";
import { CreateUserAttributes } from "../../../../types/user.types";

const UserHomeForm = (props: {
    userDetails: CreateUserAttributes,
    updateCoordinates: (coordinates: Coordinates) => void,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
}) => {
    // Map States
    const [map, setMap] = useState<google.maps.Map>();
    const [coordinates, setCoordinates] = useState<Coordinates | undefined>(props.userDetails.coordinates);

    const getCoordinates = () => {
        getMapLatLng(`${props.userDetails.address}, ${props.userDetails.postcode}`, (coordinates) => {
            setCoordinates(coordinates);
            props.updateCoordinates(coordinates);
        })
    }

    useEffect(() => {
        if (map) {
            coordinates && map.panTo(coordinates);
        }
    }, [coordinates]);
    
    return (
        <section>
            <InfoGrid>                
                <GridItem title='Address' span={4}>
                    <TextareaInput
                        minRows={3}
                        name="address"
                        label="Address"
                        value={props.userDetails.address}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}      
                        autoFocus                  
                        required
                    />
                </GridItem>
                <GridItem title='Postcode' span={2}>
                    <PostcodeInput
                        name="postcode"
                        value={props.userDetails.postcode}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}                        
                        required
                    />
                </GridItem>
                <GridItem title='Latitude/Longitude' span={4}>
                    <p>{coordinates ? `${coordinates.lat}, ${coordinates.lng}` : 'Unknown'}</p>
                </GridItem>
                <GridItem span={2}>
                    <FormErrorMessage 
                        text="Please geocode location"
                        show={props.showErrors && props.userDetails.coordinates.lat === 0}
                    />
                    <ActionButton 
                        text={"Geocode Location"} 
                        color={"dark-blue"} 
                        iconFont="my_location" 
                        clickFunc={getCoordinates}
                    />
                </GridItem>
                <GridItem>
                    <MapsMap
                        onLoad={(map: google.maps.Map) => {
                            setMap(map)
                            getCoordinates();
                        }}
                        maxHeight={500}
                    >
                        {/* User Marker */}
                        {coordinates ? <MapsMarker 
                            title={''} 
                            coordinates={coordinates} 
                            iconCode={"\ue0af"}
                            onDragEnd={(event) => {
                                event.latLng && setCoordinates({
                                    lat: event.latLng.lat(),
                                    lng: event.latLng.lng()
                                })
                            }}
                        /> : null}
                    </MapsMap>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default UserHomeForm