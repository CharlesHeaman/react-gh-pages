const getSupplierManufacturerDocumentIcon = (documentType: number): string => {
    
    switch (documentType) {
        case 1:
            return 'fact_check';
        case 2:
            return 'car_repair';
        default:
            return 'garage';
    }
}

export default getSupplierManufacturerDocumentIcon