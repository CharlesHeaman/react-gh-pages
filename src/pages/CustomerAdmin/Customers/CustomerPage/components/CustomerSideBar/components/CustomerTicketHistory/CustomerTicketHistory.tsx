import { useState } from "react"
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import CustomerServiceTickets from "./components/CustomerServiceTickets";
import CustomerMaintenanceHistory from "./components/CustomerMaintenanceHistory";
import CustomerQuoteHistory from "../../CustomerQuotesTickets/components/CustomerQuoteHistory";
import CustomerServiceHistory from "../../CustomerQuotesTickets/components/CustomerServiceHistory";

const CustomerTicketHistory = (props: {
    customerID: number,
    serviceCount: number,
    maintenanceCount: number,
    quotesCount: number,
}) => {
    const [showService, setShowService] = useState(false);
    const [showMaintenance, setShowMaintenance] = useState(false);
    const [showQuotes, setShowQuotes] = useState(false);

    return (
        <>
            <SideBarModule title='Ticket/Quote History'>
                <SideBarButton
                    text={`Service Tickets (${props.serviceCount})`}
                    iconFont="local_activity"
                    clickEvent={() => setShowService(true)}
                />
                <SideBarButton
                    text={`Maintenance Tickets (${props.maintenanceCount})`}
                    iconFont="confirmation_number"
                    clickEvent={() => setShowMaintenance(true)}
                />
                <SideBarButton
                    text={`Quotes (${props.quotesCount})`}
                    iconFont="request_quote"
                    clickEvent={() => setShowQuotes(true)}
                />
            </SideBarModule>

            <CustomerServiceHistory 
                customerID={props.customerID} 
                totalCount={props.serviceCount} 
                show={showService} 
                hideFunc={() => setShowService(false)}
            />

            <CustomerMaintenanceHistory
                customerID={props.customerID} 
                totalCount={props.maintenanceCount} 
                show={showMaintenance} 
                hideFunc={() => setShowMaintenance(false)}
            />

            <CustomerQuoteHistory
                customerID={props.customerID} 
                totalCount={props.quotesCount} 
                show={showQuotes} 
                hideFunc={() => setShowQuotes(false)}
            />
        </>
    )
}

export default CustomerTicketHistory