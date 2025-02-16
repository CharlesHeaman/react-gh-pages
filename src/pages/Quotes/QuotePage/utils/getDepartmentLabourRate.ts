import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types";
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types";

const getQuotedEquipmentLabourRate = (quotedEquipment: QuotedEquipmentResponseData | QuotedSiteResponseData, isMate: boolean, isOutOfHours: boolean, isDoubleTime: boolean): number => {
    const baseRate = !isMate ? quotedEquipment.data.engineer_rate : quotedEquipment.data.mate_rate;
    const multiplier: number = isDoubleTime ? 2 : isOutOfHours ? 1.5 : 1;

    return baseRate * multiplier;
}

export default getQuotedEquipmentLabourRate