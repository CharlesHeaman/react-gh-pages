import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import getQuotedEquipmentMaxHours from "./getQuotedEquipmentMaxHours"

const getServiceQuoteTotalHours = (quotedEquipment: Array<QuotedEquipmentResponseData>): number => {
    return quotedEquipment.reduce((totalHours, quotedEquipment) => {
        return totalHours + getQuotedEquipmentMaxHours(quotedEquipment)
    }, 0)
}

export default getServiceQuoteTotalHours