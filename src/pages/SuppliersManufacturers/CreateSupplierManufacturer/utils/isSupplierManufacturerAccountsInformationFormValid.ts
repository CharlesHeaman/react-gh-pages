import { CreateSupplierManufacturerAttributes } from "../../../../types/supplierManufacturer.types";
import isEmailValid from "../../../../utils/isEmailValid";
import isTelephoneValid from "../../../../utils/isTelephoneValid";

const isSupplierManufacturerAccountsInformationFormValid = (supplierManufacturerDetails: CreateSupplierManufacturerAttributes): boolean => {
    const emailEntered = supplierManufacturerDetails.accounts_email.length > 0;
    const emailValid = isEmailValid(supplierManufacturerDetails.accounts_email);
    const telephoneEntered = supplierManufacturerDetails.accounts_telephone.length > 0;
    const telephoneValid = isTelephoneValid(supplierManufacturerDetails.accounts_telephone);
    const addressEntered = supplierManufacturerDetails.remittance_address.length > 0;

    return (
        emailEntered &&
        emailValid &&
        telephoneEntered &&
        telephoneValid &&
        addressEntered
    )
   
}

export default isSupplierManufacturerAccountsInformationFormValid