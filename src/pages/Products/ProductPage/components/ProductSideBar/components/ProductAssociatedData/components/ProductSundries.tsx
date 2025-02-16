import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { ProductCollectionResponse } from "../../../../../../../../types/products.types"
import getAPI from "../../../../../../../../utils/getAPI"
import ProductList from "../../../../../../components/ProductList"
import ActionButton from "../../../../../../../../components/form/ActionButton/ActionButton"
import CreateButton from "../../../../../../../../components/form/CreateButton/CreateButton"
import SearchForm from "../../../../../../../../components/form/SearchForm/SearchForm"
import FilterSelect from "../../../../../../../../components/ui/FilterSelect/FilterSelect"
import HeaderFlex from "../../../../../../../../components/ui/HeaderFlex"
import QueryFilterSelect from "../../../../../../../../components/form/QueryFilterSelect/QueryFilterSelect"

const ProductSundries = (props: {
    productID: number,
    sundryCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [productData, setProductData] = useState<ProductCollectionResponse>();
    
    // Search Parameters 
    const offset = searchParams.get('offset');
    const paramPerPage = searchParams.get('perPage');
    const perPage = paramPerPage ? parseInt(paramPerPage) : 25;

    
    useEffect(() => {
        searchStock();
    }, [perPage, offset])

    const searchStock = () => {
        getAPI('products', {
            parent_product_id: props.productID,
            perPage: perPage,
            offset: offset,
        }, (response: any) => {
            const productData: ProductCollectionResponse = response.data;
            setProductData(productData);
        }, setIsProductsLoading)
    }

    // Filters
    const activeFilterOptions = [
        {
            text: 'Active',
            value: true,
            iconFont: 'check_circle',
            selected: true
        },
        {
            text: 'All',
            value: undefined,
            iconFont: 'public',
        }
    ]

    return (
        <WindowOverlay 
            title={"Sundry Products"} 
            maxWidth={1900} 
            show={props.show}
            hideFunc={props.hideFunc} 
            top
        >
            <HeaderFlex>
                    <SearchForm
                        placeHolder="Search products by description..."
                    />
                    <QueryFilterSelect 
                        paramName={"isActive"} 
                        selections={activeFilterOptions}                        
                    />
                    <CreateButton
                        text={"Create Sundry"} 
                        to={`products/create?customerID=${props.productID}`}
                    />
                </HeaderFlex>
            <ProductList 
                hasSearched={true} 
                isProductsLoading={isProductsLoading} 
                products={productData} 
                perPage={perPage}
                totalCount={props.sundryCount}
            />
        </WindowOverlay>
    )
}

export default ProductSundries