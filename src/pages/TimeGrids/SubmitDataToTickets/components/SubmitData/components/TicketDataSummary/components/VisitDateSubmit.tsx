import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem"
import { TicketResponseData } from "../../../../../../../../types/tickets.types"
import formatDate from "../../../../../../../../utils/formatDate"
import { ProcessTicket } from "../../../../../ProcessTimegridPage"

const VisitDateSubmit = (props: {
    ticket: TicketResponseData
    processTicketData: Array<ProcessTicket>,
}) => {
    const getProcessTicket = (ticketID: number, ticketType: number) => {
        return props.processTicketData.find((processTicket) => processTicket.ticket_id === ticketID && processTicket.ticket_type === ticketType)
    }

    const getVisitDate = () => {
        const processTicket = getProcessTicket(props.ticket.id, props.ticket.data.ticket_type);
        if (processTicket !== undefined) {
            return formatDate(processTicket.visit_date)
        }
        return ''
        
    }
    return (
        <GridItem title="Visit Date" span={2}>
            <p>{getVisitDate()}</p>
        </GridItem>
    )
}

export default VisitDateSubmit