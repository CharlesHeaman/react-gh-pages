import { useSearchParams } from "react-router-dom"
import NewEquipmentLink from "../../../../components/ui/Links/NewEquipmentLink"
import { EquipmentResponseData } from "../../../../types/equipment.types"
import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import formatHours from "../../../../utils/formatHours"
import formatMoney from "../../../../utils/formatMoney"
import InvoiceTicketTimeRateLabel from "../../../Invoices/InvoiceTicketTimeRateLabel"
import LabourTypeLabel from "../../../Invoices/LabourTypeLabel"
import QuotedEquipmentStatusLabel from "../../components/QuotedEquipmentStatusLabel"
import filterQuotedEquipmentMaterials from "../utils/filterQuotedEquipmentMaterials"
import getQuotedEquipmentMaxHours from "../utils/getQuotedEquipmentMaxHours"
import getQuotedEquipmentTotalValue from "./getQuotedEquipmentTotalValue"

const QuotedEquipmentRow = (props: {
    quotedEquipment: QuotedEquipmentResponseData,
    equipment: EquipmentResponseData | undefined,
    quoteLines: Array<QuoteLineResponseData>,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateLocation = (quotedEquipmentID: number | null) => {
        if (quotedEquipmentID) {
            searchParams.set('quoted_equipment_id', quotedEquipmentID.toString());
        } else {
            searchParams.delete('quoted_equipment_id');
        }
        setSearchParams(searchParams);
    } 

    const filteredMaterialLines = filterQuotedEquipmentMaterials(props.quoteLines, props.equipment ? props.equipment.id : null);
    
    return (
        <tr
            onClick={(event) => {
                event.preventDefault()
                updateLocation(props.quotedEquipment.id)
            }}
        >
            <td className="text-left">{props.equipment ? <NewEquipmentLink code={props.equipment.data.code}/> : 'Unknown'}</td>
            <td className="text-left">{props.equipment ? props.equipment.data.location : 'Unknown'}</td>
            <td className="text-left">{props.equipment ? props.equipment.data.description : 'Unknown'}</td>
            <td>{formatMoney(getQuotedEquipmentTotalValue(props.quotedEquipment, filteredMaterialLines))}</td>
            <td>{formatHours(getQuotedEquipmentMaxHours(props.quotedEquipment))} hrs</td>
            <td>
                <div className="flex">
                    <LabourTypeLabel isMate={props.quotedEquipment.data.number_of_mates > 0} hideText/>
                    {props.quotedEquipment.data.is_out_of_hours && <InvoiceTicketTimeRateLabel isOverTime={true} isDoubleTime={false} hideText/>}
                    {props.quotedEquipment.data.is_double_time && <InvoiceTicketTimeRateLabel isOverTime={true} isDoubleTime={true} hideText/>}
                </div>
            </td>
            <td><QuotedEquipmentStatusLabel 
                status={props.quotedEquipment.data.status}
                hideText
            /></td>
        </tr>
    )
}

export default QuotedEquipmentRow