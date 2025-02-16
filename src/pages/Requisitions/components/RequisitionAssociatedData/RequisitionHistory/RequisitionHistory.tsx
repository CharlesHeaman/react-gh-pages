import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { RequisitionActivityCollectionResponse } from "../../../../../types/requisitionActivity.types";
import getAPI from "../../../../../utils/getAPI";
import getPaginationParams from "../../../../../utils/getPaginationParams";
import RequisitionActivityList from "./RequisitionActivityList";

const RequisitionHistory = (props: {
    requisitionID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<RequisitionActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'requisition_history');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.requisitionID])

    const getActivity = () => {
        getAPI(`requisition_activity`, {
            ...paginationParams,
            requisition_id: props.requisitionID
        }, (response: any) => {
            const requisitionActivityData: RequisitionActivityCollectionResponse = response.data;
            setActivityData(requisitionActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Requisition History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <RequisitionActivityList
                isRequisitionActivityLoading={isActivityLoading}
                requisitionActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default RequisitionHistory