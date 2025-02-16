import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import SupplierManufacturerLink from "../../../components/ui/Links/SupplierManufacturerLink"
import { PurchaseOrder } from "../../../types/purchaseOrder.types"
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types"
import formatDate from "../../../utils/formatDate"
import PurchaseOrderDispatchByLabel from "../../PurchaseOrders/components/PurchaseOrderDispatchByLabel"

const PurchaserOrderSupplierInformation = (props: {
    purchaseOrderData: PurchaseOrder,
    supplier: SupplierManufacturerResponseData,
}) => {
    return (
        <section>
            <h2>Supplier Information</h2>
            <InfoGrid>
                <GridItem title='Supplier'>                                
                    <SupplierManufacturerLink code={props.supplier.data.code} name={props.supplier.data.name}/>
                </GridItem>
                <GridItem title='Delivery Date' span={3}>
                    <p>{formatDate(props.purchaseOrderData.delivery_date)}</p>
                </GridItem>
                <GridItem title='Dispatch By' span={3}>
                    <PurchaseOrderDispatchByLabel dispatchByType={props.purchaseOrderData.dispatch_by_type}/>
                </GridItem>
                <GridItem title='Special Instructions'>
                    <p>{props.purchaseOrderData.special_instructions ? props.purchaseOrderData.special_instructions : 'None'}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default PurchaserOrderSupplierInformation