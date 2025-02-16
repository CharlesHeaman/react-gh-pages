import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import getQuotedEquipmentTotalValue from "../components/getQuotedEquipmentTotalValue"
import filterQuotedSiteMaterials from "./filterQuotedSiteMaterials"

const getMaintenanceQuoteTotalValue = (quotedSite: Array<QuotedSiteResponseData>, quoteLines: Array<QuoteLineResponseData>): number => {
    return quotedSite.reduce((totalHours, quotedSite) => {
        return totalHours + getQuotedEquipmentTotalValue(quotedSite, filterQuotedSiteMaterials(quoteLines, quotedSite.data.site_id))
    }, 0)
}

export default getMaintenanceQuoteTotalValue