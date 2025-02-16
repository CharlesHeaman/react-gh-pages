import { Marker } from "@react-google-maps/api"
import { Coordinates } from "../../types/sites.types"

const MapsMarker = (props: {
    title: string,
    coordinates: Coordinates,
    iconCode: string,
    onDragEnd?: (event: google.maps.MapMouseEvent) => void
}) => {
    return (
        <Marker
            position={props.coordinates}
            label={{
                text: props.iconCode,
                fontFamily: "Material Icons",
                color: "#ffffff",
                fontSize: "18px",
            }}
            title={props.title}
            draggable={props.onDragEnd !== undefined}
            onDragEnd={props.onDragEnd}
        ></Marker>
    )
}

export default MapsMarker