import { Dispatch, SetStateAction, useState } from "react";
import ProductSelect from "../../../../../../components/form/ProductSelect/ProductSelect";
import SubmitButton from "../../../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { ProductResponseData } from "../../../../../../types/products.types";
import { RefrigerantResponseData } from "../../../../../../types/refrigerant.types";
import putAPI from "../../../../../../utils/putAPI";

const RefrigerantSelectProduct = (props: {
    refrigerantID: number,
    product: ProductResponseData | undefined,
    setRefrigerantData: Dispatch<SetStateAction<RefrigerantResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {
    // Form State
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductResponseData | undefined>(props.product);    

    const selectProduct = () => {
        putAPI(`refrigerants/${props.refrigerantID}/select_product`, {}, {
            product_id: selectedProduct?.id,
        }, (response: any) => {
            const refrigerantData: RefrigerantResponseData = response.data;
            props.setRefrigerantData(refrigerantData);
            props.hideFunc();
            setSelectedProduct(selectedProduct);
        }, setIsUpdating)
    }

    const removeProduct = () => {
        putAPI(`refrigerants/${props.refrigerantID}/remove_product`, {}, {}, (response: any) => {
            const refrigerantData: RefrigerantResponseData = response.data;
            props.setRefrigerantData(refrigerantData);
            props.hideFunc();
            setSelectedProduct(selectedProduct);
        }, setIsUpdating)
    }

    return (
        <WindowOverlay
            title='Select Associated Product'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<>
                {props.product !== undefined && <SubmitButton
                    text="Remove"
                    iconFont="not_interested"
                    color="red"
                    left
                    clickFunc={removeProduct}
                    submitting={isUpdating}
                    submittingText="Removing..."
                />}
                <SubmitButton
                    text="Select Product"
                    disabled={selectedProduct === undefined}
                    iconFont="inventory_2"
                    clickFunc={selectProduct}
                    submitting={isUpdating}
                    submittingText="Updating..."
                />
            </>}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select an associated product for this refrigerant.</p>
                </GridItem>
                <GridItem title='Product'>
                    <ProductSelect 
                        selectedProduct={selectedProduct} 
                        setSelectedProduct={setSelectedProduct}
                        hasSubmitted                 
                    />
                </GridItem>
            </InfoGrid>            
        </WindowOverlay>
    )
}

export default RefrigerantSelectProduct