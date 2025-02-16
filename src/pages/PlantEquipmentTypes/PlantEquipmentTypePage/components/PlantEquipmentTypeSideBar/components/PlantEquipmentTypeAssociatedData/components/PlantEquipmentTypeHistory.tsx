import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { PlantEquipmentTypeActivityCollectionResponse } from "../../../../../../../../types/PlantEquipmentTypeActivity.types";
import getAPI from "../../../../../../../../utils/getAPI";
import getPaginationParams from "../../../../../../../../utils/getPaginationParams";
import PlantEquipmentTypeActivityList from "./PlantEquipmentTypeActivityList";

const PlantEquipmentTypeHistory = (props: {
    plantEquipmentTypeID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<PlantEquipmentTypeActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'product_category_activity');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.plantEquipmentTypeID])

    const getActivity = () => {
        getAPI(`plant_equipment_type_activity`, {
            ...paginationParams,
            plant_equipment_type_id: props.plantEquipmentTypeID
        }, (response: any) => {
            const plantEquipmentTypeActivityData: PlantEquipmentTypeActivityCollectionResponse = response.data;
            setActivityData(plantEquipmentTypeActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Plant/Tools Type History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <PlantEquipmentTypeActivityList
                isPlantEquipmentTypeActivityLoading={isActivityLoading}
                plantEquipmentTypeActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default PlantEquipmentTypeHistory