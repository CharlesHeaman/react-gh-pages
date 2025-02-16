const getPlantEquipmentDocumentIcon = (documentType: number): string => {
    
    switch (documentType) {
        case 1:
            return 'compass_calibration';
        case 2:
            return 'assignment_turned_in';
        case 3:
            return 'home_repair_service';
        default:
            return 'domain_verification';
    }
}

export default getPlantEquipmentDocumentIcon