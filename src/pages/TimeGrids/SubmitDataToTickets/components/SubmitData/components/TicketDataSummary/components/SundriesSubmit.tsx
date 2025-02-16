import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem"
import { ProductResponseData } from "../../../../../../../../types/products.types"
import { TicketResponseData } from "../../../../../../../../types/tickets.types"
import { ProcessTicket } from "../../../../../ProcessTimegridPage"

const SundriesSubmit = (props: {
    ticket: TicketResponseData,
    sundriesData: Array<ProductResponseData>,
    processTicketData: Array<ProcessTicket>,
}) => {
    const getShowSundries = (ticketID: number, ticketType: number) => {
        const sundries = getProcessTicket(ticketID, ticketType)?.sundries
        return (sundries !== undefined && sundries.length > 0)
    }

    const getProcessTicket = (ticketID: number, ticketType: number) => {
        return props.processTicketData.find((processTicket) => processTicket.ticket_id === ticketID && processTicket.ticket_type === ticketType)
    }

    return (        
        getShowSundries(props.ticket.id, props.ticket.data.ticket_type) ?
            <GridItem title='Sundries'>
                <table>
                    <thead>
                        <tr>
                            <th>Quantity</th>
                            <th>Description</th>
                            <th>Size or Model</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getProcessTicket(props.ticket.id, props.ticket.data.ticket_type)?.sundries.map((sundry, index) => 
                            <tr style={{ fontSize: '0.85em'}} key={index}>
                                <td>{sundry.quantity}</td>
                                <td className="text-left">{props.sundriesData.find((product => product.id === sundry.product_id))?.data.description}</td>
                                <td className="text-left">{props.sundriesData.find((product => product.id === sundry.product_id))?.data.size_or_model}</td>
                            </tr>
                        )}
                    </tbody>
                </table> 
            </GridItem> :
            null
        
    )
}

export default SundriesSubmit