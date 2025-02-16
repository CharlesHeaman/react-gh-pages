import { ContractResponseData } from "../types/contract.types";

const countCustomerContracts = (contracts: Array<ContractResponseData>, customerID: number): number => {
    return contracts.filter(contract => contract.data.customer_id === customerID).length;
}

export default countCustomerContracts