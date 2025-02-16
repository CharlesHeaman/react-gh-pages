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
import isProductPriceFormValid from "../../../../../../CreateProduct/utils/isProductPriceFormValid";


const UpdateProductPricing = (props: {
    product: ProductResponseData,
    show: boolean,
    hideFunc: () => void,
    setProductData: Dispatch<SetStateAction<ProductResponseData | undefined>>,
    hasSundry: number,
}) => {
    const navigate = useNavigate();

    // Form States
    const [isUpdating, setIsCreating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [productDetails, setProductDetails] = useState<CreateProductAttributes>({
        description: props.product.data.description,
        size_or_model: props.product.data.size_or_model,
        unit: props.product.data.unit,
        catalogue_number: props.product.data.catalogue_number,
        part_number: props.product.data.part_number,
        price: props.product.data.price.toString(),
        percentage_discount: props.product.data.percentage_discount.toString(),
        percentage_markup: props.product.data.percentage_markup.toString(),
    });

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setProductDetails)
    }

    const formComplete = isProductPriceFormValid(productDetails)

    const createSundryProduct = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`products/${props.product.id}/update_pricing`, {}, {
            price: productDetails.price,
            percentage_discount: productDetails.percentage_discount,
            percentage_markup: productDetails.percentage_markup,
            }, (response: any) => {
            const productData: ProductResponseData = response.data;
            props.setProductData(productData);
            props.hideFunc();
        }, setIsCreating)
    }

    return (
        <WindowOverlay
            title={"Update Product Pricing"} 
            maxWidth={300} 
            hideFunc={props.hideFunc} 
            show={props.show} 
            footer={<>
                <SubmitButton
                    text="Update Product Pricing"
                    iconFont="sell"
                    disabled={hasSubmitted && !formComplete}
                    submitting={isUpdating}
                    submittingText="Updating..."
                    clickFunc={createSundryProduct}
                />
            </>}
        >
            {props.hasSundry && <p>All sundry product pricing will also be updated.</p>}
            <ProductPriceForm 
                productDetails={productDetails}     
                updateParams={updateParams} 
                showErrors={hasSubmitted}
                isUpdate
            />
        </WindowOverlay>
    )
}

export default UpdateProductPricing