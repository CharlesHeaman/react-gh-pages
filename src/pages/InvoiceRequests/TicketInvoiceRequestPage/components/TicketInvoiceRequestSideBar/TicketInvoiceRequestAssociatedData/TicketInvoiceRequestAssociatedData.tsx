import { useState } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import TicketInvoiceRequestHistory from "./components/TicketInvoiceRequestHistory";

const TicketInvoiceRequestAssociatedData = (props: {
    ticketInvoiceRequestID: number,
    activityCount: number,
}) => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title="Invoice Request">
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <TicketInvoiceRequestHistory 
                ticketInvoiceRequestID={props.ticketInvoiceRequestID}
                totalCount={props.activityCount}
                show={showHistory} 
                hideFunc={() => setShowHistory(false)}
            /> 
        </>
    )
}

export default TicketInvoiceRequestAssociatedData