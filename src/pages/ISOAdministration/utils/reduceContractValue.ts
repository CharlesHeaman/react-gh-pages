import { QuoteResponseData } from './../../../types/quote.types';

const reduceContractValue = (contracts: Array<QuoteResponseData>): number => {
    return contracts.reduce((value: number, contract) => {
        return value + contract.data.contract_value
    }, 0)
}

export default reduceContractValue