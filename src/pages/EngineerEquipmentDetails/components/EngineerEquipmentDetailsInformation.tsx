import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../components/ui/IconTitleText/IconTitleText"
import NewCustomerLink from "../../../components/ui/Links/NewCustomerLink"
import SiteLink from "../../../components/ui/Links/SiteLink"
import TicketLink from "../../../components/ui/Links/TicketLink"
import { CustomerResponseData } from "../../../types/customers.types"
import { DepartmentResponseData } from "../../../types/department.types"
import { EngineerEquipmentDetailsResponseData } from "../../../types/engineerEquipmentDetails.types"
import { SiteResponseData } from "../../../types/sites.types"
import { TicketResponseData } from "../../../types/tickets.types"
import { TicketUploadCollectionResponse } from "../../../types/ticketUploads.types"
import formatDate from "../../../utils/formatDate"
import TicketUploadsList from "../../Ticket/components/TicketUploadsList"

const EngineerEquipmentDetailsInformation = (props: {
    engineerEquipmentDetails: EngineerEquipmentDetailsResponseData,
    ticket: TicketResponseData,
    department: DepartmentResponseData,
    customer: CustomerResponseData,
    site: SiteResponseData,
    uploads: TicketUploadCollectionResponse,
    lastProcess: Date | undefined,
}) => {

    const showEquipmentDetails = () => {
        return (
            props.engineerEquipmentDetails.data.manufacturer || 
            props.engineerEquipmentDetails.data.model_number || 
            props.engineerEquipmentDetails.data.serial_number || 
            props.engineerEquipmentDetails.data.location || 
            props.engineerEquipmentDetails.data.description || 
            props.engineerEquipmentDetails.data.notes
        )
    }

    return (
        <>
            <section>
                <InnerContainer
                    color={props.engineerEquipmentDetails.data.is_processed ? 'purple' : 'grey'}
                >
                    <IconTitleText
                        iconFont={props.engineerEquipmentDetails.data.is_processed ? 'check_circle' : 'pending'}
                        title={`Details ${props.engineerEquipmentDetails.data.is_processed ? 'Processed' : 'Pending'}`}
                        color={props.engineerEquipmentDetails.data.is_processed ? 'dark-blue' : 'light-blue'}
                        text={props.engineerEquipmentDetails.data.is_processed ? `The engineer equipment details were processed on ${props.lastProcess ? formatDate(props.lastProcess) : 'unknown'}.` : 'The engineer equipment details have not yet been processed.'}
                    />
                </InnerContainer>
            </section>
            <section>
                <h2>Ticket Information</h2>
                <InfoGrid>
                    <GridItem title='Ticket'>
                        <TicketLink 
                            ticket={props.ticket}
                            departmentName={props.department.data.name} 
                        />
                    </GridItem>
                    <GridItem title='Customer' span={3}>
                        <p><NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/></p>
                    </GridItem>
                    <GridItem title='Site' span={3}>
                        <p><SiteLink code={props.site.data.code} name={props.site.data.name}/></p>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            {showEquipmentDetails() && <section>
                <h2>Equipment Details</h2>
                {/* <GridItem title='Engineer' span={2}>
                    <UserLink 
                        username={userData.data.username} 
                        firstName={userData.data.first_name} 
                        lastName={userData.data.last_name}
                    />
                </GridItem> */}
                <InfoGrid>
                    {props.engineerEquipmentDetails.data.manufacturer && <GridItem title='Manufacturer'>
                        <p>{props.engineerEquipmentDetails.data.manufacturer}</p>
                    </GridItem>}
                    {props.engineerEquipmentDetails.data.model_number && <GridItem title='Model No.' span={3}>
                        <p>{props.engineerEquipmentDetails.data.model_number}</p>
                    </GridItem>}
                    {props.engineerEquipmentDetails.data.serial_number && <GridItem title='Serial No.' span={3}>
                        <p>{props.engineerEquipmentDetails.data.serial_number}</p>
                    </GridItem>}
                    {props.engineerEquipmentDetails.data.location && <GridItem title='Location' span={3}>
                        <p>{props.engineerEquipmentDetails.data.location}</p>
                    </GridItem>}
                    {props.engineerEquipmentDetails.data.description && <GridItem title='Description' span={3}>
                        <p>{props.engineerEquipmentDetails.data.description}</p>
                    </GridItem>}
                    {props.engineerEquipmentDetails.data.fuel_type && <GridItem title='Fuel Type' span={3}>
                        <p>{props.engineerEquipmentDetails.data.fuel_type}</p>
                    </GridItem>}
                    {props.engineerEquipmentDetails.data.gc_number && <GridItem title='Gas Council Number' span={3}>
                        <p>{props.engineerEquipmentDetails.data.gc_number}</p>
                    </GridItem>}
                    {props.engineerEquipmentDetails.data.notes && <GridItem title='Notes'>
                        <p>{props.engineerEquipmentDetails.data.notes}</p>
                    </GridItem>}
                </InfoGrid>
            </section>} 
            <hr/>
            <section>
                <h2>Uploads</h2>
                <TicketUploadsList  
                    uploads={props.uploads.data}
                />
            </section>
        </>
    )
}

export default EngineerEquipmentDetailsInformation