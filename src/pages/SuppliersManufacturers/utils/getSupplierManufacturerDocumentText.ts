const getSupplierManufacturerDocumentText = (documentType: number): string => {
    
    switch (documentType) {
        case 1:
            return 'Insurance';
        case 2:
            return 'Review';
        default:
            return 'Qualification';
    }
}

export default getSupplierManufacturerDocumentText