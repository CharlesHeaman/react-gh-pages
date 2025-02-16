
import { Dispatch, SetStateAction } from "react"
import ContactSelect from "../../components/form/ContactSelect/ContactSelect"
import DateInput from "../../components/form/DateInput/DateInput"
import DescriptionOfWorksSelect from "../../components/form/DescriptionOfWorksSelect/DescriptionOfWorksSelect"
import GridItem from "../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../components/ui/Containers/InfoGrid/InfoGrid"
import NewCustomerLink from "../../components/ui/Links/NewCustomerLink"
import NewEquipmentLink from "../../components/ui/Links/NewEquipmentLink"
import SiteLink from "../../components/ui/Links/SiteLink"
import TicketLink from "../../components/ui/Links/TicketLink"
import { ContactResponseData } from "../../types/contact.types"
import { CustomerResponseData } from "../../types/customers.types"
import { DepartmentResponseData } from "../../types/department.types"
import { DescriptionOfWorksResponseData } from "../../types/descriptionOfWorks.types"
import { EquipmentResponseData } from "../../types/equipment.types"
import { CreateRiskAssessmentMethodStatement } from "../../types/riskAssessmentMethodStatements.types"
import { SiteResponseData } from "../../types/sites.types"
import { TicketResponseData } from "../../types/tickets.types"
import formatDate from "../../utils/formatDate"

const RAMSDetailsForm = (props: {
    ramsDetails: CreateRiskAssessmentMethodStatement,
    ticket: TicketResponseData,
    department: DepartmentResponseData,
    customer: CustomerResponseData,
    site: SiteResponseData,
    equipment: EquipmentResponseData | undefined,
    updateDateParams: (date: Date, name: string) => void,
    selectedContact: ContactResponseData | undefined,
    setSelectedContact: Dispatch<SetStateAction<ContactResponseData | undefined>>
    selectedDescriptionOfWork: DescriptionOfWorksResponseData | undefined,
    setSelectedDescriptionOfWork: Dispatch<SetStateAction<DescriptionOfWorksResponseData | undefined>>,
    showErrors: boolean,
    isPreview?: boolean,
}) => {
    const customerSpecialInstructions = props.customer.data.special_instructions;
    const siteSpecialInstructions = props.site.data.special_instructions;

    return (
        <>
            <section>
                <h2>Ticket Information</h2>
                <InfoGrid>
                    <GridItem title='Ticket' span={3}>
                        <p><TicketLink 
                            ticket={props.ticket}
                            departmentName={props.department.data.name} 
                        /></p>
                    </GridItem>
                    <GridItem title='Visit Date' span={3}>
                        <p>{props.ticket.data.visit_date ? formatDate(props.ticket.data.visit_date) : 'Unknown'}</p>
                    </GridItem>
                    <GridItem title='Customer' span={3}>
                        <p><NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/></p>
                    </GridItem>
                    <GridItem title='Site' span={3}>
                        <p><SiteLink code={props.site.data.code} name={props.site.data.name}/></p>
                    </GridItem>
                    <GridItem title='Equipment' span={3}>
                        <p>{props.equipment ? <NewEquipmentLink code={props.equipment.data.code}/> : 'None'}</p>
                    </GridItem>
                    <GridItem title='Job Description'>
                        <p>{props.ticket.data.job_description}</p>
                    </GridItem>
                    <GridItem title='Special Instructions'>
                    <p>{customerSpecialInstructions || siteSpecialInstructions ? 
                        `${customerSpecialInstructions}${customerSpecialInstructions && siteSpecialInstructions ? '\n\n' : ''}${siteSpecialInstructions}` :
                        'None'
                    }</p>
                    </GridItem>                
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <h2>RAMS Details</h2>
                <InfoGrid>
                    <GridItem title='Contact'>
                        <ContactSelect 
                            selectedContact={props.selectedContact} 
                            setSelectedContact={props.setSelectedContact} 
                            customerID={props.customer.id}
                            required
                            hasSubmitted={props.showErrors}
                        />
                    </GridItem>
                    <GridItem title='Start Date' span={2}>
                        <p>{formatDate(props.ticket.data.visit_date ? props.ticket.data.visit_date : new Date())}</p>
                    </GridItem>
                    <GridItem title='End Date' span={2}>
                        <DateInput 
                            name={"end_date"} 
                            value={props.ramsDetails.end_date} 
                            updateFunc={props.updateDateParams}
                            min={props.ticket.data.visit_date ? new Date(props.ticket.data.visit_date) : new Date()}
                            required
                        />
                    </GridItem>
                    <GridItem title="Description of Works">
                        <DescriptionOfWorksSelect 
                            selectedDescriptionOfWork={props.selectedDescriptionOfWork} 
                            setSelectedDescriptionOfWork={props.setSelectedDescriptionOfWork} 
                            departmentID={props.department.id}
                            required
                            hasSubmitted={props.showErrors}
                        />
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default RAMSDetailsForm