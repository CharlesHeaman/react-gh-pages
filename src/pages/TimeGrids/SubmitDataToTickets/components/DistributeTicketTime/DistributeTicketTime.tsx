import { Dispatch, SetStateAction } from "react";
import { TicketResponseData } from "../../../../../types/tickets.types";
import { UserResponseData } from "../../../../../types/user.types";
import { InvoiceTicketTime } from "../../ProcessTimegridPage";
import DistributeInvoiceTicketTime from "./components/DistributeInvoiceTicketTime";

const DistributeTicketTime = (props: {
    invoiceTicketTime: Array<InvoiceTicketTime>,
    setInvoiceTicketTime: Dispatch<SetStateAction<Array<InvoiceTicketTime>>>,
    ticketData: Array<TicketResponseData>,
    userData: UserResponseData
}) => {
    return (
        <DistributeInvoiceTicketTime 
            invoiceTicketTime={props.invoiceTicketTime} 
            setInvoiceTicketTime={props.setInvoiceTicketTime} 
            ticketData={props.ticketData}        
            userData={props.userData}    
        />
    )
} 

export default DistributeTicketTime