import NewCustomerLink from "../../components/ui/Links/NewCustomerLink"
import NewPurchaseOrderLink from "../../components/ui/Links/NewPurchaseOrderLink"
import SupplierManufacturerLink from "../../components/ui/Links/SupplierManufacturerLink"
import UserLink from "../../components/ui/Links/UserLink"
import { CostCentreResponseData } from "../../types/costCentres.types"
import { CustomerResponseData } from "../../types/customers.types"
import { PurchaseOrderResponseData } from "../../types/purchaseOrder.types"
import { SupplierManufacturerResponseData } from "../../types/supplierManufacturer.types"
import { UserResponseData } from "../../types/user.types"
import formatDate from "../../utils/formatDate"
import AssociatedResourceTypeLabel from "../CostCentres/utils/AssociatedResourceTypeLabel"
import PurchaseOrderStatusLabel from "./components/PurchaseOrderStatusLabel"

const PurchaseOrderRow = (props: {
    purchaseOrder: PurchaseOrderResponseData,
    user: UserResponseData | undefined,
    customer: CustomerResponseData | undefined,
    supplier: SupplierManufacturerResponseData | undefined,
    costCentre: CostCentreResponseData | undefined,
    hideSupplier?: boolean,
    hideCustomer?: boolean,
    hideType?: boolean,
}) => {
    return (
        <tr>
            <td><NewPurchaseOrderLink purchaseOrderID={props.purchaseOrder.id}/></td>
            {!props.hideType && <td><AssociatedResourceTypeLabel resourceType={props.costCentre ? props.costCentre.data.associated_resource_type : null}/></td>}
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : null}</td>
            {!props.hideSupplier ?
                <td className="text-left">{props.supplier ? <SupplierManufacturerLink code={props.supplier.data.code} name={props.supplier.data.name}/> : null}</td> :
                null
            }
            {!props.hideCustomer && <td className="text-left">{props.customer ? <NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/> : null}</td>}
            <td>{formatDate(props.purchaseOrder.data.created_at)}</td>
            <td>
                <PurchaseOrderStatusLabel 
                    isSent={props.purchaseOrder.data.sent_by_id !== null}
                    isOutstanding={props.purchaseOrder.data.is_outstanding}
                    hasReceived={props.purchaseOrder.data.has_received}
                />
            </td>
        </tr>
    )
}

export default PurchaseOrderRow