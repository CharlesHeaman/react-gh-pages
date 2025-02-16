import { CreateSupplierManufacturerAttributes } from "../../../../types/supplierManufacturer.types";
import isPostcodeValid from "../../../../utils/isPostcodeValid";

const isSupplierManufacturerDetailsFormValid = (supplierManufacturerDetails: CreateSupplierManufacturerAttributes, codeUnique: boolean): boolean => {
    const nameEntered = supplierManufacturerDetails.name.length > 0;
    const codeEntered = supplierManufacturerDetails.code.length > 0;
    const addressEntered = supplierManufacturerDetails.address.length > 0;
    const postcodeEntered = supplierManufacturerDetails.postcode.length > 0;
    const postcodeValid = isPostcodeValid(supplierManufacturerDetails.postcode);

    return (
        codeUnique &&
        nameEntered &&
        codeEntered &&
        addressEntered &&
        postcodeEntered &&
        postcodeValid 
    )
   
}

export default isSupplierManufacturerDetailsFormValid