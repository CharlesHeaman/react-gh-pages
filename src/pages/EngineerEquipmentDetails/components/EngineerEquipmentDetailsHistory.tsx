import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { EngineerEquipmentDetailsActivityCollectionResponse } from "../../../types/engineerEquipmentDetailsActivity.types";
import getAPI from "../../../utils/getAPI";
import getPaginationParams from "../../../utils/getPaginationParams";
import EngineerEquipmentDetailsActivityList from "./EngineerEquipmentDetailsActivityList";

const EngineerEquipmentDetailsHistory = (props: {
    engineerEquipmentDetailsID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<EngineerEquipmentDetailsActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'engineer_equipment_details_activity');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.engineerEquipmentDetailsID])

    const getActivity = () => {
        getAPI(`engineer_equipment_details_activity`, {
            ...paginationParams,
            engineer_equipment_details_id: props.engineerEquipmentDetailsID
        }, (response: any) => {
            const engineerEquipmentDetailsActivityData: EngineerEquipmentDetailsActivityCollectionResponse = response.data;
            setActivityData(engineerEquipmentDetailsActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Engineer Equipment Details History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <EngineerEquipmentDetailsActivityList
                isEngineerEquipmentDetailsActivityLoading={isActivityLoading}
                engineerEquipmentDetailsActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default EngineerEquipmentDetailsHistory