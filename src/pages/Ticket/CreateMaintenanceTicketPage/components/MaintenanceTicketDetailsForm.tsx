import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import { SiteResponseData } from "../../../../types/sites.types"
import { CreateMaintenanceTicketAttributes } from "../../../../types/tickets.types"
import MaintenanceTicketCreationForm from "./MaintenanceTicketCreationForm"

const MaintenanceTicketDetailsForm = (props: {
    sites: Array<SiteResponseData>,
    ticketDetails: Array<CreateMaintenanceTicketAttributes>,
    updateTicketDetails: (siteId: number, name: string, value: string | boolean) => void,
    showErrors: boolean,
}) => {
    return (
        <>
            {props.sites.map((site, index) => <>
                <section key={index}>
                    <InnerContainer>
                        <MaintenanceTicketCreationForm
                            site={site}
                            ticketDetails={props.ticketDetails.find(details => details.site_id === site.id)}
                            updateTicketDetails={props.updateTicketDetails}
                            showErrors={props.showErrors}
                        />
                    </InnerContainer>
                </section>
            </>)}
        </>
    )
}

export default MaintenanceTicketDetailsForm