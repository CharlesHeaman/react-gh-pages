import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { ProductCollectionResponse } from "../../../../../../../../types/products.types";
import getAPI from "../../../../../../../../utils/getAPI";
import ProductList from "../../../../../../../Products/components/ProductList";
import ProductSearchHeader from "../../../../../../../Products/components/ProductSearchHeader";
import getProductSearchParams from "../../../../../../../Products/utils/getProductSearchParams";

const ManufacturerProductsList = (props: {
    manufacturerID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Search States 
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States 
    const [isProductLoading, setIsProductLoading] = useState(true)
    const [productData, setProductData] = useState<ProductCollectionResponse>();
    
    // Search Parameters 
    const productSearchParams = getProductSearchParams(searchParams);

    useEffect(() => {
        getProducts();
    }, [props.manufacturerID, JSON.stringify(productSearchParams)])

    const getProducts = () => {
        getAPI(`products`, {
            ...productSearchParams,
            manufacturer_id: props.manufacturerID,
        }, (response: any) => {
            const productData: ProductCollectionResponse = response.data;
            setProductData(productData);
        }, setIsProductLoading)    
    }

    return (
        <WindowOverlay 
            title={"Manufacturer Products"} 
            maxWidth={1800} 
            show={props.show}
            hideFunc={props.hideFunc} 
            top
        >
            <ProductSearchHeader 
                showAdvancedSearch={() => setShowAdvancedSearch(true)}    
            />
            <ProductList 
                isProductsLoading={isProductLoading} 
                products={productData} 
                perPage={productSearchParams.perPage}  
                totalCount={props.totalCount}   
                hasSearched     
            />
        </WindowOverlay>
    )
}

export default ManufacturerProductsList