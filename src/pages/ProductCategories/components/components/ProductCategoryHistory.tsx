import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { ProductCategoryActivityCollectionResponse } from "../../../../types/productCategoryActivity.types";
import getAPI from "../../../../utils/getAPI";
import getPaginationParams from "../../../../utils/getPaginationParams";
import ProductCategoryActivityList from "./ProductCategoryActivityList";


const ProductCategoryHistory = (props: {
    productCategoryID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<ProductCategoryActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'product_category_activity');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.productCategoryID])

    const getActivity = () => {
        getAPI(`product_category_activity`, {
            ...paginationParams,
            product_category_id: props.productCategoryID
        }, (response: any) => {
            const productCategoryActivityData: ProductCategoryActivityCollectionResponse = response.data;
            setActivityData(productCategoryActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Product Category History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <ProductCategoryActivityList
                isProductCategoryActivityLoading={isActivityLoading}
                productCategoryActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default ProductCategoryHistory