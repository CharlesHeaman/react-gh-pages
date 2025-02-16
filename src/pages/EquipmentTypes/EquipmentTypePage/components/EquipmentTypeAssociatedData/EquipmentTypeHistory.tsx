import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { EquipmentTypeActivityCollectionResponse } from "../../../../../types/equipmentTypeActivity.types";
import getAPI from "../../../../../utils/getAPI";
import getPaginationParams from "../../../../../utils/getPaginationParams";
import EquipmentTypeActivityList from "./EquipmentTypeActivityList";

const EquipmentTypeHistory = (props: {
    equipmentTypeID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<EquipmentTypeActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'equipment_type_activity');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.equipmentTypeID])

    const getActivity = () => {
        getAPI(`equipment_type_activity`, {
            ...paginationParams,
            equipment_type_id: props.equipmentTypeID
        }, (response: any) => {
            const costCentreActivityData: EquipmentTypeActivityCollectionResponse = response.data;
            setActivityData(costCentreActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Equipment Type History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <EquipmentTypeActivityList
                isEquipmentTypeActivityLoading={isActivityLoading}
                costCentreActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default EquipmentTypeHistory