import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { ProductResponseData } from "../../../../../../../../types/products.types";
import putAPI from "../../../../../../../../utils/putAPI";
import SetProductOrderThresholdForm from "./SetProductOrderThresholdForm";


const SetProductReorderLevel = (props: {
    productID: number,
    reorderLevel: number | null,
    show: boolean,
    hideFunc: () => void,
    setProductData: Dispatch<SetStateAction<ProductResponseData | undefined>>,
}) => {

    // Form States
    const [isUpdating, setIsCreating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [level, setLevel] = useState(0);

    const formComplete = level >= 0;

    const updateOrderLevel = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`products/${props.productID}/update_order_threshold`, {}, {
            order_threshold: level
        }, (response: any) => {
            const productData: ProductResponseData = response.data;
            props.setProductData(productData);
            props.hideFunc();
        }, setIsCreating)
    }

    const removeOrderLevel = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`products/${props.productID}/update_order_threshold`, {}, {
            order_threshold: null
        }, (response: any) => {
            const productData: ProductResponseData = response.data;
            props.setProductData(productData);
            props.hideFunc();
        }, setIsCreating)
    }

    return (
        <WindowOverlay
            title={"Set Reorder Level"} 
            maxWidth={300} 
            hideFunc={props.hideFunc} 
            show={props.show} 
            footer={<>
                {props.reorderLevel && <SubmitButton
                    text="Remove"
                    iconFont="not_interested"
                    color="red"
                    left
                    clickFunc={removeOrderLevel}
                    submitting={isUpdating}
                    submittingText="Removing..."
                />}
                <SubmitButton
                    text="Set Level"
                    iconFont="data_thresholding"
                    color="light-green"
                    disabled={hasSubmitted && !formComplete}
                    submitting={isUpdating}
                    submittingText="Updating..."
                    clickFunc={updateOrderLevel}
                />
            </>}
        >
            <SetProductOrderThresholdForm 
                threshold={level}
                setThreshold={setLevel} 
                showErrors={hasSubmitted}
            />
        </WindowOverlay>
    )
}

export default SetProductReorderLevel