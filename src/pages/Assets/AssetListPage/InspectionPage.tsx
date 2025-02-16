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

const InspectionPage = ()  => {
    const [searchParams,] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isAssetLoading, setIsAssetLoading] = useState(false);
    const [assetData, setAssetData] = useState<AssetCollectionResponse>();

    // Search Parameters
    const plantEquipmentSearchParams = getPlantEquipmentSearchParams(searchParams);

    useEffect(() => {
        searchAssets();
    }, [JSON.stringify(plantEquipmentSearchParams)])

    const searchAssets = () => {
        setShowAdvancedSearch(false);
        getAPI('assets', {
            ...plantEquipmentSearchParams,
            requires_inspection: true,
            is_active: true
        }, (response: any) => {
            const assetData: AssetCollectionResponse = response.data;
            setAssetData(assetData);
        }, setIsAssetLoading);
    }
    
    return (
        <>
            <PlantToolsNavigation location='inspection'/>
            <OuterContainer
                title='Inspection'
                maxWidth={1600}
                description="Record plant/tools inspections."
                noBorder
            >
                <PlantEquipmentSearchHeader
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    hideCreate
                    hideFilters
                />
                <PlantEquipmentList 
                    hasSearched={true} 
                    isPlantEquipmentLoading={isAssetLoading} 
                    plantEquipment={assetData} 
                    perPage={plantEquipmentSearchParams.perPage}      
                    showAdvancedSearch={() => setShowAdvancedSearch(true)} 
                    hidePATestingDue 
                    hideCalibrationDue
                    hideMaintenanceDue
                />
            </OuterContainer>

            <PlantEquipmentAdvancedSearch
                show={showAdvancedSearch}
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default InspectionPage