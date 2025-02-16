import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import InvoiceTypeHistory from "./components/InvoiceTypeHistory";
import InvoiceTypeTickets from "./components/InvoiceTypeTickets";

const InvoiceTypeAssociatedData = (props: {
    invoiceTypeID: number,
    ticketCount: number,
    activityCount: number,
}) => {
    const [showTickets, setShowTickets] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title='Invoice Type'>
                <SideBarButton
                    text={`Tickets (${props.ticketCount})`}
                    iconFont="confirmation_number"
                    clickEvent={() => setShowTickets(true)}
                />
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <InvoiceTypeTickets
                invoiceTypeID={props.invoiceTypeID}
                totalCount={props.ticketCount}
                show={showTickets}
                hideFunc={() => setShowTickets(false)}
            />

            <InvoiceTypeHistory
                invoiceTypeID={props.invoiceTypeID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            />
        </>
    )
}

export default InvoiceTypeAssociatedData