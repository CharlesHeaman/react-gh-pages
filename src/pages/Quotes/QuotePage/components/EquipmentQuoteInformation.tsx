import { DepartmentResponseData } from "../../../../types/department.types"
import { EquipmentResponseData } from "../../../../types/equipment.types"
import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import EquipmentQuoteLabour from "./EquipmentQuoteLabour"
import EquipmentQuoteMaterials from "./EquipmentQuoteMaterials"
import EquipmentQuoteNumberOfVisits from "./EquipmentQuoteNumberOfVisits"
import EquipmentQuoteTextPreview from "./EquipmentQuoteTextPreview"
import EquipmentQuoteTotalBreakdown from "./EquipmentQuoteTotalBreakdown"
import EquipmentQuoteTravelAndMileage from "./EquipmentQuoteTravelAndMileage"
import QuotedEquipmentEquipmentDetails from "./QuotedEquipmentEquipmentDetails"
import QuotedEquipmentStatusDisplay from "./QuoteEquipmentStatusDisplay"

const EquipmentQuoteInformation = (props: {
    quotedEquipment: QuotedEquipmentResponseData,
    equipment: EquipmentResponseData | undefined,
    materialLines: Array<QuoteLineResponseData>,
    departmentData: DepartmentResponseData
}) => {
    return (
        <>
            <QuotedEquipmentStatusDisplay status={props.quotedEquipment.data.status}/>
            <EquipmentQuoteTotalBreakdown
                equipmentQuoteDetails={props.quotedEquipment}
                quoteLines={props.materialLines}
            />
            <hr/>
            {props.equipment ? <>
                <QuotedEquipmentEquipmentDetails equipment={props.equipment}/>
                <hr/>
            </> : null}
            <EquipmentQuoteTextPreview
                quotedEquipment={props.quotedEquipment}
                quoteLines={props.materialLines}
            />
            <hr/>
            <EquipmentQuoteMaterials
                quoteLines={props.materialLines}
            />
            <hr/>
            <EquipmentQuoteLabour
                equipmentQuoteDetails={props.quotedEquipment}
            />
            <hr/>
            <EquipmentQuoteNumberOfVisits
                equipmentQuoteDetails={props.quotedEquipment}
                dayMaxHours={props.departmentData.data.day_max_hours}            
            />
            <hr/>
            <EquipmentQuoteTravelAndMileage
                equipmentQuoteDetails={props.quotedEquipment}
            />
        </>
    )
}

export default EquipmentQuoteInformation