import { SupplierDoc } from "./supplierDocs.types";

export interface Supplier {
    id: number,
    fullName: string,
    email: string,
    docs: Array<SupplierDoc>
}