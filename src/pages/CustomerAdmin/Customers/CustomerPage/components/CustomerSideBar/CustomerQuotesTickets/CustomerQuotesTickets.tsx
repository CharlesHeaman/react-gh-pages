import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import CustomerOpenMaintenanceTickets from "./components/CustomerOpenMaintenanceTickets";
import CustomerOpenQuotes from "./components/CustomerOpenQuotes";
import CustomerOpenServiceTickets from "./components/CustomerOpenServiceTickets";

const CustomerQuotesTickets = (props: {
    customerID: number,
    serviceCount: number,
    maintenanceCount: number,
    quotesCount: number
}) => {
    const [showServiceTickets, setShowServiceTickets] = useState(false);
    const [showMaintenanceTickets, setShowMaintenanceTickets] = useState(false);
    const [showQuotes, setShowQuotes] = useState(false);

    return (
        <>
            <SideBarModule title='Open Tickets/Quotes'>
                <SideBarButton
                    text={`Service Tickets (${props.serviceCount})`}
                    iconFont="local_activity"
                    clickEvent={() => setShowServiceTickets(true)}
                />
                <SideBarButton
                    text={`Maintenance Tickets (${props.maintenanceCount})`}
                    iconFont="confirmation_number"
                    clickEvent={() => setShowMaintenanceTickets(true)}
                />
                <SideBarButton
                    text={`Quotes (${props.quotesCount})`}
                    iconFont="request_quote"
                    clickEvent={() => setShowQuotes(true)}
                />
            </SideBarModule>

            <CustomerOpenServiceTickets
                customerID={props.customerID}
                totalCount={props.serviceCount}
                show={showServiceTickets}
                hideFunc={() => setShowServiceTickets(false)}
            />

            <CustomerOpenMaintenanceTickets
                customerID={props.customerID}
                totalCount={props.maintenanceCount}
                show={showMaintenanceTickets}
                hideFunc={() => setShowMaintenanceTickets(false)}
            />

            <CustomerOpenQuotes
                customerID={props.customerID}
                totalCount={props.quotesCount}
                show={showQuotes}
                hideFunc={() => setShowQuotes(false)}
            />
        </>
    )
}

export default CustomerQuotesTickets