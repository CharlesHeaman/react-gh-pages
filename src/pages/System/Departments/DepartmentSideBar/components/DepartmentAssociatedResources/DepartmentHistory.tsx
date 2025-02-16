import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { DepartmentActivityCollectionResponse } from "../../../../../../types/departmentActivity.types";
import getAPI from "../../../../../../utils/getAPI";
import getPaginationParams from "../../../../../../utils/getPaginationParams";
import DepartmentActivityList from "./DepartmentActivityList";

const DepartmentHistory = (props: {
    departmentID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<DepartmentActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'department_history');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.departmentID])

    const getActivity = () => {
        getAPI(`department_activity`, {
            ...paginationParams,
            department_id: props.departmentID
        }, (response: any) => {
            const departmentActivityData: DepartmentActivityCollectionResponse = response.data;
            setActivityData(departmentActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Department History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <DepartmentActivityList
                isDepartmentActivityLoading={isActivityLoading}
                departmentActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default DepartmentHistory