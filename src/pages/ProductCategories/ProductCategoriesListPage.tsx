import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { ProductCategoryCollectionResponse } from "../../types/productCategory.types";
import getAPI from "../../utils/getAPI";
import CreateProductCategory from "./components/CreateProductCategory";
import ProductCategoryList from "./components/ProductCategoryList";
import ProductCategorySearchHeader from "./components/ProductCategorySearchHeader";
import getProductCategorySearchParams from "./utils/getProductCategorySearchParams";
const ProductCategoriesListPage = ()  => {
    const [searchParams] = useSearchParams();

    const [showCreate, setShowCreate] = useState(false);

    // Data States 
    const [isProductCategoriesLoading, setIsProductCategoriesLoading] = useState(true);
    const [productCategoryData, setProductCategoryData] = useState<ProductCategoryCollectionResponse>();

    const productCategorySearchParams = getProductCategorySearchParams(searchParams);

    useEffect(() => {
        searchProductCategories();
    }, [JSON.stringify(productCategorySearchParams)])

    const searchProductCategories = () => {
        getAPI('product_categories', productCategorySearchParams, (response: any) => {
            const productCategoryData: ProductCategoryCollectionResponse = response.data;
            setProductCategoryData(productCategoryData);
        }, setIsProductCategoriesLoading);
    }
    
    return (
        <>
            <OuterContainer
                title='Product Categories'
                maxWidth={800}
                description="Create, edit and deactivate product categories."
                noBorder
            >
                <ProductCategorySearchHeader
                    showCreate={() => setShowCreate(true)}
                />
                <ProductCategoryList
                    isProductCategoriesLoading={isProductCategoriesLoading}
                    productCategoryData={productCategoryData}
                    perPage={productCategorySearchParams.perPage}
                />   
            </OuterContainer>

            <CreateProductCategory
                show={showCreate}
                hideFunc={() => setShowCreate(false)}
            />
        </>
    )
}

export default ProductCategoriesListPage