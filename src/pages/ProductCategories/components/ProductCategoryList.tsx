import { useNavigate } from "react-router-dom";
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { ProductCategoryCollectionResponse } from "../../../types/productCategory.types";
import ProductCategoryRow from "./ProductCategoryRow";
import ProductCategoryRowSkeleton from "./ProductCategoryRowSkeleton";

const ProductCategoryList = (props: {
    isProductCategoriesLoading: boolean,
    productCategoryData: ProductCategoryCollectionResponse | undefined,
    perPage: number,
}) => {
    // Resource Constants
    const resourceName = 'product categories';
    const resourceIcon = 'inventory_2';    

    const isLoading = (
        props.isProductCategoriesLoading 
    )

    return (
        <div>
            <SearchTable
                headers={['Name', 'Description']}
                isLoading={!(!isLoading && props.productCategoryData)}
                skeletonRow={<ProductCategoryRowSkeleton/>}
                skeletonCount={props.perPage}
                count={props.productCategoryData ? props.productCategoryData.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.productCategoryData && props.productCategoryData.data.map((productCategory, index) => 
                    <ProductCategoryRow 
                        productCategory={productCategory}
                        key={index}
                    />  
                )}
            />
            {(!isLoading && props.productCategoryData) && <PaginationNavigation
                data={props.productCategoryData.data}
                totalCount={props.productCategoryData.total_count}
                perPage={props.productCategoryData.pages.per_page}
                resourceName={resourceName}
                prefix="product_category"
            />}
        </div>
    )
}

export default ProductCategoryList 