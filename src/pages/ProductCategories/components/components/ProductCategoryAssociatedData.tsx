import { useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";
import ProductCategoryHistory from "./ProductCategoryHistory";
import ProductCategoryProducts from "./ProductCategoryProducts";

const ProductCategoryAssociatedData = (props: {
    productCategoryID: number,
    productCount: number,
    activityCount: number,
}) => {
    const [showProducts, setShowProducts] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title='Product Category'>
                <SideBarButton 
                    text={`Products (${props.productCount})`}
                    iconFont='inventory_2'
                    clickEvent={() => setShowProducts(true)}
                />
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <ProductCategoryProducts
                productCategoryID={props.productCategoryID}
                totalCount={props.productCount}
                show={showProducts}
                hideFunc={() => setShowProducts(false)}
            />

            <ProductCategoryHistory
                productCategoryID={props.productCategoryID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            />
        </>
    )
}

export default ProductCategoryAssociatedData