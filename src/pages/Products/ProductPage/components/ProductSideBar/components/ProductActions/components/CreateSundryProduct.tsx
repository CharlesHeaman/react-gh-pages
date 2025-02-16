import { ChangeEvent, useState } from "react";
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { CreateSundryProductAttributes, ProductResponseData } from "../../../../../../../../types/products.types";
import putAPI from "../../../../../../../../utils/putAPI";
import updateStateParams from "../../../../../../../../utils/updateStateParams/updateStateParams";
import CreateSundryProductForm from "./CreateSundryProductForm";
import { useNavigate } from "react-router-dom";
import postAPI from "../../../../../../../../utils/postAPI";
import isProductSundryDetailsFormValid from "../../../../../../CreateProduct/utils/isProductSundryDetailsFormValid";


const CreateSundryProduct = (props: {
    productID: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const navigate = useNavigate();

    // Form States
    const [isUpdating, setIsCreating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [productDetails, setProductDetails] = useState<CreateSundryProductAttributes>({
        description: '',
        size_or_model: '',
        unit: '',
        parent_price_percentage: '100'
    });

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setProductDetails)
    }

    const formComplete = isProductSundryDetailsFormValid(productDetails)

    const createSundryProduct = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        postAPI(`products/create_sundry_product`, {}, {
            ...productDetails,
            parent_product_id: props.productID,
        }, (response: any) => {
            const productData: ProductResponseData = response.data;
            navigate(`../${productData.id}`, { relative: 'path' })
            props.hideFunc();
        }, setIsCreating)
    }

    return (
        <WindowOverlay
            title={"Create Sundry Product"} 
            maxWidth={400} 
            hideFunc={props.hideFunc} 
            show={props.show} 
            footer={<>
                <SubmitButton
                    text="Create Sundry Product"
                    iconFont="donut_small"
                    color="dark-blue"
                    disabled={hasSubmitted && !formComplete}
                    submitting={isUpdating}
                    submittingText="Creating..."
                    clickFunc={createSundryProduct}
                />
            </>}
        >
            <CreateSundryProductForm 
                productDetails={productDetails}     
                updateParams={updateParams} 
                showErrors={hasSubmitted}
            />
        </WindowOverlay>
    )
}

export default CreateSundryProduct