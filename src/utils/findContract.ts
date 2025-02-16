import { ContractResponseData } from "../types/contract.types"

const findContract = (contracts: Array<ContractResponseData>, contractID: number): ContractResponseData | undefined => {
    return contracts.find(contract => contract.id === contractID)
}

export default findContract