import { Coordinates } from "../../../types/sites.types";

const getMapLatLng = (
    address: string,
    resFunc: (coordinates: Coordinates) => void,
) => {
    const GeocodeService = new google.maps.Geocoder();
    GeocodeService.geocode({
        address: address
    }, (result) => {
        if (result && result.length > 0) {
            resFunc({
                lat: result[0].geometry.location.lat(),
                lng: result[0].geometry.location.lng(),
            })
        } else {
            console.error(`error geocoding ${result}`);
        }
    });
}

export default getMapLatLng