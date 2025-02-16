import { Dispatch, SetStateAction } from "react";
import { SupplierManufacturerCollectionResponse } from "../../../types/supplierManufacturer.types";
import getAPI from "../../../utils/getAPI";

const checkUniqueSupplierManufacturerCode = (
    code: string, 
    setCodeUnique: Dispatch<SetStateAction<boolean>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    supplierManufacturerID?: number,
) => {
    getAPI('suppliers_manufacturers', {
        code: code
    }, (response: any) => {
        const siteData: SupplierManufacturerCollectionResponse = response.data;
        const nonMatchingSupplierManufacturerID = siteData.data.filter(site => site.id !== supplierManufacturerID);
        setCodeUnique(nonMatchingSupplierManufacturerID.length === 0);
    }, setIsLoading)
}

export default checkUniqueSupplierManufacturerCode