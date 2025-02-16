import { useState } from "react"
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import ProductPurchaseOrders from "./components/ProductPurchaseOrders"
import ProductRequisitions from "./components/ProductRequisitions"
import ProductStockMovements from "./components/ProductStockMovements"

const ProductStockHistory = (props: {
    productID: number,
    requisitionCount: number,
    purchaseOrderCount: number,
    stockMovementCount: number,
    isSundry: boolean,
    isStock: boolean,
}) => {
    const [showRequisitions, setShowRequisitions] = useState(false);
    const [showPurchaseOrders, setShowPurchaseOrders] = useState(false);
    const [showStockMovements, setShowStockMovements] = useState(false);

    return (
        <>
            <SideBarModule title="Stock History">
                {!props.isSundry && <SideBarButton  
                    text={`Purchase Orders (${props.purchaseOrderCount})`}
                    iconFont="receipt_long"
                    clickEvent={() => setShowPurchaseOrders(true)}
                />}
                <SideBarButton  
                    text={`Requisitions (${props.requisitionCount})`}
                    iconFont="all_inbox"
                    clickEvent={() => setShowRequisitions(true)}
                />
                {props.isStock && !props.isSundry ?
                    <SideBarButton  
                        text={`Stock Movements (${props.stockMovementCount})`}
                        iconFont="timeline"
                        clickEvent={() => setShowStockMovements(true)}
                    /> : null
                }
            </SideBarModule>

            <ProductPurchaseOrders
                productID={props.productID} 
                totalCount={props.purchaseOrderCount} 
                show={showPurchaseOrders} 
                hideFunc={() => setShowPurchaseOrders(false)}
            />

            <ProductRequisitions 
                productID={props.productID} 
                totalCount={props.requisitionCount} 
                show={showRequisitions} 
                hideFunc={() => setShowRequisitions(false)}
            />

            <ProductStockMovements
                productID={props.productID}
                totalCount={props.stockMovementCount}
                show={showStockMovements} 
                hideFunc={() => setShowStockMovements(false)}

            />
        </>
    )
}

export default ProductStockHistory