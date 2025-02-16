import { QuoteResponseData } from "../types/quote.types";

const findQuotedEquipment = (quotedEquipment: Array<QuoteResponseData>, quoteNumber: number, departmentID: number): QuoteResponseData | undefined => {
    return quotedEquipment.find(quote => 
        quote.data.department_id === departmentID && 
        quote.data.number === quoteNumber.toString()
    )
}

export default findQuotedEquipment