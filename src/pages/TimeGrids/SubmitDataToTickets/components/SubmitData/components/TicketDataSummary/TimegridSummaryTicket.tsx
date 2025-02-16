import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NewCustomerLink from "../../../../../../../components/ui/Links/NewCustomerLink"
import SiteLink from "../../../../../../../components/ui/Links/SiteLink"
import TicketLink from "../../../../../../../components/ui/Links/TicketLink"
import { CustomerResponseData } from "../../../../../../../types/customers.types"
import { DepartmentResponseData } from "../../../../../../../types/department.types"
import { SiteResponseData } from "../../../../../../../types/sites.types"
import { TicketResponseData } from "../../../../../../../types/tickets.types"
import { InvoiceTicketTime } from "../../../../ProcessTimegridPage"
import InvoiceTicketTimeSubmit from "./components/InvoiceTicketTimeSubmit"

const TimegridSummaryTicket = (props: {
    ticket: TicketResponseData,
    customer: CustomerResponseData | undefined,
    site: SiteResponseData | undefined,   
    departments: Array<DepartmentResponseData>,     
    invoiceTicketTime: Array<InvoiceTicketTime>,
    engineerDepartment: DepartmentResponseData,    
}) => {
    return (
        <InnerContainer>
            <InfoGrid>
                <GridItem title='Ticket'>
                    <TicketLink 
                        ticketType={props.ticket.data.ticket_type} 
                        departmentName={props.department?.data.name} 
                        number={props.ticket.data.number} 
                        suffix={props.ticket.data.suffix}
                    />
                </GridItem>
                <GridItem title='Customer' span={3}>
                    {props.customer ? <p><NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/></p> : null}
                </GridItem>
                <GridItem title='Site' span={3}>
                    {props.site ? <p><SiteLink code={props.site.data.code} name={props.site.data.name}/></p> : null}
                </GridItem>
                {/* Job Description */}
                <GridItem title='Job Description'>
                    <p>{props.ticket.data.job_description}</p>
                </GridItem>
                <GridItem title='Engineer Time'>                        
                    <InvoiceTicketTimeSubmit 
                        department={props.engineerDepartment} 
                        ticket={props.ticket} 
                        invoiceTicketTime={props.invoiceTicketTime}
                    /> 
                </GridItem>
            </InfoGrid>
        </InnerContainer>
    )
}

export default TimegridSummaryTicket
