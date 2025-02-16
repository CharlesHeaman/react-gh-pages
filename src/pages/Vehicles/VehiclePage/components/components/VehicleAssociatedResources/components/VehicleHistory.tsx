import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { VehicleActivityCollectionResponse } from "../../../../../../../types/vehicleActivity.types"
import getAPI from "../../../../../../../utils/getAPI"
import getPaginationParams from "../../../../../../../utils/getPaginationParams"
import VehicleActivityList from "./VehicleActivityList"

const VehicleHistory = (props: {
    vehicleID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<VehicleActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'vehicle_history');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.vehicleID])

    const getActivity = () => {
        getAPI(`vehicle_activity`, {
            ...paginationParams,
            vehicle_id: props.vehicleID
        }, (response: any) => {
            const vehicleActivityData: VehicleActivityCollectionResponse = response.data;
            setActivityData(vehicleActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Vehicle History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <VehicleActivityList
                isVehicleActivityLoading={isActivityLoading}
                vehicleActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default VehicleHistory