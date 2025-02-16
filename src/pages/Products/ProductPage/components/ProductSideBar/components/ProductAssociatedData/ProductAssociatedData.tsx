import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import ProductHistory from "./components/ProductHistory";
import ProductSundries from "./components/ProductSundries";

const ProductAssociatedData = (props: {
    productID: number,
    sundryCount: number,
    activityCount: number,
    isSundry?: boolean,
    isStock?: boolean,
}) => {
    const [showSundry, setShowSundry] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title="Product">
                {props.isStock && !props.isSundry ? <SideBarButton  
                    text={`Sundry Items (${props.sundryCount})`}
                    iconFont="donut_small"
                    clickEvent={() => setShowSundry(true)}
                /> : null}
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <ProductSundries 
                productID={props.productID}
                sundryCount={props.sundryCount}
                show={showSundry} 
                hideFunc={() => setShowSundry(false)}
            />

            <ProductHistory
                productID={props.productID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            />
        </>

    )
}

export default ProductAssociatedData