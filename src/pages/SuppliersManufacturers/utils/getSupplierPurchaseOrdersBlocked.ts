import { SupplierManufacturerDocumentsResponseData } from "../../../types/supplierManufacturerDocuments.types"

const getSupplierPurchaseOrdersBlocked = (
    documents: Array<SupplierManufacturerDocumentsResponseData>
): boolean => {
    const blocksPODocuments = documents.filter(document => document.data.block_purchase_order);
    for (let documentIndex = 0; documentIndex < blocksPODocuments.length; documentIndex++) {
        const currentDocument = blocksPODocuments[documentIndex];
        if (
            new Date() > new Date(currentDocument.data.valid_to) ||
            new Date() < new Date(currentDocument.data.valid_from)
        ) return true;
    }
    return false;
}

export default getSupplierPurchaseOrdersBlocked