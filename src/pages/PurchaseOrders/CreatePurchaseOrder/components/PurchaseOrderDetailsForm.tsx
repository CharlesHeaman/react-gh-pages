import { Dispatch, SetStateAction } from "react"
import CustomerSelect from "../../../../components/form/SelectCustomer/CustomerSelect"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CostCentreResponseData } from "../../../../types/costCentres.types"
import { CustomerResponseData } from "../../../../types/customers.types"
import { TicketResponseData } from "../../../../types/tickets.types"
import { UserResponseData } from "../../../../types/user.types"
import { VehicleResponseData } from "../../../../types/vehicles.types"
import CostCentreAssociatedResourceSelect from "../../../Requisitions/components/CostCentreAssociatedResourceSelect"
import { QuoteResponseData } from "../../../../types/quote.types"

const PurchaseOrderDetailsForm = (props: {
    costCentreData: CostCentreResponseData | undefined,
    selectedUser: UserResponseData | undefined,
    setSelectedUser: Dispatch<SetStateAction<UserResponseData | undefined>>,
    selectedAssignedCustomer: CustomerResponseData | undefined,
    setSelectedAssignedCustomer: Dispatch<SetStateAction<CustomerResponseData | undefined>>,
    selectedCustomer: CustomerResponseData | undefined,
    setSelectedCustomer: Dispatch<SetStateAction<CustomerResponseData | undefined>>
    selectedVehicle: VehicleResponseData | undefined,
    setSelectedVehicle: Dispatch<SetStateAction<VehicleResponseData | undefined>>
    selectedTicket: TicketResponseData | undefined,
    setSelectedTicket: Dispatch<SetStateAction<TicketResponseData | undefined>>
    selectedJob: QuoteResponseData | undefined,
    setSelectedJob: Dispatch<SetStateAction<QuoteResponseData | undefined>>,
    showErrors: boolean
}) => {
    
    return (
        <InfoGrid>
            <CostCentreAssociatedResourceSelect
                associatedResourceType={props.costCentreData ? props.costCentreData.data.associated_resource_type : null}
                selectedVehicle={props.selectedVehicle}
                setSelectedVehicle={props.setSelectedVehicle}
                selectedUser={props.selectedUser}
                setSelectedUser={props.setSelectedUser}
                selectedCustomer={props.selectedCustomer}
                setSelectedCustomer={props.setSelectedCustomer}
                selectedTicket={props.selectedTicket}
                setSelectedTicket={props.setSelectedTicket}
                selectedJob={props.selectedJob}
                setSelectedJob={props.setSelectedJob}
                departmentID={props.costCentreData ? props.costCentreData.data.department_id : null}
                showErrors={props.showErrors}
            />
            <GridItem title='Customer'>
                <CustomerSelect 
                    selectedCustomer={props.selectedAssignedCustomer} 
                    setSelectedCustomer={props.setSelectedAssignedCustomer} 
                    required
                    hasSubmitted={props.showErrors}
                />
            </GridItem>
        </InfoGrid>
    )
}

export default PurchaseOrderDetailsForm 