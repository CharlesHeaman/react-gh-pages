import BooleanLabel from "../../../../../../../../../components/ui/BooleanLabel/BooleanLabel"
import TicketLink from "../../../../../../../../../components/ui/Links/TicketLink"
import { SiteListNoteResponseData } from "../../../../../../../../../types/siteListNotes.types"
import { TicketResponseData } from "../../../../../../../../../types/tickets.types"
import formatDate from "../../../../../../../../../utils/formatDate"

const EquipmentReportPlannedMaintenanceTicketRow = (props: {
    ticket: TicketResponseData | undefined,
    siteListNote: SiteListNoteResponseData
}) => {
    return (
        <tr>
            <td>{formatDate(props.siteListNote.data_updated_at)}</td>
            <td>{props.ticket ? <TicketLink ticketType={1} number={props.ticket.data.number} suffix={props.ticket.data.suffix}/> : null}</td>
            <td><BooleanLabel true={props.siteListNote.data.is_work_required}/></td>
        </tr>
    )
}

export default EquipmentReportPlannedMaintenanceTicketRow