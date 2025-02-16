import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { EquipmentCollectionResponse } from "../../../../../../../types/equipment.types";
import getAPI from "../../../../../../../utils/getAPI";
import EquipmentAdvancedSearch from "../../../../../../CustomerAdmin/Equipment/components/EquipmentAdvancedSearch";
import EquipmentList from "../../../../../../CustomerAdmin/Equipment/components/EquipmentList";
import EquipmentSearchHeader from "../../../../../../CustomerAdmin/Equipment/components/EquipmentSearchHeader";
import getEquipmentSearchParams from "../../../../../../CustomerAdmin/Equipment/utils/getEquipmentSearchParams";

const EquipmentSlavesList = (props: {
    equipmentID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();
    
    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentCollectionResponse>();

    // Search Parameters 
    const equipmentSearchParams = getEquipmentSearchParams(searchParams);

    useEffect(() => {
        getEquipment();
    }, [props.equipmentID, JSON.stringify(equipmentSearchParams)])
    
    const getEquipment = (ignoreAdvanced?: boolean) => {
        setShowAdvancedSearch(false);
        getAPI(`equipment`, {
            master_equipment_id: [props.equipmentID],
            ...equipmentSearchParams,
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData);
        }, setIsEquipmentLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Equipment Slaves'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1400}
            >
                <EquipmentSearchHeader 
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />
                <EquipmentList 
                    hasSearched={true} 
                    isEquipmentLoading={isEquipmentLoading} 
                    equipment={equipmentData} 
                    perPage={equipmentSearchParams.perPage}
                    totalCount={props.totalCount}
                    hideSite
                />
            </WindowOverlay>
            
            <EquipmentAdvancedSearch
                show={showAdvancedSearch} 
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default EquipmentSlavesList