import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem"
import { TicketResponseData } from "../../../../../../../../types/tickets.types"
import { ProcessTicket } from "../../../../../ProcessTimegridPage"

const CustomerViewableReportSubmit = (props: {
    ticket: TicketResponseData
    processTicketData: Array<ProcessTicket>,
}) => {
    const getShowCustomerViewableReport = () => {
        const processTicket = getProcessTicket(props.ticket.id, props.ticket.data.ticket_type);
        if (processTicket === undefined) return false;
        return processTicket.report.length > 0
    }
    const getProcessTicket = (ticketID: number, ticketType: number) => {
        return props.processTicketData.find((processTicket) => processTicket.ticket_id === ticketID && processTicket.ticket_type === ticketType)
    }
    return (
        getShowCustomerViewableReport() ? 
            <GridItem title='Customer Viewable Report'>
                <p>{getProcessTicket(props.ticket.id, props.ticket.data.ticket_type)?.report}</p>
            </GridItem>
            : null
    )
}

export default CustomerViewableReportSubmit