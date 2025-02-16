import SiteLink from "../../../../components/ui/Links/SiteLink"
import { CustomerResponseData } from "../../../../types/customers.types"
import { SiteResponseData } from "../../../../types/sites.types"
import { CreateMaintenanceTicketAttributes } from "../../../../types/tickets.types"
import TicketAssignmentDetails from "../../components/TicketAssignmentDetails"
import TicketCustomerDetails from "../../components/TicketCustomerDetails"
import TicketDetailsInformation from "../../components/TicketDetailsInformation"

const MaintenanceTicketPreview = (props: {
    site: SiteResponseData,
    customer: CustomerResponseData | undefined,
    ticketDetails: CreateMaintenanceTicketAttributes | undefined,
}) => {
    return (
        props.ticketDetails && props.customer ? <section>
            <h2><SiteLink code={props.site.data.code} name={props.site.data.name}/></h2>
            <TicketCustomerDetails 
                customer={props.customer}
                site={props.site}
                equipment={undefined} 
                isPlannedMaintenance={true}            
            />
            <hr/>
            <TicketDetailsInformation
                ticketData={{
                    ...props.ticketDetails,
                    estimated_time: parseInt(props.ticketDetails.estimated_time),
                    
                }}
                customer={props.customer}
                site={props.site}
            />
            <hr/>
            <TicketAssignmentDetails 
                visitDate={props.ticketDetails.visit_date ? props.ticketDetails.visit_date : null} 
                engineers={[]} 
                users={[]}            
                isPreview
            />
        </section> : null
    )
}

export default MaintenanceTicketPreview