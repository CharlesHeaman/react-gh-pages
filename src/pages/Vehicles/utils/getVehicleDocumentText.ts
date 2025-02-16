const getVehicleDocumentText = (documentType: number): string => {
    
    switch (documentType) {
        case 1:
            return 'Tax';
        case 2:
            return 'Garage';
        default:
            return 'MOT';
    }
}

export default getVehicleDocumentText