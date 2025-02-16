import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import getAllCodeSnippets, { CodeSnippet } from "../../../../utils/getAllCodeSnippets"
import replaceCodeSnippetsWithValues from "../../../../utils/replaceCodeSnippetsWithValues"
import getQuotedEquipmentTotalValue from "../components/getQuotedEquipmentTotalValue"

const getCodeSnippetReplacedEquipmentQuoteText = (
    quotedEquipment: QuotedEquipmentResponseData | QuotedSiteResponseData,
    quoteLines: Array<QuoteLineResponseData>,
): string => {

    const quoteText = quotedEquipment.data.quote_text;

    const associatedSnippetData = {
        equipmentQuote: {
            data: {
                ...quotedEquipment.data,
                value: getQuotedEquipmentTotalValue(quotedEquipment, quoteLines)
            }
        }
    }

    const codeSnippets: Array<CodeSnippet> = getAllCodeSnippets(quoteText, associatedSnippetData);
    console.log(codeSnippets)

    return replaceCodeSnippetsWithValues(quoteText, codeSnippets);
}

export default getCodeSnippetReplacedEquipmentQuoteText