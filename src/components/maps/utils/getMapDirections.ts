import { Dispatch, SetStateAction } from "react";
import { Coordinates } from "../../../types/sites.types";

const getMapDirections = (
    origin: Coordinates,
    destination: Coordinates,
    setter: Dispatch<SetStateAction<google.maps.DirectionsResult | null | undefined>>,
) => {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            setter(result);
        } else {
            console.error(`error fetching directions ${result}`);
        }
    });
}

export default getMapDirections