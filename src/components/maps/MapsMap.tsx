import { GoogleMap, LoadScript } from "@react-google-maps/api"
import { ReactNode } from "react"

const MapsMap = (props: {
    children?: ReactNode,
    onLoad?: (map: google.maps.Map) => void,
    maxHeight?: number
}) => {
    return (
         <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
        > 
            <GoogleMap
                mapContainerStyle={{
                    flexGrow: '1',
                    minHeight: `${props.maxHeight ? props.maxHeight : 800}px`
                }}
                center={{
                    lat: 51.8642,
                    lng: -2.2382
                }}
                options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                }}
                zoom={11}
                onLoad={props.onLoad}
            >
                {props.children}
            </GoogleMap>
        </LoadScript>
    )
}

export default MapsMap