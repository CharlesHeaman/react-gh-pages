import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { ProductCollectionResponse } from "../../../../types/products.types";
import getAPI from "../../../../utils/getAPI";
import ProductList from "../../../Products/components/ProductList";
import getProductSearchParams from "../../../Products/utils/getProductSearchParams";

const ProductCategoryProducts = (props: {
    productCategoryID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Data States 
    const [isProductLoading, setIsProductLoading] = useState(true)
    const [productData, setProductData] = useState<ProductCollectionResponse>();
    
    // Search Parameters 
    const productSearchParams = getProductSearchParams(searchParams);

    useEffect(() => {
        getProducts();
    }, [props.productCategoryID, JSON.stringify(productSearchParams)])

    const getProducts = () => {
        getAPI(`products`, {
            category_id: props.productCategoryID,
            ...productSearchParams,
            is_active: true,
        }, (response: any) => {
            const productData: ProductCollectionResponse = response.data;
            setProductData(productData);
        }, setIsProductLoading)    
    }

    return (
        <WindowOverlay 
            title={"Product Category Products"} 
            maxWidth={2000} 
            show={props.show}
            hideFunc={props.hideFunc} 
            top
        >
            <ProductList 
                isProductsLoading={isProductLoading} 
                products={productData} 
                perPage={productSearchParams.perPage}  
                totalCount={props.totalCount}   
                hasSearched     
                hideCategory
            />
        </WindowOverlay>
    )
}

export default ProductCategoryProducts