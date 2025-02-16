import { Dispatch, SetStateAction, useState } from "react"
import DeactivateModule from "../../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { ProductResponseData } from "../../../../../../../types/products.types";
import putAPI from "../../../../../../../utils/putAPI";

const ProductDeactivate = (props: {
    productID: number,
    reactivate: boolean,
    setProductData: Dispatch<SetStateAction<ProductResponseData | undefined>>,
    sundryCount: number,
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateProduct = () => {
        putAPI(`products/${props.productID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const productData: ProductResponseData = response.data;
            props.setProductData(productData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Product'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Product"
                reactivate={props.reactivate} 
                additionalText={!props.reactivate ? 
                    props.sundryCount > 0 ? <p>This will also deactivate all {props.sundryCount} sundry products.</p> : undefined
                    : undefined
                }
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateProduct}/>
        </>

    )
}

export default ProductDeactivate