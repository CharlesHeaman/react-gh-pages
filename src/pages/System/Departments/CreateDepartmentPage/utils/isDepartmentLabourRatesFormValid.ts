import { CreateDepartmentAttributes } from "../../../../../types/department.types";

const isDepartmentLabourRatesFormValid = (departmentDetails: CreateDepartmentAttributes): boolean => {

    const engineerRateEntered = departmentDetails.engineer_rate.length > 0;
    const mateRateEntered = departmentDetails.mate_rate.length > 0;
    const mileageRateEntered = departmentDetails.mileage_rate.length > 0;
    const materialMarkupEntered = departmentDetails.material_markup.length > 0;
    const subcontractMarkupEntered = departmentDetails.subcontract_markup.length > 0;
    const hireMarkupEntered = departmentDetails.hire_markup.length > 0;
   
    return (
        engineerRateEntered && 
        mateRateEntered && 
        mileageRateEntered && 
        materialMarkupEntered && 
        subcontractMarkupEntered && 
        hireMarkupEntered 
    )   
}

export default isDepartmentLabourRatesFormValid