import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { PlantEquipmentTypeCollectionResponse } from "../../../types/plantEquipmentTypes.types";
import getAPI from "../../../utils/getAPI";
import PlantEquipmentTypeSearchHeader from "../components/PlantEquipmentTypeSearchHeader";
import getPlantEquipmentTypeSearchParams from "../utils/getPlantEquipmentTypeSerachParams";
import PlantEquipmentTypesList from "../components/PlantEquipmentTypesList"
import CreatePlantEquipmentType from "./components/CreatePlantEquipmentType/CreatePlantEquipmentType";

const PlantEquipmentTypesListPage = ()  => {
    const [searchParams] = useSearchParams();

    const [showCreate, setShowCreate] = useState(false);

    // Data States 
    const [isPlantEquipmentTypesLoading, setIsPlantEquipmentTypesLoading] = useState(true);
    const [plantEquipmentTypesData, setPlantEquipmentTypesData] = useState<PlantEquipmentTypeCollectionResponse>();

    const plantEquipmentTypesSearchParams = getPlantEquipmentTypeSearchParams(searchParams);

    useEffect(() => {
        searchPlantEquipmentTypes();
    }, [JSON.stringify(plantEquipmentTypesSearchParams)])

    const searchPlantEquipmentTypes = () => {
        getAPI('plant_equipment_types', plantEquipmentTypesSearchParams, (response: any) => {
            const plantEquipmentTypesData: PlantEquipmentTypeCollectionResponse = response.data;
            setPlantEquipmentTypesData(plantEquipmentTypesData);
        }, setIsPlantEquipmentTypesLoading);
    }
    
    return (
        <>
            <OuterContainer
                title='Plant/Tools Types'
                maxWidth={900}
                description="Create, edit and plant/tools types. Manage PAT, calibration, inspection and maintenance requirements and frequency."
                noBorder
            >
                <PlantEquipmentTypeSearchHeader
                    showCreate={() => setShowCreate(true)}
                />
                <PlantEquipmentTypesList
                    isPlantEquipmentTypesLoading={isPlantEquipmentTypesLoading}
                    plantEquipmentTypesData={plantEquipmentTypesData}
                    perPage={plantEquipmentTypesSearchParams.perPage}
                />   
            </OuterContainer>

            <CreatePlantEquipmentType
                show={showCreate}
                hideFunc={() => setShowCreate(false)}
            />
        </>
    )
}

export default PlantEquipmentTypesListPage