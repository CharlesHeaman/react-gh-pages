import { CreateSupplierManufacturerAttributes } from "../../../../types/supplierManufacturer.types";
import isEmailValid from "../../../../utils/isEmailValid";
import isTelephoneValid from "../../../../utils/isTelephoneValid";
import isURLValid from "../../../../utils/isURLValid";

const isSupplierManufacturerContactInformationFormValid = (supplierManufacturerDetails: CreateSupplierManufacturerAttributes): boolean => {
    const emailEntered = supplierManufacturerDetails.email.length > 0;
    const emailValid = isEmailValid(supplierManufacturerDetails.email);
    const telephoneEntered = supplierManufacturerDetails.telephone.length > 0;
    const telephoneValid = isTelephoneValid(supplierManufacturerDetails.telephone);
    const websiteEntered = supplierManufacturerDetails.website_url.length > 0;
    const websiteValid = isURLValid(supplierManufacturerDetails.website_url);

    return (
        emailEntered && 
        emailValid &&
        telephoneEntered &&
        telephoneValid &&
        (!websiteEntered || websiteValid)
    )
   
}

export default isSupplierManufacturerContactInformationFormValid