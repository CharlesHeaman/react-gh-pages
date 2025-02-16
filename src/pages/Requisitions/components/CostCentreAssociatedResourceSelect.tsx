import { Dispatch, SetStateAction } from "react"
import CustomerSelect from "../../../components/form/SelectCustomer/CustomerSelect"
import UserSelect from "../../../components/form/UserSelect/UserSelect"
import VehicleSelect from "../../../components/form/VehicleSelect/VehicleSelect"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import { CustomerResponseData } from "../../../types/customers.types"
import { UserResponseData } from "../../../types/user.types"
import { VehicleResponseData } from "../../../types/vehicles.types"
import { TicketResponseData } from "../../../types/tickets.types"
import TicketSelect from "../../../components/form/TicketSelect/TicketSelect"
import { QuoteResponseData } from "../../../types/quote.types"
import JobSelect from "../../../components/form/JobSelect/JobSelect"
import { DepartmentResponseData } from "../../../types/department.types"

const CostCentreAssociatedResourceSelect = (props: {
    associatedResourceType: number | null,
    selectedVehicle: VehicleResponseData | undefined,
    setSelectedVehicle: Dispatch<SetStateAction<VehicleResponseData | undefined>>
    selectedUser: UserResponseData | undefined,
    setSelectedUser: Dispatch<SetStateAction<UserResponseData | undefined>>,
    selectedCustomer: CustomerResponseData | undefined,
    setSelectedCustomer: Dispatch<SetStateAction<CustomerResponseData | undefined>>,
    selectedTicket: TicketResponseData | undefined,
    setSelectedTicket: Dispatch<SetStateAction<TicketResponseData | undefined>>,
    selectedJob: QuoteResponseData | undefined,
    setSelectedJob: Dispatch<SetStateAction<QuoteResponseData | undefined>>,
    departmentID: number | null,
    showErrors: boolean
}) => {

    const getAssociatedResource = () => {
        switch (props.associatedResourceType) {
            case 1: // Ticket
                return <GridItem title='Ticket' span={3}>
                    <TicketSelect 
                        selectedTicket={props.selectedTicket} 
                        setSelectedTicket={props.setSelectedTicket} 
                        departmentID={props.departmentID ? props.departmentID : undefined}
                        required
                        hasSubmitted={props.showErrors}
                    />
                </GridItem> 
            case 2: // Job
                return <GridItem title='Job' span={3}>
                    <JobSelect 
                        selectedJob={props.selectedJob} 
                        setSelectedJob={props.setSelectedJob} 
                        departmentID={props.departmentID ? props.departmentID : undefined}
                        required
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>       
            case 3: // Vehicle
                return <GridItem title='Vehicle' span={3}>
                    <VehicleSelect 
                        selectedVehicle={props.selectedVehicle} 
                        setSelectedVehicle={props.setSelectedVehicle} 
                        required
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>       
            case 4: // User
                return <GridItem title='User' span={3}>
                    <UserSelect 
                        selectedUser={props.selectedUser} 
                        setSelectedUser={props.setSelectedUser} 
                        required
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>      
            case 5: // Customer
            return <GridItem title='Customer' span={3}>
                    <CustomerSelect 
                        selectedCustomer={props.selectedCustomer} 
                        setSelectedCustomer={props.setSelectedCustomer} 
                        required
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            default: 
                return null
        }
    }
    return getAssociatedResource();
}

export default CostCentreAssociatedResourceSelect