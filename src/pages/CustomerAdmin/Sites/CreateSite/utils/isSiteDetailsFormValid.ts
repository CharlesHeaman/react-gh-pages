import { CreateSiteAttributes } from "../../../../../types/sites.types";
import isTelephoneValid from "../../../../../utils/isTelephoneValid";

const isSiteDetailsFormValid = (siteDetails: CreateSiteAttributes, codeUnique: boolean, departmentID: number | undefined): boolean => {
    const nameEntered = siteDetails.name.length > 0;
    const codeEntered = siteDetails.code.length > 0;
    const locationEntered = siteDetails.location.length > 0;
    const descriptionEntered = siteDetails.description.length > 0;
    const telephoneEntered = siteDetails.telephone.length > 0
    const telephoneValid = isTelephoneValid(siteDetails.telephone);
   
    return (
        codeUnique &&
        nameEntered &&
        codeEntered &&
        telephoneEntered && 
        telephoneValid && 
        descriptionEntered &&
        locationEntered && 
        departmentID !== undefined
    )
   
}

export default isSiteDetailsFormValid