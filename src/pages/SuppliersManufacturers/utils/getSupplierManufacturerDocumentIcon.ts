const getSupplierManufacturerDocumentIcon = (documentType: number): string => {
    
    switch (documentType) {
        case 1:
            return 'assignment';
        case 2:
            return 'assignment_turned_in';
        default:
            return 'assignment_ind';
    }
}

export default getSupplierManufacturerDocumentIcon