import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import { CostCentreResponseData } from "../../../types/costCentres.types"
import { CustomerResponseData } from "../../../types/customers.types"
import { DepartmentResponseData } from "../../../types/department.types"
import { PurchaseOrder } from "../../../types/purchaseOrder.types"
import { QuoteResponseData } from "../../../types/quote.types"
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types"
import { TicketResponseData } from "../../../types/tickets.types"
import { UserResponseData } from "../../../types/user.types"
import { VehicleResponseData } from "../../../types/vehicles.types"
import PurchaseOrderOrderDetails from "./PurchaseOrderOrderDetails"
import PurchaserOrderSupplierInformation from "./PurchaseOrderSupplierInformation"

const PurchaseOrderInformationDetails = (props: {
    purchaseOrderData: PurchaseOrder,
    supplier: SupplierManufacturerResponseData,
    assignedCustomer: CustomerResponseData,
    costCentre: CostCentreResponseData
    customerData: CustomerResponseData | undefined,
    userData: UserResponseData | undefined,
    vehicleData: VehicleResponseData | undefined,
    jobData: QuoteResponseData | undefined,
    ticketData: TicketResponseData | undefined,
    departmentData: DepartmentResponseData | undefined,
    isPreview?: boolean
}) => {
    return (
        !props.isPreview ? 
            <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
            }}>
                <div>
                    <InnerContainer>
                        <PurchaseOrderOrderDetails
                            purchaseOrderData={props.purchaseOrderData}
                            assignedCustomer={props.assignedCustomer}
                            customerData={props.customerData}
                            userData={props.userData}
                            vehicleData={props.vehicleData}
                            jobData={props.jobData}
                            ticketData={props.ticketData}
                            departmentData={props.departmentData}                  
                            costCentre={props.costCentre}
                        />
                    </InnerContainer>
                </div>
                <div>
                    <InnerContainer>
                        <PurchaserOrderSupplierInformation
                            purchaseOrderData={props.purchaseOrderData}
                            supplier={props.supplier}
                        />
                    </InnerContainer>
                </div>
            </div>
            :
            <>
                <PurchaseOrderOrderDetails
                    purchaseOrderData={props.purchaseOrderData}
                    assignedCustomer={props.assignedCustomer}
                    customerData={props.customerData}
                    costCentre={props.costCentre}
                    userData={props.userData}
                    vehicleData={props.vehicleData}
                    jobData={props.jobData}
                    ticketData={props.ticketData}
                    departmentData={props.departmentData}                  
                />
                <hr/>
                <PurchaserOrderSupplierInformation
                    purchaseOrderData={props.purchaseOrderData}
                    supplier={props.supplier}
                />
            </>
    )
}

export default PurchaseOrderInformationDetails 