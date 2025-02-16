import { SupplierContactResponseData } from "../types/supplierContact.types";

const countSupplierContacts = (supplierContacts: Array<SupplierContactResponseData>, supplierID: number): number => {
    return supplierContacts.filter(supplierContacts => supplierContacts.data.supplier_manufacturer_id === supplierID).length;
}

export default countSupplierContacts