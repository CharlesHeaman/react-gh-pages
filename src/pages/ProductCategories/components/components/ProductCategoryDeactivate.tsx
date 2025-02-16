import { Dispatch, SetStateAction, useState } from "react"
import DeactivateModule from "../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { ProductCategoryResponseData } from "../../../../types/productCategory.types";
import putAPI from "../../../../utils/putAPI";

const ProductCategoryDeactivate = (props: {
    productCategoryID: number,
    reactivate: boolean,
    setProductCategoryData: Dispatch<SetStateAction<ProductCategoryResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateProductCategory = () => {
        putAPI(`product_categories/${props.productCategoryID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const productCategoryData: ProductCategoryResponseData = response.data;
            props.setProductCategoryData(productCategoryData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Product Category'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Product Category"
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateProductCategory}/>
        </>

    )
}

export default ProductCategoryDeactivate