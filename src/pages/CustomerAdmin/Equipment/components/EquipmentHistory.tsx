import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { EquipmentActivityCollectionResponse } from "../../../../types/equipmentActivity.types";
import getAPI from "../../../../utils/getAPI";
import getPaginationParams from "../../../../utils/getPaginationParams";
import EquipmentActivityList from "./EquipmentActivityList";

const EquipmentHistory = (props: {
    equipmentID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<EquipmentActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'equipment_history');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.equipmentID])

    const getActivity = () => {
        getAPI(`equipment_activity`, {
            ...paginationParams,
            equipment_id: props.equipmentID
        }, (response: any) => {
            const equipmentActivityData: EquipmentActivityCollectionResponse = response.data;
            setActivityData(equipmentActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Equipment History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <EquipmentActivityList
                isEquipmentActivityLoading={isActivityLoading}
                equipmentActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default EquipmentHistory