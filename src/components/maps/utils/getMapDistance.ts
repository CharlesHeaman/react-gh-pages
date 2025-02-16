import { Dispatch, SetStateAction } from "react";
import { Coordinates } from "../../../types/sites.types";

const getMapDirections = (
    origin: Coordinates,
    destination: Coordinates,
    setter: Dispatch<SetStateAction<google.maps.DistanceMatrixResponse | null | undefined>>,
) => {
    const DistanceMatrixService = new google.maps.DistanceMatrixService();
    DistanceMatrixService.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
            setter(result)
        } else {
            console.error(`error fetching directions ${result}`);
        }
    });
}

export default getMapDirections