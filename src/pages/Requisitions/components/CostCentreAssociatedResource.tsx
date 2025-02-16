import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import JobLink from "../../../components/ui/Links/JobLink"
import NewCustomerLink from "../../../components/ui/Links/NewCustomerLink"
import TicketLink from "../../../components/ui/Links/TicketLink"
import UserLink from "../../../components/ui/Links/UserLink"
import { CustomerResponseData } from "../../../types/customers.types"
import { DepartmentResponseData } from "../../../types/department.types"
import { QuoteResponseData } from "../../../types/quote.types"
import { TicketResponseData } from "../../../types/tickets.types"
import { UserResponseData } from "../../../types/user.types"
import { VehicleResponseData } from "../../../types/vehicles.types"
import VehicleLink from "../../Vehicles/components/VehicleLink"

const CostCentreAssociatedResource = (props: {
    associatedResourceType: number | null,
    ticketData: TicketResponseData | undefined,
    jobData: QuoteResponseData | undefined,
    vehicleData: VehicleResponseData | undefined,
    userData: UserResponseData | undefined,
    customerData: CustomerResponseData | undefined,
    departmentData: DepartmentResponseData | undefined,
}) => {

    const getAssociatedResource = () => {
        switch (props.associatedResourceType) {
            case 1: // Ticket
                return <GridItem title='Ticket' span={3}>
                    <p>{props.ticketData && props.departmentData ? <TicketLink ticket={props.ticketData} departmentName={props.departmentData.data.name}
                    /> : 'None'}</p>
                </GridItem> 
            case 2: // Job
                return <GridItem title='Job' span={3}>
                    <p>{props.jobData && props.departmentData ? <JobLink number={props.jobData.data.number} departmentName={props.departmentData.data.name}/> : 'None'}</p>                    
                </GridItem>       
            case 3: // Vehicle
                return <GridItem title='Vehicle' span={3}>
                    <p>{props.vehicleData ? <VehicleLink vehicleID={props.vehicleData.id} registrationNumber={props.vehicleData.data.registration_number}/> : 'None'}</p>
                </GridItem>       
            case 4: // User
                return <GridItem title='User' span={3}>
                    <p>{props.userData ? <UserLink username={props.userData.data.username} firstName={props.userData.data.first_name} lastName={props.userData.data.last_name}/> : 'None'}</p>
                </GridItem>      
            case 5: // Customer
                return <GridItem title='Customer' span={3}>
                    <p>{props.customerData ? <NewCustomerLink code={props.customerData.data.code}/> : 'None'}</p>
                </GridItem>
            default: 
                return null
        }
    }
    return getAssociatedResource();
}

export default CostCentreAssociatedResource