import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { AssetCollectionResponse } from "../../../types/asset.types";
import getAPI from "../../../utils/getAPI";
import getPlantEquipmentSearchParams from "../utils/getPlantEquipmentSearchParams";
import PlantEquipmentAdvancedSearch from "./components/PlantEquipmentAdvancedSearch";
import PlantEquipmentList from "./components/PlantEquipmentList";
import PlantEquipmentSearchHeader from "./components/PlantEquipmentSearchHeader";
import PlantToolsNavigation from "./components/PlantToolsNavigation";

const PlantEquipmentListPage = ()  => {
    const [searchParams,] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isAssetLoading, setIsAssetLoading] = useState(false);
    const [assetData, setAssetData] = useState<AssetCollectionResponse>();

    // Search Parameters
    const hasSearched = searchParams.get(`plant_equipment_has_searched`) === "true";
    const plantEquipmentSearchParams = getPlantEquipmentSearchParams(searchParams);

    useEffect(() => {
        hasSearched && searchAssets();
    }, [JSON.stringify(plantEquipmentSearchParams)])

    const searchAssets = () => {
        setShowAdvancedSearch(false);
        getAPI('assets', plantEquipmentSearchParams, (response: any) => {
            const assetData: AssetCollectionResponse = response.data;
            setAssetData(assetData);
        }, setIsAssetLoading);
    }
    
    return (
        <>
            <PlantToolsNavigation location='all'/>
            <OuterContainer
                title='Plant/Tools'
                maxWidth={1900}
                description="Create, edit and deactivate plant/tools. Manage plant/tools assignment. Manage PAT, calibration and maintenance of equipment. Manage plant/tools documents."
                noBorder
            >
                <PlantEquipmentSearchHeader
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />
                <PlantEquipmentList 
                    hasSearched={hasSearched} 
                    isPlantEquipmentLoading={isAssetLoading} 
                    plantEquipment={assetData} 
                    perPage={plantEquipmentSearchParams.perPage}      
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}         
                />
            </OuterContainer>

            <PlantEquipmentAdvancedSearch
                show={showAdvancedSearch}
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default PlantEquipmentListPage