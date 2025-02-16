import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { EquipmentCollectionResponse } from "../../../types/equipment.types";
import getAPI from "../../../utils/getAPI";
import CustomerAdminNavigation from "../components/CustomerAdminNavigation";
import EquipmentAdvancedSearch from "./components/EquipmentAdvancedSearch";
import EquipmentList from "./components/EquipmentList";
import EquipmentSearchHeader from "./components/EquipmentSearchHeader";
import getEquipmentSearchParams from "./utils/getEquipmentSearchParams";

const EquipmentListPage = () => {
    const [searchParams] = useSearchParams();
    
    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentCollectionResponse>();

    // Search Parameters 
    const hasSearched = searchParams.get(`equipment_has_searched`) === "true";
    const equipmentSearchParams = getEquipmentSearchParams(searchParams);

    useEffect(() => {
        hasSearched && searchEquipment();
    }, [JSON.stringify(equipmentSearchParams)])

    const searchEquipment = () => {
        setShowAdvancedSearch(false);
        getAPI('equipment', {
            ...equipmentSearchParams,
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData);
        }, setIsEquipmentLoading);
    }

    return (
        <>
            <CustomerAdminNavigation location='equipment'/>
            <OuterContainer 
                title='Customer Equipment' 
                description='Create, edit and deactivate customer equipment. Manage equipment slaves and masters.'
                maxWidth={1600}
                noBorder
            >
                <EquipmentSearchHeader 
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />
                <EquipmentList 
                    hasSearched={hasSearched} 
                    isEquipmentLoading={isEquipmentLoading} 
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    equipment={equipmentData} 
                    perPage={equipmentSearchParams.perPage}
                />
            </OuterContainer> 

            <EquipmentAdvancedSearch
                show={showAdvancedSearch} 
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default EquipmentListPage