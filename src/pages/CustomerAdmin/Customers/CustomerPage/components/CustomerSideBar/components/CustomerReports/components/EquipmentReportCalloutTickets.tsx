import InnerContainer from "../../../../../../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../../../../../../../components/ui/General/NoneFound/NoneFound"
import { TicketInvoiceRequestCollectionResponse } from "../../../../../../../../../types/TicketInvoiceRequest.types"
import { TicketResponseData } from "../../../../../../../../../types/tickets.types"
import filterTicketsTicketInvoiceRequests from "../../../../../../../../../utils/filterTicketInvoiceRequestsByID"
import findTicketInvoiceRequest from "../../../../../../../../../utils/findTicketInvoiceRequest"
import formatMoney from "../../../../../../../../../utils/formatMoney"
import reduceTicketInvoiceRequestValue from "../../../../../../../../../utils/reduceTicketInvoiceRequestValue"
import EquipmentReportCalloutTicketRow from "./EquipmentReportCalloutTicketRow"

const EquipmentReportCalloutTickets = (props: {
    tickets: Array<TicketResponseData>,
    invoiceRequests: TicketInvoiceRequestCollectionResponse,
}) => {

    const invoiceRequestIDs: Array<number | undefined> = props.tickets.map(ticket => findTicketInvoiceRequest(props.invoiceRequests.data, ticket.data.number, ticket.data.department_id)?.id)
    console.log(invoiceRequestIDs)
    const filteredInvoiceRequests = filterTicketsTicketInvoiceRequests(props.invoiceRequests.data, invoiceRequestIDs)

    return (
        props.tickets.length > 0 ? 
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Ticket</th>
                        <th>Job Description</th>
                        <th>Invoice Value</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tickets.map((ticket, index) => 
                        <EquipmentReportCalloutTicketRow
                            ticket={ticket}
                            invoiceRequest={findTicketInvoiceRequest(props.invoiceRequests.data, ticket.data.number, ticket.data.department_id)}
                            key={index}
                        />
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th className="text-right">{formatMoney(reduceTicketInvoiceRequestValue(filteredInvoiceRequests))}</th>
                    </tr>
                </tfoot>
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

export default EquipmentReportCalloutTickets