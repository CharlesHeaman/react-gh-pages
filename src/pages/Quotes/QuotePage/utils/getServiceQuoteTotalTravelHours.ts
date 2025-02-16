import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import getQuotedEquipmentMaxTravelHours from "./getQuotedEquipmentMaxTravelHours"

const getServiceQuoteTotalTravelHours = (quotedEquipment: Array<QuotedEquipmentResponseData>): number => {
    return quotedEquipment.reduce((totalHours, quotedEquipment) => {
        return totalHours + getQuotedEquipmentMaxTravelHours(quotedEquipment)
    }, 0)
}

export default getServiceQuoteTotalTravelHours