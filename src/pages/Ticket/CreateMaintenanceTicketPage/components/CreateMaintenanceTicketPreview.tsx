import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import { CustomerResponseData } from "../../../../types/customers.types"
import { SiteResponseData } from "../../../../types/sites.types"
import { CreateMaintenanceTicketAttributes } from "../../../../types/tickets.types"
import findCustomer from "../../../../utils/findCustomer"
import MaintenanceTicketPreview from "./MaintenanceTicketPreview"

const CreateMaintenanceTicketPreview = (props: {
    sites: Array<SiteResponseData>,
    ticketDetails: Array<CreateMaintenanceTicketAttributes>,
    customers: Array<CustomerResponseData>,
}) => {
    return (
        <>
            {props.sites.map((site, index) => <>
                <section key={index}>
                    <InnerContainer>
                        <MaintenanceTicketPreview
                            site={site}
                            customer={findCustomer(props.customers, site.data.customer_id)}
                            ticketDetails={props.ticketDetails.find(details => details.site_id === site.id)}
                        />
                    </InnerContainer>
                </section>
            </>)}
        </>
    )
}

export default CreateMaintenanceTicketPreview