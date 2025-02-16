import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { ProductCollectionResponse } from "../../../../../../../../types/products.types";
import getAPI from "../../../../../../../../utils/getAPI";
import ProductList from "../../../../../../../Products/components/ProductList";
import ProductSearchHeader from "../../../../../../../Products/components/ProductSearchHeader";
import getProductSearchParams from "../../../../../../../Products/utils/getProductSearchParams";


const SupplierProductsList = (props: {
    supplierID: number,
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
    }, [props.supplierID, JSON.stringify(productSearchParams)])

    const getProducts = () => {
        getAPI(`products`, {
            ...productSearchParams,
            supplier_id: props.supplierID,
        }, (response: any) => {
            const productData: ProductCollectionResponse = response.data;
            setProductData(productData);
        }, setIsProductLoading)    
    }

    return (
        <WindowOverlay 
            title={"Supplier Products"} 
            maxWidth={1800} 
            show={props.show}
            hideFunc={props.hideFunc} 
            top
        >
            <ProductSearchHeader 
                showAdvancedSearch={() => setShowAdvancedSearch(true)}    
                supplierID={props.supplierID}                        
            />
            <ProductList 
                isProductsLoading={isProductLoading} 
                products={productData} 
                perPage={productSearchParams.perPage}  
                totalCount={props.totalCount}   
                hasSearched     
                hideSupplier
            />
        </WindowOverlay>
    )
}

export default SupplierProductsList