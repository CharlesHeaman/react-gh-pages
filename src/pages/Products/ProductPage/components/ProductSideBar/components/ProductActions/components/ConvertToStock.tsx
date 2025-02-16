import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { ConvertToStockProductAttributes, ProductResponseData } from "../../../../../../../../types/products.types";
import putAPI from "../../../../../../../../utils/putAPI";
import SetProductOrderThresholdForm from "./SetProductOrderThresholdForm";
import ProductStoresInformationForm from "../../../../../../CreateProduct/components/ProductStoresInformationForm";
import updateStateParams from "../../../../../../../../utils/updateStateParams/updateStateParams";


const ConvertToStock = (props: {
    productID: number,
    show: boolean,
    hideFunc: () => void,
    setProductData: Dispatch<SetStateAction<ProductResponseData | undefined>>,
}) => {

    // Form States
    const [isUpdating, setIsCreating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [productDetails, setProductDetails] = useState<ConvertToStockProductAttributes>({
        stores_area: '',
        stores_bin: '',
        stores_rack: '',
        stock_level: '0'
    });

    const formComplete = (
        productDetails.stores_area.length > 0 &&
        productDetails.stores_bin.length > 0 &&
        productDetails.stores_rack.length > 0 &&
        productDetails.stock_level.length > 0        
    );

    const updateOrderLevel = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`products/${props.productID}/convert_to_stock`, {}, productDetails, (response: any) => {
            const productData: ProductResponseData = response.data;
            props.setProductData(productData);
            props.hideFunc();
        }, setIsCreating)
    }

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setProductDetails)
    }

    return (
        <WindowOverlay
            title={"Convert Product to Stock"} 
            maxWidth={300} 
            hideFunc={props.hideFunc} 
            show={props.show} 
            footer={<>
                <SubmitButton
                    text="Convert to Stock"
                    iconFont="inbox"
                    color="purple"
                    disabled={hasSubmitted && !formComplete}
                    submitting={isUpdating}
                    submittingText="Converting..."
                    clickFunc={updateOrderLevel}
                />
            </>}
        >
            <p>Record stores location and initial stock level to convert this product to stock.</p>
            <ProductStoresInformationForm 
                productDetails={productDetails}
                updateParams={updateParams} 
                showErrors={hasSubmitted}
            />
        </WindowOverlay>
    )
}

export default ConvertToStock