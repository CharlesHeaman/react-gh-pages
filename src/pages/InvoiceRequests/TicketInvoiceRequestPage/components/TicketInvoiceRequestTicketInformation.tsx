import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import NewCustomerLink from "../../../../components/ui/Links/NewCustomerLink"
import NewEquipmentLink from "../../../../components/ui/Links/NewEquipmentLink"
import SiteLink from "../../../../components/ui/Links/SiteLink"
import TicketLink from "../../../../components/ui/Links/TicketLink"
import { CustomerResponseData } from "../../../../types/customers.types"
import { DepartmentResponseData } from "../../../../types/department.types"
import { EquipmentResponseData } from "../../../../types/equipment.types"
import { SiteResponseData } from "../../../../types/sites.types"
import { TicketResponseData } from "../../../../types/tickets.types"
import formatDate from "../../../../utils/formatDate"

const TicketInvoiceRequestTicketInformation = (props: {
    ticket: TicketResponseData,
    department: DepartmentResponseData,
    customer: CustomerResponseData,
    site: SiteResponseData | undefined,
    equipment: EquipmentResponseData | undefined
}) => {
    return (
        <section>
            <h2>Ticket Information</h2>
            <InfoGrid>
                <GridItem title='Ticket' span={3}>
                    <p><TicketLink 
                        ticket={props.ticket}
                        departmentName={props.department.data.name} 
                    /></p>
                </GridItem>
                <GridItem title='Completion Date' span={3}>
                    <p>{props.ticket.data.completion_date ? formatDate(props.ticket.data.completion_date) : 'None'}</p>
                </GridItem>
                <GridItem title='Customer' span={3}>
                    <p><NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/></p>
                </GridItem>
                <GridItem title='Site' span={3}>
                    <p>{props.site ? <SiteLink code={props.site.data.code} name={props.site.data.name}/> : 'Unknown'}</p>
                </GridItem>
                {props.ticket.data.ticket_type === 0 ? <GridItem title='Equipment' span={3}>
                    <p>{props.equipment ? <NewEquipmentLink code={props.equipment.data.code}/> : 'Unknown'}</p>
                </GridItem> : null}

                <GridItem title='Job Description'>
                    <p>{props.ticket.data.job_description}</p>
                </GridItem>
                <GridItem title='Report'>
                    <p>{props.ticket.data.customer_viewable_report}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default TicketInvoiceRequestTicketInformation