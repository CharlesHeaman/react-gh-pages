import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { AssetCollectionResponse } from "../../../../../../../../types/asset.types";
import getAPI from "../../../../../../../../utils/getAPI";
import PlantEquipmentAdvancedSearch from "../../../../../../../Assets/AssetListPage/components/PlantEquipmentAdvancedSearch";
import PlantEquipmentList from "../../../../../../../Assets/AssetListPage/components/PlantEquipmentList";
import PlantEquipmentSearchHeader from "../../../../../../../Assets/AssetListPage/components/PlantEquipmentSearchHeader";
import getPlantEquipmentSearchParams from "../../../../../../../Assets/utils/getPlantEquipmentSearchParams";

const PlantEquipmentTypePlantEquipment = (props: {
    plantEquipmentTypeID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States 
    const [isPlantEquipmentLoading, setIsPlantEquipmentLoading] = useState(true)
    const [plantEquipmentData, setPlantEquipmentData] = useState<AssetCollectionResponse>();
    
    // Search Parameters 
    const plantEquipmentSearchParams = getPlantEquipmentSearchParams(searchParams);

    useEffect(() => {
        getPlantEquipment();
    }, [props.plantEquipmentTypeID, JSON.stringify(plantEquipmentSearchParams)])

    const getPlantEquipment = () => {
        getAPI(`assets`, {
            ...plantEquipmentSearchParams,
            plant_equipment_type_id: props.plantEquipmentTypeID,
        }, (response: any) => {
            const plantEquipmentData: AssetCollectionResponse = response.data;
            setPlantEquipmentData(plantEquipmentData);
        }, setIsPlantEquipmentLoading)    
    }

    return (
        <>
            <WindowOverlay 
                title={"Plant/Tools Type Plant and Equipment"} 
                maxWidth={1600} 
                show={props.show}
                hideFunc={props.hideFunc} 
                top
            >
                <PlantEquipmentSearchHeader
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />
                <PlantEquipmentList 
                    isPlantEquipmentLoading={isPlantEquipmentLoading} 
                    plantEquipment={plantEquipmentData} 
                    perPage={plantEquipmentSearchParams.perPage}  
                    totalCount={props.totalCount}   
                    hideType
                />
            </WindowOverlay>

            <PlantEquipmentAdvancedSearch
                show={showAdvancedSearch}
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default PlantEquipmentTypePlantEquipment