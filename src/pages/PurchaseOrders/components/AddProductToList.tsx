import { useState, useEffect } from "react";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { ProductCollectionResponse, ProductResponseData } from "../../../types/products.types";
import getAPI from "../../../utils/getAPI";
import ProductList from "../../Products/components/ProductList";
import getProductSearchParams from "../../Products/utils/getProductSearchParams";
import { useSearchParams } from "react-router-dom";
import ProductSearchHeader from "../../Products/components/ProductSearchHeader";

const AddProductToList = (props: {
    show: boolean,
    hideFunc: () => void,
    addFunc: (product: ProductResponseData) => void,
    resourceName: string,
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [productData, setProductData] = useState<ProductCollectionResponse>();

    // Search Parameters 
    const hasSearched = searchParams.get(`products_has_searched`) === "true";
    const productSearchParams = getProductSearchParams(searchParams);
    
    useEffect(() => {
        hasSearched && searchStock();
    }, [JSON.stringify(productSearchParams)])

    const searchStock = () => {
        getAPI('products', {
            ...productSearchParams,
            is_active: true,
            is_sundry: false,
        }, (response: any) => {
            const productData: ProductCollectionResponse = response.data;
            setProductData(productData);
        }, setIsProductsLoading)
    }

    return (
        <WindowOverlay 
            title={`Add Product to ${props.resourceName}`} 
            maxWidth={2200} 
            show={props.show}
            hideFunc={props.hideFunc}
            top
        >
            <ProductSearchHeader
                hideFilters
                // hideCreate
            />
            <ProductList 
                hasSearched={hasSearched} 
                isProductsLoading={isProductsLoading} 
                products={productData} 
                perPage={productSearchParams.perPage}      
                showAdd
                addFunc={props.addFunc}
            />
        </WindowOverlay>
    )
}

export default AddProductToList