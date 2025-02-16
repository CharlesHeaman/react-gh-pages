import { QuoteResponseData } from './../../../types/quote.types';

const filterDepartmentQuotes = (quotes: Array<QuoteResponseData>, departmentID: number): Array<QuoteResponseData> => {
    return quotes.filter(quote => quote.data.department_id === departmentID)
}

export default filterDepartmentQuotes