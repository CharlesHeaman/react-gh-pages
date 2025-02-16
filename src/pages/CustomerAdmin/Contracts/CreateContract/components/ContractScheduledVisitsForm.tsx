import { Dispatch, SetStateAction } from "react";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import ScheduledMaintenanceVisitEditRow from "./ScheduledMaintenanceVisitEditRow";

const ContractScheduleVisitsForm = (props: {
    visitsPerYear: number,
    scheduledVisits: Array<Date>,
    setScheduledVisits: Dispatch<SetStateAction<Array<Date>>>,
    showErrors: boolean,
}) => {

    const updateScheduledVisits = (date: Date, index: number) => {
        const newScheduledVisits = [...props.scheduledVisits];
        newScheduledVisits[index] = date;
        props.setScheduledVisits(newScheduledVisits);
    }

    return (
        <section>
            <InfoGrid>
                <GridItem>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Visit Number</th>
                                    <th>Visit Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(props.visitsPerYear)].map((_, index) => 
                                    <ScheduledMaintenanceVisitEditRow
                                        date={props.scheduledVisits[index]}
                                        visitNumber={index + 1}
                                        updateScheduledVisits={updateScheduledVisits}
                                        key={index}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>
                </GridItem> 
            </InfoGrid>
        </section>
    )
}

export default ContractScheduleVisitsForm