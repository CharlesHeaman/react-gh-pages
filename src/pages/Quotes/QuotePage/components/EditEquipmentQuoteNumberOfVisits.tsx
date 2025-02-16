import { ChangeEvent } from "react"
import getEditLabourTypeMaxHours from "../utils/getEditLabourTypeMaxHours"
import getQuoteMateCount from "../utils/getQuoteMateCount"
import { EditEquipmentQuote, EditQuoteLabour, EditQuoteVisits } from "./QuotedEquipmentTab"
import EditEquipmentQuoteVisitsRow from "./EditEquipmentQuoteVisitsRow"
import getQuoteEngineerCount from "../utils/getQuoteEngineerCount"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound"

const EditEquipmentQuoteNumberOfVisits = (props: {
    equipmentQuoteDetails: EditEquipmentQuote,
    quoteLabour: Array<EditQuoteLabour>,
    quoteVisits: Array<EditQuoteVisits>,
    dayMaxHours: number,
    updateQuoteVisits: (quoteVisits: EditQuoteVisits | undefined, event: ChangeEvent<HTMLInputElement>) => void,
}) => {
    const showEngineer = getQuoteEngineerCount(props.equipmentQuoteDetails) > 0;
    const showMate = getQuoteMateCount(props.equipmentQuoteDetails) > 0;

    return (
        <section>
            <h2>Number of Visits</h2>
            {showEngineer || showMate ? 
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <th>Visit Type</th>
                            <th>Max Hours</th>
                            <th>Calculated Days</th>
                            <th>Visits</th>
                        </thead>
                        <tbody>
                            {showEngineer && <> 
                                <EditEquipmentQuoteVisitsRow
                                    quoteVisits={props.quoteVisits[0]}
                                    maxHours={getEditLabourTypeMaxHours(props.quoteLabour, false, false, false)}
                                    dayLength={props.dayMaxHours}
                                    updateQuoteVisits={props.updateQuoteVisits}
                                />
                                {props.equipmentQuoteDetails.is_out_of_hours && <EditEquipmentQuoteVisitsRow
                                    quoteVisits={props.quoteVisits[1]}
                                    maxHours={getEditLabourTypeMaxHours(props.quoteLabour, false, true, false)}
                                    dayLength={props.dayMaxHours}
                                    updateQuoteVisits={props.updateQuoteVisits}
                                />}
                                {props.equipmentQuoteDetails.is_double_time && <EditEquipmentQuoteVisitsRow
                                    quoteVisits={props.quoteVisits[2]}
                                    maxHours={getEditLabourTypeMaxHours(props.quoteLabour, false, false, true)}
                                    dayLength={props.dayMaxHours}
                                    updateQuoteVisits={props.updateQuoteVisits}
                                />}
                            </>}
                            {showMate && <>
                                <EditEquipmentQuoteVisitsRow
                                    quoteVisits={props.quoteVisits[3]}
                                    maxHours={getEditLabourTypeMaxHours(props.quoteLabour, true, false, false)}
                                    dayLength={props.dayMaxHours}
                                    updateQuoteVisits={props.updateQuoteVisits}
                                />
                                {props.equipmentQuoteDetails.is_out_of_hours && <EditEquipmentQuoteVisitsRow
                                    quoteVisits={props.quoteVisits[4]}
                                    maxHours={getEditLabourTypeMaxHours(props.quoteLabour, true, true, false)}
                                    dayLength={props.dayMaxHours}
                                    updateQuoteVisits={props.updateQuoteVisits}
                                />}
                                {props.equipmentQuoteDetails.is_double_time && <EditEquipmentQuoteVisitsRow
                                    quoteVisits={props.quoteVisits[5]}
                                    maxHours={getEditLabourTypeMaxHours(props.quoteLabour, true, false, true)}
                                    dayLength={props.dayMaxHours}
                                    updateQuoteVisits={props.updateQuoteVisits}
                                />}
                            </>}
                        </tbody>
                    </table>
                </div> :
                <InnerContainer>
                    <NoneFound
                        iconFont="timeline"
                        text="No visits found"
                        small
                    />
                </InnerContainer>
            }
        </section>
    )
}

export default EditEquipmentQuoteNumberOfVisits