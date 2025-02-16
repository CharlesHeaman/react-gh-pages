import { CreateSiteAttributes } from "../../../../../types/sites.types";
import isPostcodeValid from "../../../../../utils/isPostcodeValid";

const isSiteLocationFormValid = (siteDetails: CreateSiteAttributes): boolean => {
    const addressEntered = siteDetails.address.length > 0;
    const postcodeEntered = siteDetails.postcode.length > 0;
    const postcodeValid = isPostcodeValid(siteDetails.postcode);
    const latLngEntered = siteDetails.coordinates.lat !== 0 && siteDetails.coordinates.lng !== 0;
   
    return (
        addressEntered &&
        postcodeEntered && 
        postcodeValid && 
        latLngEntered
    )
   
}

export default isSiteLocationFormValid