import { Dispatch, SetStateAction } from "react"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../components/ui/IconTitleText/IconTitleText"
import { PurchaseOrderLineCollectionResponse } from "../../../types/PurchaseOrderLines.types"
import { CostCentreResponseData } from "../../../types/costCentres.types"
import { CustomerResponseData } from "../../../types/customers.types"
import { PurchaseOrder } from "../../../types/purchaseOrder.types"
import { PurchaseOrderAttachmentResponseData } from "../../../types/purchaseOrderAttachments.types"
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types"
import { UserResponseData } from "../../../types/user.types"
import { VehicleResponseData } from "../../../types/vehicles.types"
import PurchaseOrderInformationDetails from "../../Requisitions/components/PurchaseOrderInformationDetails"
import getPurchaseOrderStatusColor from "../utils/getPurchaseOrderStatusColor"
import getPurchaseOrderStatusIcon from "../utils/getPurchaseOrderStatusIcon"
import PurchaseOrderStatusText from "../utils/PurchaseOrderStatusText"
import getPurchaseOrderStatusTitle from "../utils/getPurchaseOrderStatusTitle"
import EditPurchaseOrderLinesList from "./EditPurchaseOrderLinesList"
import PurchaseOrderAttachmentList from "./PurchaseOrderAttachmentsList"
import PurchaseOrderLinesList from "./PurchaseOrderLinesList"
import { DepartmentResponseData } from "../../../types/department.types"
import { TicketResponseData } from "../../../types/tickets.types"
import getPurchaseOrderAccountsStatusColor from "../utils/getPurchaseOrderAccountsStatusColor"
import getPurchaseOrderAccountsStatusIcon from "../utils/getPurchaseOrderAccountsStatusIcon"
import getPurchaseOrderAccountsStatusTitle from "../utils/getPurchaseOrderAccountsStatusTitle"
import PurchaseOrderAccountsStatusText from "../utils/PurchaseOrderAccountsStatusText"
import { QuoteResponseData } from "../../../types/quote.types"

const PurchaseOrderInformation = (props: {
    purchaseOrderID: number,
    purchaseOrderData: PurchaseOrder,
    purchaseOrderLines: PurchaseOrderLineCollectionResponse,
    attachments: Array<PurchaseOrderAttachmentResponseData>,
    getAttachments: () => void,
    originator: UserResponseData,
    assignedCustomer: CustomerResponseData,
    supplier: SupplierManufacturerResponseData,
    costCentre: CostCentreResponseData,
    customerData: CustomerResponseData | undefined,
    userData: UserResponseData | undefined,
    vehicleData: VehicleResponseData | undefined,
    jobData: QuoteResponseData | undefined,
    ticketData: TicketResponseData | undefined,
    departmentData: DepartmentResponseData | undefined,
    isEdit?: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    setPurchaseOrderLines: Dispatch<SetStateAction<PurchaseOrderLineCollectionResponse | undefined>>,
    receivedAt: Date | undefined
}) => {
    return (
        <>
            <section>
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px'
                }}>
                    <InnerContainer color={getPurchaseOrderStatusColor(props.purchaseOrderData.is_outstanding, props.purchaseOrderData.sent_by_id !== null, props.purchaseOrderData.has_received)}>
                        <IconTitleText
                            color={getPurchaseOrderStatusColor(props.purchaseOrderData.is_outstanding, props.purchaseOrderData.sent_by_id !== null, props.purchaseOrderData.has_received)}
                            iconFont={getPurchaseOrderStatusIcon(props.purchaseOrderData.is_outstanding, props.purchaseOrderData.sent_by_id !== null, props.purchaseOrderData.has_received)}
                            title={`Purchase Order ${getPurchaseOrderStatusTitle(props.purchaseOrderData.is_outstanding, props.purchaseOrderData.sent_by_id !== null, props.purchaseOrderData.has_received)}`}
                            text={<PurchaseOrderStatusText 
                                isOutstanding={props.purchaseOrderData.is_outstanding}
                                isSent={props.purchaseOrderData.sent_by_id !== null}
                                hasReceived={props.purchaseOrderData.has_received}
                                originator={props.originator}
                                createdAt={props.purchaseOrderData.created_at}
                                sentAt={props.purchaseOrderData.sent_at}
                                receivedAt={props.receivedAt}
                            />}
                        />
                    </InnerContainer>
                    <InnerContainer color={getPurchaseOrderAccountsStatusColor(props.purchaseOrderData.is_accounts_outstanding, props.purchaseOrderData.has_reconciled)}>
                        <IconTitleText
                            color={getPurchaseOrderAccountsStatusColor(props.purchaseOrderData.is_accounts_outstanding, props.purchaseOrderData.has_reconciled)}
                            iconFont={getPurchaseOrderAccountsStatusIcon(props.purchaseOrderData.is_accounts_outstanding, props.purchaseOrderData.has_reconciled)}
                            title={`Purchase Order ${getPurchaseOrderAccountsStatusTitle(props.purchaseOrderData.is_accounts_outstanding, props.purchaseOrderData.has_reconciled)}`}
                            text={<PurchaseOrderAccountsStatusText 
                                isOutstanding={props.purchaseOrderData.is_accounts_outstanding}
                                hasReceived={props.purchaseOrderData.has_reconciled}
                                sentAt={props.purchaseOrderData.sent_at}
                            />}
                        />
                    </InnerContainer>
                </div>
            </section>
            <section>
                <PurchaseOrderInformationDetails
                    purchaseOrderData={props.purchaseOrderData}
                    supplier={props.supplier}
                    assignedCustomer={props.assignedCustomer}
                    customerData={props.customerData}
                    costCentre={props.costCentre}
                    userData={props.userData}
                    vehicleData={props.vehicleData}
                    jobData={props.jobData}
                    ticketData={props.ticketData}
                    departmentData={props.departmentData}                      
                />
            </section>
            <section>
                <InnerContainer>
                    <section>
                        <h2>Order Items</h2>
                        {!props.isEdit ?
                            <InfoGrid>
                                <GridItem>
                                    <PurchaseOrderLinesList
                                        isPurchaseOrderLinesLoading={false} 
                                        purchaseOrderLines={props.purchaseOrderLines} 
                                        perPage={props.purchaseOrderLines.total_count}    
                                        hidePurchaseOrder  
                                        isSent={props.purchaseOrderData.sent_by_id !== null}
                                        smallNoneFound        
                                        noOutline
                                    /> 
                                </GridItem>
                            </InfoGrid> :
                            <EditPurchaseOrderLinesList
                                purchaseOrderID={props.purchaseOrderID}
                                isPurchaseOrderLinesLoading={false} 
                                purchaseOrderLines={props.purchaseOrderLines} 
                                perPage={props.purchaseOrderLines.total_count}    
                                smallNoneFound   
                                setIsEditMode={props.setIsEditMode}
                                setPurchaseOrderLines={props.setPurchaseOrderLines}
                            />
                        }
                    </section>
                </InnerContainer>
            </section>
            {!props.isEdit && <>
                <section>
                    <h2>Attachments</h2>
                    <PurchaseOrderAttachmentList  
                        attachments={props.attachments}
                        getAttachments={props.getAttachments}
                    />
                </section>
            </>}
        </>
    )
}

export default PurchaseOrderInformation