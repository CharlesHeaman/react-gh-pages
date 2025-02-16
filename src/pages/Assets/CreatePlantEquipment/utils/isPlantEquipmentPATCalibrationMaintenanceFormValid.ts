import { CreateAssetAttributes } from "../../../../types/asset.types";

const isPlantEquipmentPATCalibrationMaintenanceFormValid = (plantEquipmentDetails: CreateAssetAttributes): boolean => {
    
    const requiredPATest = plantEquipmentDetails.requires_pa_test;
    const enteredVolts = plantEquipmentDetails.pa_test_volts.length > 0;
    const enteredAmps = plantEquipmentDetails.pa_test_volts.length > 0;
    const requiredCalibration = plantEquipmentDetails.requires_calibration;
    const enteredError = plantEquipmentDetails.acceptable_tolerance.length > 0;
    const requiredMaintenance = plantEquipmentDetails.requires_maintenance;
    const maintainedExternally = plantEquipmentDetails.maintained_externally;
    const maintainerEntered = plantEquipmentDetails.external_maintainer.length > 0;
   
    return (
        (!requiredPATest || (
            enteredVolts && 
            enteredAmps
        )) &&
        (!requiredCalibration || enteredError) &&
        (!requiredMaintenance || (
            (!maintainedExternally || maintainerEntered)
        ))
    )
   
}

export default isPlantEquipmentPATCalibrationMaintenanceFormValid