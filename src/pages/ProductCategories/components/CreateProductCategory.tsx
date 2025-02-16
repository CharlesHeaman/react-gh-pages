import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { CreateProductCategoryAttributes, ProductCategoryResponseData } from "../../../types/productCategory.types";
import postAPI from "../../../utils/postAPI";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import ProductCategoryDetailsForm from "./ProductCategoryDetailsForm";

const CreateProductCategory = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const navigate = useNavigate();

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [productCategoryDetails, setProductCategoryDetails] = useState<CreateProductCategoryAttributes>({
        name: '',
        description: '',
    });

    const updateProductCategoryParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setProductCategoryDetails)
    }

    const createProductCategory = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        postAPI('product_categories/create', {}, productCategoryDetails, (response: any) => {
            const productCategoryData: ProductCategoryResponseData = response.data;
            navigate(productCategoryData.id.toString())
        }, setIsCreating)
    }

    const formComplete = (
        productCategoryDetails.name.length > 0
    )

    return (
        <WindowOverlay 
            title={"Create Product Category"} 
            maxWidth={400} 
            show={props.show} 
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Create Product Category"
                iconFont="add"
                color="dark-blue"
                clickFunc={createProductCategory}
                submitting={isCreating}
                submittingText="Creating..."
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <ProductCategoryDetailsForm
                productCategoryDetails={productCategoryDetails}
                updateParams={updateProductCategoryParams}
                showErrors={hasSubmitted}
            />
            
        </WindowOverlay>
    )
}

export default CreateProductCategory