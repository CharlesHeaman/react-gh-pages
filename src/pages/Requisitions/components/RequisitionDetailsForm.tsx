import { ChangeEvent, Dispatch, SetStateAction } from "react"
import TextareaInput from "../../../components/form/TextareaInput/TextareaInput"
import UserSelect from "../../../components/form/UserSelect/UserSelect"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CostCentreResponseData } from "../../../types/costCentres.types"
import { CustomerResponseData } from "../../../types/customers.types"
import { CreateRequisitionAttributes } from "../../../types/requisition.types"
import { UserResponseData } from "../../../types/user.types"
import { VehicleResponseData } from "../../../types/vehicles.types"
import CostCentreAssociatedResourceSelect from "./CostCentreAssociatedResourceSelect"
import { TicketResponseData } from "../../../types/tickets.types"
import { QuoteResponseData } from "../../../types/quote.types"
import { DepartmentResponseData } from "../../../types/department.types"

const RequisitionDetailsForm = (props: {
    requisitionDetails: CreateRequisitionAttributes,
    costCentreData: CostCentreResponseData | undefined,
    selectedUser: UserResponseData | undefined,
    setSelectedUser: Dispatch<SetStateAction<UserResponseData | undefined>>,
    selectedAssigned: UserResponseData | undefined,
    setSelectedAssigned: Dispatch<SetStateAction<UserResponseData | undefined>>,
    selectedCustomer: CustomerResponseData | undefined,
    setSelectedCustomer: Dispatch<SetStateAction<CustomerResponseData | undefined>>
    selectedVehicle: VehicleResponseData | undefined,
    setSelectedVehicle: Dispatch<SetStateAction<VehicleResponseData | undefined>>
    selectedTicket: TicketResponseData | undefined,
    setSelectedTicket: Dispatch<SetStateAction<TicketResponseData | undefined>>
    selectedJob: QuoteResponseData | undefined,
    setSelectedJob: Dispatch<SetStateAction<QuoteResponseData | undefined>>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
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
            <GridItem title='Assigned To'>
                <UserSelect 
                    selectedUser={props.selectedAssigned} 
                    setSelectedUser={props.setSelectedAssigned} 
                    required
                    hasSubmitted={props.showErrors}
                />
            </GridItem>
            <GridItem title='Notes' secondaryTitle="(optional)">
                <TextareaInput
                    name="notes"
                    value={props.requisitionDetails.notes}
                    label="Notes"
                    updateFunc={props.updateParams}
                />
            </GridItem>
        </InfoGrid>
    )
}

export default RequisitionDetailsForm 