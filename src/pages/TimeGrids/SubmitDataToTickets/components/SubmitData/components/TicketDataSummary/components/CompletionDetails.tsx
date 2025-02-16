import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem"
import Label from "../../../../../../../../components/ui/General/Label/Label"
import { TicketResponseData } from "../../../../../../../../types/tickets.types"
import formatDate from "../../../../../../../../utils/formatDate"
import { ProcessTicket } from "../../../../../ProcessTimegridPage"

const CompletionDetails = (props: {
    ticket: TicketResponseData,
    processTicketData: Array<ProcessTicket>,
}) => {

    const getProcessTicketData = () => {
        const processTicketData = props.processTicketData.find((processTicket) => processTicket.ticket_id === props.ticket.id && processTicket.ticket_type === props.ticket.data.ticket_type);
        return processTicketData;
    }
    return (
        <>
            <GridItem title='Completion Date' span={2}>
                {getProcessTicketData()?.completion_date ? 
                    <p>{formatDate(new Date(getProcessTicketData()?.completion_date))}</p> :
                    <p>None</p>
                }
            </GridItem>
            <GridItem title="Further Work Required?" span={2}>
                {getProcessTicketData()?.is_further_work_required ? 
                    <Label text="Yes" color="light-green" iconFont="done"/> :
                    <Label text="No" color="red" iconFont="close"/>
                }
            </GridItem>
            <GridItem title='Ready for Invoicing?' span={2}>
                {getProcessTicketData()?.is_ready_for_invoicing ? 
                    <Label text="Yes" color="light-green" iconFont="done"/> :
                    <Label text="No" color="red" iconFont="close"/>
                }
            </GridItem>
        </>
    )
}

export default CompletionDetails 