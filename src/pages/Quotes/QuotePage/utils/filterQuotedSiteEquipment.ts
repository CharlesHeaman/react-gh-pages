import { QuoteLineResponseData } from "../../../../types/quoteLine.types"

const filterQuotedSiteEquipment = (quoteLines: Array<QuoteLineResponseData>, siteID: number | null) => {
    return quoteLines.filter(quoteLine => 
        quoteLine.data.site_id === siteID && 
        quoteLine.data.is_equipment
    )
}

export default filterQuotedSiteEquipment