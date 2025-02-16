import { DepartmentResponseData } from "../../../types/department.types";
import { CreateEquipmentTypeAttributes } from "../../../types/equipmentType.types";

const isEquipmentTypeDetailsFormValid = (equipmentTypeDetails: CreateEquipmentTypeAttributes, departmentData: Array<DepartmentResponseData>): boolean => {

    const nameEntered = equipmentTypeDetails.name.length > 0;
    const serviceTimeEntered = equipmentTypeDetails.service_duration.length > 0;
    const slaveQuantityEntered = equipmentTypeDetails.slave_quantity.length > 0;

    return (
        nameEntered &&
        serviceTimeEntered &&
        slaveQuantityEntered && 
        departmentData.length > 0
    )
   
}

export default isEquipmentTypeDetailsFormValid