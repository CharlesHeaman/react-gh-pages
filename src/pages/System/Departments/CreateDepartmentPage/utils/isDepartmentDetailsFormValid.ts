import { CreateDepartmentAttributes } from "../../../../../types/department.types";

const isDepartmentDetailsFormValid = (departmentDetails: CreateDepartmentAttributes): boolean => {

    const nameEntered = departmentDetails.name.length > 0;
    const maxHoursEntered = departmentDetails.day_max_hours.length > 0;
   
    return (
        nameEntered &&
        maxHoursEntered
    )   
}

export default isDepartmentDetailsFormValid