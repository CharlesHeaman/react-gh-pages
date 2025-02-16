import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { CreateProductAttributes, ProductResponseData } from "../../../../../../../../types/products.types";
import postAPI from "../../../../../../../../utils/postAPI";
import updateStateParams from "../../../../../../../../utils/updateStateParams/updateStateParams";
import ProductPriceForm from "../../../../../../CreateProduct/components/ProductPriceForm";
import isProductSundryDetailsFormValid from "../../../../../../CreateProduct/utils/isProductSundryDetailsFormValid";
import putAPI from "../../../../../../../../utils/putAPI";
import InfoGrid from "../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem";
import IntegerInput from "../../../../../../../../components/form/IntegerInput/IntegerInput";
import TextareaInput from "../../../../../../../../components/form/TextareaInput/TextareaInput";


const AdjustProductStockLevel = (props: {
    product: ProductResponseData,
    show: boolean,
    hideFunc: () => void,
    setProductData: Dispatch<SetStateAction<ProductResponseData | undefined>>,
}) => {
    const navigate = useNavigate();

    // Form States
    const [isUpdating, setIsCreating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [stockLevel, setStockLevel] = useState<string>(props.product.data.stock_level.toString());
    const [reason, setReason] = useState<string>('');

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setStockLevel)
    }

    const formComplete = (
        stockLevel.length > 0 &&    
        reason.length > 0
    )

    const createSundryProduct = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`products/${props.product.id}/adjust_stock_level`, {}, {
            stock_level: stockLevel,
            reason_for_adjustment: reason
        }, (response: any) => {
            const productData: ProductResponseData = response.data;
            props.setProductData(productData);
            props.hideFunc();
        }, setIsCreating)
    }

    return (
        <WindowOverlay
            title={"Adjust Product Stock Level"} 
            maxWidth={300} 
            hideFunc={props.hideFunc} 
            show={props.show} 
            footer={<>
                <SubmitButton
                    text="Adjust Stock Level"
                    iconFont="auto_graph"
                    disabled={hasSubmitted && !formComplete}
                    submitting={isUpdating}
                    submittingText="Updating..."
                    clickFunc={createSundryProduct}
                />
            </>}
        >
            <InfoGrid>
                <GridItem>
                    <p>Enter new stock level for product and the reason for the manual adjustment.</p>
                </GridItem>
                <GridItem title='New Stock Level'>
                    <IntegerInput
                        name="stock_level"
                        value={stockLevel}
                        label="Stock level"
                        required
                        hasSubmitted={hasSubmitted}
                        updateFunc={(event) => setStockLevel(event.target.value)}
                        maxWidth={75}
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Adjustment Reason'>
                    <TextareaInput
                        name="reason"
                        value={reason}
                        label="Reason"
                        required
                        hasSubmitted={hasSubmitted}
                        updateFunc={(event) => setReason(event.target.value)}
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default AdjustProductStockLevel