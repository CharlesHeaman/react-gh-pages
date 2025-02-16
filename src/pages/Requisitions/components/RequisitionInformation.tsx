import { Dispatch, SetStateAction } from "react"
import { CostCentreResponseData } from "../../../types/costCentres.types"
import { CustomerResponseData } from "../../../types/customers.types"
import { Requisition } from "../../../types/requisition.types"
import { RequisitionLineCollectionResponse } from "../../../types/requisitionLines.types"
import { UserResponseData } from "../../../types/user.types"
import { VehicleResponseData } from "../../../types/vehicles.types"
import RequisitionedItemsList from "./RequisitionedItemsList"
import RequisitionInformationDetails from "./RequisitionInformationDetails"
import EditRequisitionedItemsList from "./EditRequisitionedItemsList"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import { DepartmentResponseData } from "../../../types/department.types"
import { TicketResponseData } from "../../../types/tickets.types"
import { QuoteResponseData } from "../../../types/quote.types"
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"

const RequisitionInformation = (props: {
    requisitionID: number,
    requisitionData: Requisition,
    engineer: UserResponseData,
    costCentre: CostCentreResponseData
    requisitionLines: RequisitionLineCollectionResponse,
    customerData: CustomerResponseData | undefined,
    userData: UserResponseData | undefined,
    vehicleData: VehicleResponseData | undefined,
    jobData: QuoteResponseData | undefined,
    ticketData: TicketResponseData | undefined,
    departmentData: DepartmentResponseData | undefined,
    isEditMode?: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    setRequisitionLinesData: Dispatch<SetStateAction<RequisitionLineCollectionResponse | undefined>>,
    completeAt: Date | undefined,
}) => {
    return (
        <>
            <section>
                <RequisitionInformationDetails
                    notes={props.requisitionData.notes}
                    createdAt={props.requisitionData.created_at}
                    engineer={props.engineer}
                    isComplete={props.requisitionData.is_complete}
                    costCentre={props.costCentre}
                    customerData={props.customerData}
                    jobData={props.jobData}
                    ticketData={props.ticketData}
                    departmentData={props.departmentData}                  
                    userData={props.userData}
                    vehicleData={props.vehicleData}
                    completeAt={props.completeAt}
                />
            </section>
            <section>
                <InnerContainer>
                    <section>

                        <h2>Requisitioned Items</h2>
                        {!props.isEditMode ?
                            <InfoGrid>
                                <GridItem>
                                    <RequisitionedItemsList 
                                        isRequisitionLinesLoading={false} 
                                        requisitionLines={props.requisitionLines} 
                                        perPage={props.requisitionLines.total_count}    
                                        hideRequisition  
                                        hidePagination
                                        noOutline
                                        smallNoneFound          
                                    /> 
                                </GridItem>
                            </InfoGrid> :
                            <EditRequisitionedItemsList 
                                requisitionID={props.requisitionID}
                                requisitionNumber={props.requisitionData.number}
                                isRequisitionLinesLoading={false} 
                                requisitionLines={props.requisitionLines} 
                                perPage={props.requisitionLines.total_count}
                                setIsEditMode={props.setIsEditMode}   
                                setRequisitionLinesData={props.setRequisitionLinesData} 
                            />
                        }
                    </section>
                </InnerContainer>
            </section> 
        </>
    )
}

export default RequisitionInformation