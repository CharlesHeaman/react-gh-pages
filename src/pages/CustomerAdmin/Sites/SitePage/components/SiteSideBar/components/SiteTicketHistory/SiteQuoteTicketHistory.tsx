import { useState } from "react";
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import SiteMaintenanceTickets from "./components/SiteMaintenanceTickets";
import SiteServiceTickets from "./components/SiteServiceTickets";
import SiteQuoteHistory from "./components/SiteQuoteHistory";

const SiteQuoteTicketHistory = (props: {
    siteID: number,
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

            <SiteServiceTickets
                siteID={props.siteID}
                totalCount={props.maintenanceCount}
                show={showService}
                hideFunc={() => setShowService(false)}
            />

            <SiteMaintenanceTickets
                siteID={props.siteID}
                totalCount={props.maintenanceCount}
                show={showMaintenance}
                hideFunc={() => setShowMaintenance(false)}
            />

            <SiteQuoteHistory
                siteID={props.siteID}
                totalCount={props.quotesCount}
                show={showQuotes}
                hideFunc={() => setShowQuotes(false)}
            />

        </>
    )
}

export default SiteQuoteTicketHistory