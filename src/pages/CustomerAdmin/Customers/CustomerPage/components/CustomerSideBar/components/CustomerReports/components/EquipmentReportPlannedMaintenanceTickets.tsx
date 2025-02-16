import InnerContainer from "../../../../../../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../../../../../../../components/ui/General/NoneFound/NoneFound"
import { SiteListNoteResponseData } from "../../../../../../../../../types/siteListNotes.types"
import { TicketResponseData } from "../../../../../../../../../types/tickets.types"
import findTicket from "../../../../../../../../../utils/findTicket"
import EquipmentReportPlannedMaintenanceTicketRow from "./EquipmentReportPlannedMaintenanceTicketRow"

const EquipmentReportPlannedMaintenanceTickets = (props: {
    tickets: Array<TicketResponseData>,
    siteListNotes: Array<SiteListNoteResponseData>
}) => {
    console.log(props.tickets)
    return (
        props.siteListNotes.length > 0 ? <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Ticket</th>
                    <th>Work Required</th>
                </tr>
            </thead>
            <tbody>
                {props.siteListNotes.map((siteListNote, index) => 
                    <EquipmentReportPlannedMaintenanceTicketRow
                        ticket={findTicket(props.tickets, siteListNote.data.ticket_id, 1)}
                        siteListNote={siteListNote}
                        key={index}
                    />
                )}
            </tbody>
        </table> : 
        <InnerContainer>
            <NoneFound
                iconFont="local_activity"
                text={`No tickets found`}
                small
            />
        </InnerContainer>
    )
}

export default EquipmentReportPlannedMaintenanceTickets