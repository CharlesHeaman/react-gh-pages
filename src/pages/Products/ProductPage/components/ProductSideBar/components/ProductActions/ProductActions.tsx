import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { ProductResponseData } from "../../../../../../../types/products.types";
import SetProductReorderLevel from "./components/SetProductOrderThreshold";
import UploadProductPhoto from "./components/UploadProductImage";
import CreateSundryProduct from "./components/CreateSundryProduct";
import UpdateProductPricing from "./components/UpdateProductPricing";
import AdjustProductStockLevel from "./components/AdjustProductStockLevel";
import ConvertToStock from "./components/ConvertToStock";

const ProductActions = (props: {
    productID: number,
    product: ProductResponseData,
    orderThreshold: number | null,
    setProductData: Dispatch<SetStateAction<ProductResponseData | undefined>>,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    isSundry: boolean,
    isStock: boolean,
    sundryCount: number,
}) => {
    const [showConvert, setShowConvert] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [showSetThreshold, setShowSetThreshold] = useState(false);
    const [showCreateSundry, setShowCreateSundry] = useState(false);
    const [showUpdatePricing, setShowUpdatePricing] = useState(false);
    const [showAdjustStockLevel, setShowAdjustStockLevel] = useState(false);

    return (
        <>
            <SideBarModule title="Actions">
                {!props.isStock && !props.isSundry ? 
                    <SideBarButton
                        text="Convert to Stock"
                        iconFont="inbox"
                        color="purple"
                        clickEvent={() => setShowConvert(true)}
                    />
                : null}
                <SideBarButton  
                    text="Edit Product"
                    iconFont="edit"
                    color="orange"
                    clickEvent={() => props.setIsEditMode(true)}
                />
                {!props.isSundry && <>
                    <SideBarButton
                        text="Upload Image"
                        iconFont="add_photo_alternate"
                        clickEvent={() => setShowUpload(true)}
                    />
                    <SideBarButton
                        text="Update Pricing"
                        iconFont="sell"
                        clickEvent={() => setShowUpdatePricing(true)}
                    />
                    {props.isStock ? <>
                        <SideBarButton
                            text="Adjust Stock Level"
                            iconFont="auto_graph"
                            clickEvent={() => setShowAdjustStockLevel(true)}
                        />
                        <SideBarButton
                            text="Set Reorder Level"
                            iconFont="data_thresholding"
                            clickEvent={() => setShowSetThreshold(true)}
                        />
                        <SideBarButton
                            text="Create Sundry Product"
                            iconFont="donut_small"
                            color="dark-blue"
                            clickEvent={() => setShowCreateSundry(true)}
                        />
                    </> : null}
                </>}
            </SideBarModule>

            <SetProductReorderLevel
                productID={props.productID}
                reorderLevel={props.orderThreshold}
                show={showSetThreshold} 
                hideFunc={() => setShowSetThreshold(false)} 
                setProductData={props.setProductData}
            />

            <UploadProductPhoto 
                productID={props.productID} 
                show={showUpload} 
                hideFunc={() => setShowUpload(false)} 
                setProductData={props.setProductData}
            />

            <CreateSundryProduct 
                productID={props.productID} 
                show={showCreateSundry} 
                hideFunc={() => setShowCreateSundry(false)} 
            />

            <UpdateProductPricing 
                product={props.product} 
                show={showUpdatePricing} 
                hideFunc={() => setShowUpdatePricing(false)} 
                setProductData={props.setProductData}
                hasSundry={props.sundryCount > 0}
            />

            <AdjustProductStockLevel 
                product={props.product} 
                show={showAdjustStockLevel} 
                hideFunc={() => setShowAdjustStockLevel(false)} 
                setProductData={props.setProductData}
            />

            <ConvertToStock
                productID={props.productID}
                show={showConvert}
                hideFunc={() => setShowConvert(false)}
                setProductData={props.setProductData}
            />
        </>
    )
}

export default ProductActions