import { useEffect, useState } from "react"
import PaginationNavigation from "../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchTable from "../../components/ui/SearchTable/SearchTable"
import { ProductCollectionResponse, ProductResponseData } from "../../types/products.types"
import { RefrigerantCollectionResponse } from "../../types/refrigerant.types"
import findProduct from "../../utils/findProduct"
import getAPI from "../../utils/getAPI"
import RefrigerantRow from "./RefrigerantListPage/components/RefrigerantRow"
import RefrigerantRowSkeleton from "./RefrigerantListPage/components/RefrigerantRowSkeleton"

const RefrigerantList = (props: {
    isRefrigerantLoading: boolean,
    refrigerants: RefrigerantCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
}) => {
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [productsData, setProductsData] = useState<Array<ProductResponseData>>([]);

    // Resource Constants
    const resourceName = "refrigerants";
    const resourceIcon = "propane";

    useEffect(() => {
        setIsProductsLoading(true);
    }, [props.isRefrigerantLoading]);

    useEffect(() => {
        if (props.refrigerants && props.refrigerants.data.length > 0) {
            getProducts([...new Set(props.refrigerants.data.map(vehicle => vehicle.data.product_id))])
        } else {
            setIsProductsLoading(false);
        }
    }, [props.refrigerants]);

    const getProducts = (userIDs: Array<number | null>) => {
        getAPI('products', {
            ids: userIDs
        }, (response: any) => {
            const userData: ProductCollectionResponse = response.data;
            setProductsData(userData.data)
        }, setIsProductsLoading)
    }

    const isLoading = (
        props.isRefrigerantLoading ||
        isProductsLoading
    )

    return (
        <div>
            <SearchTable
                headers={['Name', 'Common Name', 'Type', 'GWP', 'Product', 'Stock Level']}
                isLoading={!(!isLoading && props.refrigerants)}
                skeletonRow={<RefrigerantRowSkeleton/>}
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                count={props.refrigerants ? props.refrigerants.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.refrigerants && props.refrigerants.data.map((refrigerant, index) => 
                    <RefrigerantRow
                        refrigerant={refrigerant}
                        product={refrigerant.data.product_id ? findProduct(productsData, refrigerant.data.product_id) : undefined}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.refrigerants) && <PaginationNavigation
                data={props.refrigerants.data}
                totalCount={props.refrigerants.total_count}
                perPage={props.refrigerants.pages.per_page}
                resourceName={resourceName}
                prefix={resourceName}
            />}
        </div>
    )
}

export default RefrigerantList