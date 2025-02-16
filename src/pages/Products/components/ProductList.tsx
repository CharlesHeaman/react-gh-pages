import { useEffect, useState } from "react"
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchHelperText from "../../../components/ui/SearchHelperText/SearchHelperText"
import SearchTable from "../../../components/ui/SearchTable/SearchTable"
import { ProductCategoryCollectionResponse, ProductCategoryResponseData } from "../../../types/productCategory.types"
import { ProductCollectionResponse, ProductResponseData } from "../../../types/products.types"
import { SupplierManufacturerCollectionResponse, SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types"
import findProductCategory from "../../../utils/findProductCategory"
import findSupplierManufacturer from "../../../utils/findSupplierManufacturer"
import getAPI from "../../../utils/getAPI"
import ProductRow from "./ProductRow"
import ProductRowSkeleton from "./ProductRowSkeleton"

const ProductList = (props: {
    hasSearched: boolean,
    isProductsLoading: boolean,
    products: ProductCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    hideCategory?: boolean,
    hideSupplier?: boolean,
    showAdvancedSearch?: () => void,
    showAdd?: boolean,
    addFunc?: (product: ProductResponseData) => void,
}) => {
    // Data States
    const [isSuppliersLoading, setIsSuppliersLoading] = useState(false);
    const [supplierData, setSupplierData] = useState<Array<SupplierManufacturerResponseData>>([]);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
    const [categoryData, setCategoryData] = useState<Array<ProductCategoryResponseData>>([]);

    // Resource Constants
    const resourceName = "products";
    const resourceIcon = "inventory_2";

    useEffect(() => {
        setIsSuppliersLoading(true);
        !props.hideCategory && setIsCategoriesLoading(true);
    }, [props.isProductsLoading])

    useEffect(() => {
        if (props.products && props.products.data.length > 0) {
            getSuppliersManufacturers([...new Set(props.products.data.map(product => product.data.supplier_id))]);
            !props.hideCategory && getProductCategories([...new Set(props.products.data.map(product => product.data.category_id))]);
        } else {
            setIsSuppliersLoading(false);
            !props.hideCategory && setIsCategoriesLoading(false);
        }
    }, [props.products])


    const getSuppliersManufacturers = (supplierManufacturerIDs: Array<number>) => {
        getAPI('suppliers_manufacturers', {
            ids: supplierManufacturerIDs
        }, (response: any) => {
            const supplierData: SupplierManufacturerCollectionResponse = response.data;
            setSupplierData(supplierData.data)
        }, setIsSuppliersLoading)
    }

    const getProductCategories = (productCategoryIDs: Array<number>) => {
        getAPI('product_categories', {
            ids: productCategoryIDs
        }, (response: any) => {
            const productCategoryData: ProductCategoryCollectionResponse = response.data;
            setCategoryData(productCategoryData.data)
        }, setIsCategoriesLoading)
    }

    const isLoading = (
        props.isProductsLoading || 
        isSuppliersLoading ||
        isCategoriesLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Product ID', 'Category', 'Description', 'Size/Model', 'Unit', 'Supplier', 'Catalogue Number', 'List Price', 'Nett Price', 'Adjusted Price', 'Stock Level'];
        if (props.hideCategory) {
            var headerIndex = tableHeader.indexOf('Category');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (props.hideSupplier) {
            var headerIndex = tableHeader.indexOf('Supplier');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (props.showAdd) tableHeader.unshift('');
        return tableHeader
    }

    return (
        <div>
            {props.hasSearched ?
                <SearchTable
                    headers={getTableHeader()}
                    isLoading={!(!isLoading && props.products)}
                    skeletonRow={<ProductRowSkeleton hideCategory={props.hideCategory} hideSupplier={props.hideSupplier}/>}
                    skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                    count={props.products ? props.products.data.length : 0}
                    resourceName={resourceName}
                    resourceIconFont={resourceIcon}
                    body={props.products && props.products.data.map((product, index) => 
                        <ProductRow
                            product={product}
                            manufacturer={undefined}
                            supplier={findSupplierManufacturer(supplierData, product.data.supplier_id)}
                            productCategory={findProductCategory(categoryData, product.data.category_id)}
                            hideCategory={props.hideCategory}
                            hideSupplier={props.hideSupplier}
                            showAdd={props.showAdd}
                            addFunc={props.addFunc}
                            key={index}
                        />
                    )}
                />
                :
                <SearchHelperText
                    iconFont={resourceIcon}
                    text="Search products by description or catalogue number"
                    showAdvanced={props.showAdvancedSearch}
                />
            }
            {(!isLoading && props.hasSearched && props.products) && <PaginationNavigation
                data={props.products.data}
                totalCount={props.products.total_count}
                perPage={props.products.pages.per_page}
                resourceName={resourceName}
                prefix="products"
            />}
        </div>
    )
}

export default ProductList