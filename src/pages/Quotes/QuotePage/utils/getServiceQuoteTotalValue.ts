import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import getQuotedEquipmentTotalValue from "../components/getQuotedEquipmentTotalValue"
import filterQuotedEquipmentMaterials from "./filterQuotedEquipmentMaterials"

const getServiceQuoteTotalValue = (quotedEquipment: Array<QuotedEquipmentResponseData>, quoteLines: Array<QuoteLineResponseData>): number => {
    return quotedEquipment.reduce((totalHours, quotedEquipment) => {
        return totalHours + getQuotedEquipmentTotalValue(quotedEquipment, filterQuotedEquipmentMaterials(quoteLines, quotedEquipment.data.equipment_id))
    }, 0)
}

export default getServiceQuoteTotalValue