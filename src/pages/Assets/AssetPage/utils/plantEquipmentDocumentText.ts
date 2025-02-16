const getPlantEquipmentDocumentText = (documentType: number): string => {
    
    switch (documentType) {
        case 1:
            return 'Calibration';
        case 2:
            return 'Inspection';
        case 3:
            return 'Maintenance';
        default:
            return 'PAT';
    }
}

export default getPlantEquipmentDocumentText