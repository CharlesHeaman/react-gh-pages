import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { PlantEquipmentActivityCollectionResponse } from "../../../../../../../../types/plantEquipmentActivity.types";
import getAPI from "../../../../../../../../utils/getAPI";
import getPaginationParams from "../../../../../../../../utils/getPaginationParams";
import PlantEquipmentActivityList from "./PlantEquipmentActivityList";

const PlantEquipmentHistory = (props: {
    plantEquipmentID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<PlantEquipmentActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'plant_equipment_activity');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.plantEquipmentID])

    const getActivity = () => {
        getAPI(`plant_equipment_activity`, {
            ...paginationParams,
            plant_equipment_id: props.plantEquipmentID
        }, (response: any) => {
            const plantEquipmentActivityData: PlantEquipmentActivityCollectionResponse = response.data;
            setActivityData(plantEquipmentActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Plant/Tools History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <PlantEquipmentActivityList
                isPlantEquipmentActivityLoading={isActivityLoading}
                plantEquipmentActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default PlantEquipmentHistory