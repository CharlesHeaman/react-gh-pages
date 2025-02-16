import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { CostCentreActivityCollectionResponse } from "../../../../../../../../types/costCentreActivity.types";
import getAPI from "../../../../../../../../utils/getAPI";
import getPaginationParams from "../../../../../../../../utils/getPaginationParams";
import CostCentreActivityList from "./CostCentreActivityList";

const CostCentreHistory = (props: {
    costCentreID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<CostCentreActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'cost_centre_activity');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.costCentreID])

    const getActivity = () => {
        getAPI(`cost_centre_activity`, {
            ...paginationParams,
            cost_centre_id: props.costCentreID
        }, (response: any) => {
            const costCentreActivityData: CostCentreActivityCollectionResponse = response.data;
            setActivityData(costCentreActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Cost Centre History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <CostCentreActivityList
                isCostCentreActivityLoading={isActivityLoading}
                costCentreActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default CostCentreHistory