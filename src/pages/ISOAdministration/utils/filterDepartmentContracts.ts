import { ContractResponseData } from './../../../types/contract.types';

const filterDepartmentContracts = (contracts: Array<ContractResponseData>, departmentID: number): Array<ContractResponseData> => {
    return contracts.filter(contract => contract.data.department_id === departmentID)
}

export default filterDepartmentContracts