import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound"
import { EquipmentResponseData } from "../../../../types/equipment.types"
import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import findEquipment from "../../../../utils/findEquipment"
import QuotedEquipmentRow from "./QuotedEquipmentRow"

const ServiceQuoteQuotedEquipment = (props: {
    quotedEquipment: Array<QuotedEquipmentResponseData>,
    equipment: Array<EquipmentResponseData>,
    quoteLines: Array<QuoteLineResponseData>
}) => {
    return (
        <>
            <section>
                <h2>Quoted Equipment</h2>
                {props.quotedEquipment.length > 0 ?
                    <div className="table-wrapper">
                        <table className="selectTable">
                            <thead>
                                <th>Equipment</th>
                                <th>Location</th>
                                <th>Description</th>
                                <th>Quote</th>
                                <th>Labour</th>
                                <th>Type</th>
                                <th>Status</th>
                            </thead>
                            <tbody>
                                {props.quotedEquipment.map((quotedEquipment, index) => 
                                    <QuotedEquipmentRow
                                        quotedEquipment={quotedEquipment}
                                        equipment={findEquipment(props.equipment, quotedEquipment.data.equipment_id ? quotedEquipment.data.equipment_id : 0)}
                                        quoteLines={props.quoteLines}
                                        key={index}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div> :
                    <InnerContainer>
                        <NoneFound 
                            iconFont={"local_laundry_service"} 
                            text={"No Quoted Equipment Found"}
                            small
                        />
                    </InnerContainer>
                }
            </section>
        </>
    )
}

export default ServiceQuoteQuotedEquipment