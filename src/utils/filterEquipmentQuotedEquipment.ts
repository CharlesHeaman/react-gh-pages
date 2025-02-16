import { QuotedEquipmentResponseData } from '../types/quotedEquipment.types';

const filterEquipmentQuotedEquipment = (quotedEquipment: Array<QuotedEquipmentResponseData>, equipment: number): Array<QuotedEquipmentResponseData> => {
    return quotedEquipment.filter(quotedEquipment => quotedEquipment.data.equipment_id === equipment)
}

export default filterEquipmentQuotedEquipment