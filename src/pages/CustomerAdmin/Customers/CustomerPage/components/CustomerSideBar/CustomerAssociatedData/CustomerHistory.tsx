import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { CustomerActivityCollectionResponse } from "../../../../../../../types/customerActivity.types";
import getAPI from "../../../../../../../utils/getAPI";
import getPaginationParams from "../../../../../../../utils/getPaginationParams";
import CustomerActivityList from "./CustomerActivityList";

const CustomerHistory = (props: {
    customerID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<CustomerActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'customer_history');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.customerID])

    const getActivity = () => {
        getAPI(`customer_activity`, {
            ...paginationParams,
            customer_id: props.customerID
        }, (response: any) => {
            const customerActivityData: CustomerActivityCollectionResponse = response.data;
            setActivityData(customerActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Customer History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <CustomerActivityList
                isCustomerActivityLoading={isActivityLoading}
                customerActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default CustomerHistory