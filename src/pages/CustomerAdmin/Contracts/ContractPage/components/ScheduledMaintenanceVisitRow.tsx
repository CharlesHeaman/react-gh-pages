import ExpiryDateLabel from "../../../../../components/ui/ExpiryDateLabel/ExpiryDateLabel"
import Label from "../../../../../components/ui/General/Label/Label"
import { ScheduledMaintenanceVisitsResponseData } from "../../../../../types/scheduledMaintenanceVisits.types"
import formatDate from "../../../../../utils/formatDate"

const ScheduledMaintenanceVisitRow = (props: {
    visitNumber: number,
    scheduledVisit: ScheduledMaintenanceVisitsResponseData | undefined,
    previewDate?: Date,
    isPreview?: boolean,
}) => {
    return (
        <tr>
            <td>Visit No. {props.visitNumber}</td>
            {!props.isPreview ? <>
                <td>{props.scheduledVisit ? 
                    !props.scheduledVisit.data.is_created ? <ExpiryDateLabel date={new Date(props.scheduledVisit.data.visit_date)}/> : formatDate(new Date(props.scheduledVisit.data.visit_date)) : 
                    'Unknown'
                }</td>
                <td>{props.scheduledVisit ? 
                    props.scheduledVisit.data.is_created ?
                        <Label text="Tickets Created" color="light-green" iconFont="done"/> :
                        <Label text="Pending Creation" color="light-blue" iconFont="pending"/> 
                    : 'Unknown'
                }</td>
            </> : 
                <td>{props.previewDate ? <ExpiryDateLabel date={props.previewDate}/> : 'Unknown'}</td>
            }
        </tr>
    )
}

export default ScheduledMaintenanceVisitRow