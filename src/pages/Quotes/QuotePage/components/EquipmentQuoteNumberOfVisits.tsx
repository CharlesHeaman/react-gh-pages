import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer";
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound";
import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types";
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types";
import getLabourTypeMaxHours from "../utils/getLabourTypeMaxHours";
import EquipmentQuoteVisitsRow from "./EquipmentQuoteVisitsRow";

const EquipmentQuoteNumberOfVisits = (props: {
    equipmentQuoteDetails: QuotedEquipmentResponseData | QuotedSiteResponseData,
    dayMaxHours: number,
}) => {
    const showEngineer = props.equipmentQuoteDetails.data.number_of_engineers > 0;
    const showMate = props.equipmentQuoteDetails.data.number_of_mates > 0;

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
                                <EquipmentQuoteVisitsRow
                                    quoteVisits={props.equipmentQuoteDetails.data.visits[0]}
                                    maxHours={getLabourTypeMaxHours(props.equipmentQuoteDetails.data.labour, false, false, false)}
                                    dayLength={props.dayMaxHours}
                                />
                                {props.equipmentQuoteDetails.data.is_out_of_hours && <EquipmentQuoteVisitsRow
                                    quoteVisits={props.equipmentQuoteDetails.data.visits[1]}
                                    maxHours={getLabourTypeMaxHours(props.equipmentQuoteDetails.data.labour, false, true, false)}
                                    dayLength={props.dayMaxHours}
                                />}
                                {props.equipmentQuoteDetails.data.is_double_time && <EquipmentQuoteVisitsRow
                                    quoteVisits={props.equipmentQuoteDetails.data.visits[2]}
                                    maxHours={getLabourTypeMaxHours(props.equipmentQuoteDetails.data.labour, false, false, true)}
                                    dayLength={props.dayMaxHours}
                                />}
                            </>}
                            {showMate && <>
                                <EquipmentQuoteVisitsRow
                                    quoteVisits={props.equipmentQuoteDetails.data.visits[3]}
                                    maxHours={getLabourTypeMaxHours(props.equipmentQuoteDetails.data.labour, true, false, false)}
                                    dayLength={props.dayMaxHours}
                                />
                                {props.equipmentQuoteDetails.data.is_out_of_hours && <EquipmentQuoteVisitsRow
                                    quoteVisits={props.equipmentQuoteDetails.data.visits[4]}
                                    maxHours={getLabourTypeMaxHours(props.equipmentQuoteDetails.data.labour, true, true, false)}
                                    dayLength={props.dayMaxHours}
                                />}
                                {props.equipmentQuoteDetails.data.is_double_time && <EquipmentQuoteVisitsRow
                                    quoteVisits={props.equipmentQuoteDetails.data.visits[5]}
                                    maxHours={getLabourTypeMaxHours(props.equipmentQuoteDetails.data.labour, true, false, true)}
                                    dayLength={props.dayMaxHours}
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

export default EquipmentQuoteNumberOfVisits