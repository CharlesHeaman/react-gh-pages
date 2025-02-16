import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import TicketInvoiceTimeList from "../TicketInvoiceTime/components/TicketInvoiceTimeList";

const TicketLabour = (props: {
    ticketID: number,
    ticketType: number,
    tickets: Array<any>,
    invoiceTimeCount: number,
    getInvoiceTicketTime: (tickets: Array<any>) => void
}) => {
    const [showInvoiceTime, setShowInvoiceTime] = useState(false);
    return (
        <>
            <SideBarModule title="Labour">
                <SideBarButton
                    text={`Time (${props.invoiceTimeCount})`}
                    iconFont="timer"
                    clickEvent={() => setShowInvoiceTime(true)}
                />
            </SideBarModule>

            <TicketInvoiceTimeList 
                ticketID={props.ticketID}
                ticketType={props.ticketType}
                tickets={props.tickets}
                totalCount={props.invoiceTimeCount} 
                show={showInvoiceTime} 
                hideFunc={() => setShowInvoiceTime(false)}    
                getInvoiceTicketTime={() => props.getInvoiceTicketTime(props.tickets)}        
            />
        </>
    )
}

export default TicketLabour