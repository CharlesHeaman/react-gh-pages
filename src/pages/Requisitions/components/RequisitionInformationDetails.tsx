import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../components/ui/IconTitleText/IconTitleText"
import UserLink from "../../../components/ui/Links/UserLink"
import { CostCentreResponseData } from "../../../types/costCentres.types"
import { CustomerResponseData } from "../../../types/customers.types"
import { DepartmentResponseData } from "../../../types/department.types"
import { QuoteResponseData } from "../../../types/quote.types"
import { TicketResponseData } from "../../../types/tickets.types"
import { UserResponseData } from "../../../types/user.types"
import { VehicleResponseData } from "../../../types/vehicles.types"
import formatDate from "../../../utils/formatDate"
import getUserFullName from "../../../utils/getUserFullName"
import CostCentreLabel from "../../CostCentres/components/CostCentreLabel"
import CostCentreAssociatedResource from "./CostCentreAssociatedResource"

const RequisitionInformationDetails = (props: {
    notes: string | null,
    createdAt: Date,
    engineer: UserResponseData,
    costCentre: CostCentreResponseData
    customerData: CustomerResponseData | undefined,
    userData: UserResponseData | undefined,
    vehicleData: VehicleResponseData | undefined,
    jobData: QuoteResponseData | undefined,
    ticketData: TicketResponseData | undefined,
    departmentData: DepartmentResponseData | undefined,
    isComplete?: boolean,
    isPreview?: boolean,
    completeAt?: Date | undefined,
}) => {
    return (
        !props.isPreview ?
            <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
            }}>
                <div>
                    <section>
                        <InnerContainer>
                            <section>
                                <h2>Requisition Details</h2>
                                <InfoGrid>
                                    <CostCentreAssociatedResource
                                        associatedResourceType={props.costCentre.data.associated_resource_type} 
                                        vehicleData={props.vehicleData} 
                                        userData={props.userData} 
                                        customerData={props.customerData}  
                                        jobData={props.jobData}
                                        ticketData={props.ticketData}
                                        departmentData={props.departmentData}                  
                                    />
                                    <GridItem title='Cost Centre' span={3}>
                                        <CostCentreLabel costCentre={props.costCentre}/>
                                    </GridItem>
                                    {props.isPreview && <GridItem title='Assigned To'>
                                        <UserLink username={props.engineer.data.username} firstName={props.engineer.data.first_name} lastName={props.engineer.data.last_name}/>
                                    </GridItem>}
                                    <GridItem title='Notes'>
                                        <p>{props.notes ? props.notes : 'None'}</p>
                                    </GridItem>
                                </InfoGrid>
                            </section>
                        </InnerContainer>
                    </section>
                </div>
                <section>
                    <GridItem>
                        <InnerContainer color={props.isComplete ? "light-green" : 'light-blue'}>
                            <IconTitleText
                                iconFont={props.isComplete ? 'assignment_ind' : 'pending'}
                                title={props.isComplete ? `Assigned to ${getUserFullName(props.engineer)}` : 'Pending Completion'}
                                color={props.isComplete ? "light-green" : 'light-blue'}
                                text={<>
                                    This requisition was {!props.isComplete ? 'queued to be ' : ''}assigned to <UserLink username={props.engineer.data.username} firstName={props.engineer.data.first_name} lastName={props.engineer.data.last_name}/> on {formatDate(props.completeAt ? props.completeAt : props.createdAt)}.
                                </>}
                            />
                        </InnerContainer>  
                    </GridItem> 
                </section>
            </div> : 
            <section>
                <h2>Requisition Details</h2>
                <InfoGrid>
                    <CostCentreAssociatedResource
                        associatedResourceType={props.costCentre.data.associated_resource_type} 
                        vehicleData={props.vehicleData} 
                        userData={props.userData} 
                        customerData={props.customerData}  
                        jobData={props.jobData}
                        ticketData={props.ticketData}
                        departmentData={props.departmentData}                  
                    />
                    <GridItem title='Cost Centre' span={3}>
                        <CostCentreLabel costCentre={props.costCentre}/>
                    </GridItem>
                    {props.isPreview && <GridItem title='Assigned To'>
                        <UserLink username={props.engineer.data.username} firstName={props.engineer.data.first_name} lastName={props.engineer.data.last_name}/>
                    </GridItem>}
                    <GridItem title='Notes'>
                        <p>{props.notes ? props.notes : 'None'}</p>
                    </GridItem>
                </InfoGrid>
            </section>
    )
}

export default RequisitionInformationDetails