import { ChangeEvent, Dispatch, SetStateAction } from "react"
import GridItem from "../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { TicketResponseData } from "../../../../../../types/tickets.types"
import { UserResponseData } from "../../../../../../types/user.types"
import { InvoiceTicketTime } from "../../../ProcessTimegridPage"
import DistributeInvoiceTicketTimeRow from "./DistributeInvoiceTicketTimeRow"

const DistributeInvoiceTicketTime = (props: {
    invoiceTicketTime: Array<InvoiceTicketTime>,
    setInvoiceTicketTime: Dispatch<SetStateAction<Array<InvoiceTicketTime>>>,
    ticketData: Array<TicketResponseData>,
    userData: UserResponseData
}) => {
    const getReducedUInvoiceTicketTime = () => {
        return props.invoiceTicketTime.reduce((reducedInvoiceTicketTime: ReducedInvoiceTicketTime, invoiceTicketTime) => {
            return { 
                on_site_time: reducedInvoiceTicketTime.on_site_time + invoiceTicketTime.on_site_time,
                travel_time: reducedInvoiceTicketTime.travel_time + invoiceTicketTime.travel_time,
                mileage: reducedInvoiceTicketTime.mileage + invoiceTicketTime.mileage,
                expenses: reducedInvoiceTicketTime.expenses + invoiceTicketTime.expenses
            }
        }, {
            on_site_time: 0,
            travel_time: 0,
            mileage: 0,
            expenses: 0
        })
    }

    const updateInvoiceTicketData = (event: ChangeEvent<HTMLInputElement>, ticketID: number, ticketType: number) => { 
        props.setInvoiceTicketTime(prevState => 
            prevState.map((invoiceTicketTime) => {
                if (invoiceTicketTime.ticket_id === ticketID && invoiceTicketTime.ticket_type === ticketType) {
                    return {
                        ...invoiceTicketTime,
                        [event.target.name]: parseFloat(event.target.value)
                    }
                }
                return invoiceTicketTime
            })
        )
    }

    const updateInvoiceTicketDataRate = (isMateRate: boolean, ticketID: number, ticketType: number) => { 
        props.setInvoiceTicketTime(prevState => 
            prevState.map((invoiceTicketTime) => {
                if (invoiceTicketTime.ticket_id === ticketID && invoiceTicketTime.ticket_type === ticketType) {
                    return {
                        ...invoiceTicketTime,
                        is_mate_rate: isMateRate
                    }
                }
                return invoiceTicketTime
            })
        )
    }

    const getTicketInvoiceTicketTime = (ticketID: number, ticketType: number) => {
        return props.invoiceTicketTime.find((invoiceTicketTime) => 
            invoiceTicketTime.ticket_id === ticketID && 
            invoiceTicketTime.ticket_type === ticketType
        );
    }

    interface ReducedInvoiceTicketTime {
        on_site_time: number,
        travel_time: number,
        mileage: number,
        expenses: number
    }

    return (
        <section>
            <InfoGrid>
                <GridItem>
                    <table>
                        <thead>
                            <tr>
                                <th>Ticket</th>
                                <th>Rate</th>
                                <th>On-site</th>
                                <th>Travel</th>
                                <th>Miles</th>
                                <th>Expenses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.ticketData.map((ticket, index) => 
                                <DistributeInvoiceTicketTimeRow
                                    ticket={ticket}
                                    invoiceTicketTime={getTicketInvoiceTicketTime(ticket.id, ticket.data.ticket_type)}
                                    updateInvoiceTicketData={updateInvoiceTicketData}
                                    updateInvoiceTicketDataRate={updateInvoiceTicketDataRate}
                                    key={index}
                                />
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <th>{getReducedUInvoiceTicketTime().on_site_time} hrs</th>
                                <th>{getReducedUInvoiceTicketTime().travel_time} hrs</th>
                                <th>{getReducedUInvoiceTicketTime().mileage} mi</th>
                                <th>£{getReducedUInvoiceTicketTime().expenses}</th>
                            </tr>
                        </tfoot>
                    </table>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default DistributeInvoiceTicketTime