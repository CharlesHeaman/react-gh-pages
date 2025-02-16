import { useState } from "react";
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import SiteOpenQuotes from "./components/SiteOpenQuotes";
import SiteOpenServiceTickets from "./components/SiteOpenServiceTickets";
import SiteOpenMaintenanceTickets from "./components/SiteOpenMaintenanceTickets";

const SiteQuotesTickets = (props: {
    siteID: number,
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

            <SiteOpenServiceTickets
                siteID={props.siteID}
                totalCount={props.serviceCount}
                show={showServiceTickets}
                hideFunc={() => setShowServiceTickets(false)}
            />

            <SiteOpenMaintenanceTickets
                siteID={props.siteID}
                totalCount={props.maintenanceCount}
                show={showMaintenanceTickets}
                hideFunc={() => setShowMaintenanceTickets(false)}
            />

            <SiteOpenQuotes
                siteID={props.siteID}
                totalCount={props.quotesCount}
                show={showQuotes}
                hideFunc={() => setShowQuotes(false)}
            />
        </>
    )
}

export default SiteQuotesTickets