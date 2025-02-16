import { ChangeEvent, Dispatch, SetStateAction } from "react"
import TextareaInput from "../../components/form/TextareaInput/TextareaInput"
import UserSelect from "../../components/form/UserSelect/UserSelect"
import GridItem from "../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../components/ui/Containers/InfoGrid/InfoGrid"
import { CostCentreResponseData } from "../../types/costCentres.types"
import { CustomerResponseData } from "../../types/customers.types"
import { DepartmentResponseData } from "../../types/department.types"
import { TicketResponseData } from "../../types/tickets.types"
import { UserResponseData } from "../../types/user.types"
import { VehicleResponseData } from "../../types/vehicles.types"
import CostCentreLabel from "../CostCentres/components/CostCentreLabel"
import CostCentreAssociatedResource from "../Requisitions/components/CostCentreAssociatedResource"
import { CreateRequisitionAttributes } from "../../types/requisition.types"
import CheckboxInput from "../../components/form/CheckboxInput/CheckboxInput"

const CreatePurchaseOrderAssociatedRequisition = (props: {
    requisitionDetails: CreateRequisitionAttributes,
    costCentre: CostCentreResponseData,
    customerData: CustomerResponseData | undefined,
    userData: UserResponseData | undefined,
    vehicleData: VehicleResponseData | undefined,
    ticketData: TicketResponseData | undefined,
    departmentData: DepartmentResponseData | undefined,
    selectedAssigned: UserResponseData | undefined,
    setSelectedAssigned: Dispatch<SetStateAction<UserResponseData | undefined>>,    
    createRequisition: boolean,
    setCreateRequisition: Dispatch<SetStateAction<boolean>>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean
}) => {
    return (
        <section>
            <InfoGrid>
                {props.costCentre.data.associated_resource_type !== 1 ? <GridItem title='Create Requisition'>
                    <CheckboxInput 
                        name={"create_requisition"} 
                        checked={props.createRequisition}
                        updateFunc={(event: ChangeEvent<HTMLInputElement>) =>
                            props.setCreateRequisition(event.target.checked)
                        }
                    />
                </GridItem> : null}
                {props.createRequisition ? <>
                    <CostCentreAssociatedResource
                        associatedResourceType={props.costCentre.data.associated_resource_type}
                        vehicleData={props.vehicleData}
                        userData={props.userData}
                        customerData={props.customerData}
                        ticketData={props.ticketData}
                        departmentData={props.departmentData} 
                        jobData={undefined}                
                    />
                    <GridItem title='Cost Centre' span={3}>
                        <CostCentreLabel costCentre={props.costCentre}/>
                    </GridItem>
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
                </> : null}
            </InfoGrid>
        </section>
    )
}

export default CreatePurchaseOrderAssociatedRequisition