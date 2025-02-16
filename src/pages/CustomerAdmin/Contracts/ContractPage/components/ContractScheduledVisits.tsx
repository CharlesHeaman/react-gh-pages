import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import ContractLink from "../../../../../components/ui/Links/ContractLink"
import { ScheduledMaintenanceVisitsResponseData } from "../../../../../types/scheduledMaintenanceVisits.types"
import findScheduledMaintenanceVisit from "../../../../../utils/findScheduledMaintenanceVisits"
import ScheduledMaintenanceVisitRow from "./ScheduledMaintenanceVisitRow"

const ContractScheduledVisits = (props: {
    contractReferenceNumber?: string,
    visitsPerYear: number,
    scheduledVisits: Array<ScheduledMaintenanceVisitsResponseData>,
    previewDates?: Array<Date>,
    isPreview?: boolean
}) => {
    return (
        <section>
            <h2>Scheduled Maintenance Visits</h2>
            <InfoGrid>
                {props.contractReferenceNumber ? <GridItem title='Contract'>
                    <ContractLink referenceNumber={props.contractReferenceNumber}/>
                </GridItem> : null}
                <GridItem>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Visit Number</th>
                                    <th>Visit Date</th>
                                    {!props.isPreview && <th>Status</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(props.visitsPerYear)].map((_, index) => 
                                    <ScheduledMaintenanceVisitRow
                                        scheduledVisit={findScheduledMaintenanceVisit(props.scheduledVisits, index + 1)}
                                        visitNumber={index + 1}
                                        previewDate={props.previewDates ? props.previewDates[index] : undefined}
                                        isPreview={props.isPreview}
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

export default ContractScheduledVisits