import { DepartmentResponseData } from "../types/department.types";

const findDepartment = (departments: Array<DepartmentResponseData>, departmentID: number): DepartmentResponseData | undefined => {
    return departments.find(department => department.id === departmentID)
}

export default findDepartment