import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { ProductCategoryResponseData, CreateProductCategoryAttributes } from "../../../types/productCategory.types";
import putAPI from "../../../utils/putAPI";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import ProductCategoryDetailsForm from "./ProductCategoryDetailsForm";

const EditProductCategoryForm = (props: {
    productCategory: ProductCategoryResponseData,
    setProductCategoryData: Dispatch<SetStateAction<ProductCategoryResponseData | undefined>>
    disabledEdit: () => void
}) => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [productCategoryDetails, setProductCategoryDetails] = useState<CreateProductCategoryAttributes>({
        name: props.productCategory.data.name,
        description: props.productCategory.data.description ? props.productCategory.data.description : '',
    });

    const updateProductCategoryParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setProductCategoryDetails)
    }

    const updateSite = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`product_categories/${props.productCategory.id}/update`, {}, productCategoryDetails, (response: any) => {
            const productCategoryData: ProductCategoryResponseData = response.data;
            props.setProductCategoryData(productCategoryData);
            props.disabledEdit();
        }, setIsUpdating)
    }

    const formComplete = (
        productCategoryDetails.name.length > 0
    )

    return (
        <>
            <ProductCategoryDetailsForm
                productCategoryDetails={productCategoryDetails}
                updateParams={updateProductCategoryParams}
                showErrors={hasSubmitted}
                isEdit
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateSite}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditProductCategoryForm