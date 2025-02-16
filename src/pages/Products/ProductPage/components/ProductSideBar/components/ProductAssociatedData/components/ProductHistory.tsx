import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { ProductActivityCollectionResponse } from "../../../../../../../../types/productActivity.types"
import getAPI from "../../../../../../../../utils/getAPI"
import getPaginationParams from "../../../../../../../../utils/getPaginationParams"
import ProductActivityList from "./ProductActivityList"

const ProductHistory = (props: {
    productID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<ProductActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'product_history');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.productID])

    const getActivity = () => {
        getAPI(`product_activity`, {
            ...paginationParams,
            product_id: props.productID
        }, (response: any) => {
            const productActivityData: ProductActivityCollectionResponse = response.data;
            setActivityData(productActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Product History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <ProductActivityList
                isProductActivityLoading={isActivityLoading}
                productActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default ProductHistory