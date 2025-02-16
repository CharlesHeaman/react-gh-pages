import { QuoteLineResponseData } from "../../../../types/quoteLine.types"

const filterQuotedEquipmentMaterials = (quoteLines: Array<QuoteLineResponseData>, equipmentID: number | null) => {
    return quoteLines.filter(quoteLine => 
        quoteLine.data.equipment_id === equipmentID && 
        !quoteLine.data.is_equipment
    )
}

export default filterQuotedEquipmentMaterials