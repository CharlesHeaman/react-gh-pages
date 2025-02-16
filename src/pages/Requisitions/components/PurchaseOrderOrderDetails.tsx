import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import NewCustomerLink from "../../../components/ui/Links/NewCustomerLink"
import { CostCentreResponseData } from "../../../types/costCentres.types"
import { CustomerResponseData } from "../../../types/customers.types"
import { DepartmentResponseData } from "../../../types/department.types"
import { PurchaseOrder } from "../../../types/purchaseOrder.types"
import { QuoteResponseData } from "../../../types/quote.types"
import { TicketResponseData } from "../../../types/tickets.types"
import { UserResponseData } from "../../../types/user.types"
import { VehicleResponseData } from "../../../types/vehicles.types"
import CostCentreLabel from "../../CostCentres/components/CostCentreLabel"
import PurchaseOrderPaymentTypeLabel from "../../PurchaseOrders/components/PurchaseOrderPaymentTypeLabel"
import CostCentreAssociatedResource from "./CostCentreAssociatedResource"

const PurchaseOrderOrderDetails = (props: {
    purchaseOrderData: PurchaseOrder,
    assignedCustomer: CustomerResponseData,
    costCentre: CostCentreResponseData
    customerData: CustomerResponseData | undefined,
    userData: UserResponseData | undefined,
    vehicleData: VehicleResponseData | undefined,
    jobData: QuoteResponseData | undefined,
    ticketData: TicketResponseData | undefined,
    departmentData: DepartmentResponseData | undefined,
}) => {
    console.log('PurchaseOrderOrderDetails props:', props)
    return (
        <section>
            <h2>Order Details</h2>
            <InfoGrid>
                <CostCentreAssociatedResource
                    associatedResourceType={props.costCentre.data.associated_resource_type}
                    vehicleData={props.vehicleData}
                    userData={props.userData}
                    customerData={props.customerData}
                    ticketData={props.ticketData}
                    departmentData={props.departmentData} 
                    jobData={props.jobData}                
                />
                <GridItem title='Cost Centre' span={3}>
                    <CostCentreLabel costCentre={props.costCentre}/>
                </GridItem>
                <GridItem title='Customer'>
                    <NewCustomerLink code={props.assignedCustomer.data.code} name={props.assignedCustomer.data.name}/>
                </GridItem>
                <GridItem title='Payment Method' span={3}>
                    <PurchaseOrderPaymentTypeLabel
                        paymentType={props.purchaseOrderData.payment_type}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default PurchaseOrderOrderDetails