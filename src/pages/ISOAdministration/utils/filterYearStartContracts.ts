import { ContractResponseData } from './../../../types/contract.types';

const filterYearStartContracts = (contracts: Array<ContractResponseData>, year: number): Array<ContractResponseData> => {
    return contracts.filter(contract =>  new Date(contract.data.start_at).getFullYear() === year)
}

export default filterYearStartContracts