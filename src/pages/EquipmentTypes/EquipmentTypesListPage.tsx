import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { EquipmentTypeCollectionResponse } from "../../types/equipmentType.types";
import getAPI from "../../utils/getAPI";
import CreateEquipmentType from "./components/CreateEquipmentType";
import EquipmentTypeList from "./components/EquipmentTypeList";
import EquipmentTypeSearchHeader from "./components/EquipmentTypeSearchHeader";
import getEquipmentTypeSearchParams from "./utils/getEquipmentTypeSearchParams";
const EquipmentTypesListPage = ()  => {
    const [searchParams] = useSearchParams();

    const [showCreate, setShowCreate] = useState(false);

    // Data States 
    const [isEquipmentTypesLoading, setIsEquipmentTypesLoading] = useState(true);
    const [equipmentTypeData, setEquipmentTypeData] = useState<EquipmentTypeCollectionResponse>();

    // Search Parameters
    const equipmentTypeSearchParams = getEquipmentTypeSearchParams(searchParams);

    useEffect(() => {
        searchEquipmentTypes();
    }, [JSON.stringify(equipmentTypeSearchParams)])

    const searchEquipmentTypes = () => {
        getAPI('equipment_types', equipmentTypeSearchParams, (response: any) => {
            const costCentreData: EquipmentTypeCollectionResponse = response.data;
            setEquipmentTypeData(costCentreData);
        }, setIsEquipmentTypesLoading);
    }
    
    return (
        <>
            <OuterContainer
                title='Equipment Types'
                description="Create, edit and deactivate equipment types. Manage equipment type service time and slave quantity."
                maxWidth={1200}
                noBorder
            >
                <EquipmentTypeSearchHeader
                    showCreate={() => setShowCreate(true)}
                />
                <EquipmentTypeList 
                    isEquipmentTypesLoading={isEquipmentTypesLoading} 
                    equipmentTypes={equipmentTypeData} 
                    perPage={equipmentTypeSearchParams.perPage}                    
                />
            </OuterContainer>

            <CreateEquipmentType
                show={showCreate}
                hideFunc={() => setShowCreate(false)}
            />
        </>
    )
}

export default EquipmentTypesListPage