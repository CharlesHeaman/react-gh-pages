import { NonContractRatesResponseData } from "../types/nonContractRates.types";

const findNonContractRate = (nonContractRates: Array<NonContractRatesResponseData>, departmentID: number): NonContractRatesResponseData | undefined => {
    return nonContractRates.find(nonContractRate => nonContractRate.data.department_id === departmentID)
}

export default findNonContractRate