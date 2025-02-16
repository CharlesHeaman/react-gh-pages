import { CreateUserAttributes } from "../../../../../types/user.types";
import isPostcodeValid from "../../../../../utils/isPostcodeValid";

const isUserHomeFormValid = (userDetails: CreateUserAttributes): boolean => {
    const addressEntered = userDetails.address.length > 0;
    const postcodeEntered = userDetails.postcode.length > 0;
    const postcodeValid = isPostcodeValid(userDetails.postcode);
    const latLngEntered = userDetails.coordinates.lat !== 0 && userDetails.coordinates.lng !== 0;
   
    return (
        addressEntered &&
        postcodeEntered && 
        postcodeValid && 
        latLngEntered
    )
   
}

export default isUserHomeFormValid