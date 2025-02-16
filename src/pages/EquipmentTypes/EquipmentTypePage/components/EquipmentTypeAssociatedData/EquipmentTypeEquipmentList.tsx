import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { EquipmentCollectionResponse } from "../../../../../types/equipment.types";
import getAPI from "../../../../../utils/getAPI";
import EquipmentAdvancedSearch from "../../../../CustomerAdmin/Equipment/components/EquipmentAdvancedSearch";
import EquipmentList from "../../../../CustomerAdmin/Equipment/components/EquipmentList";
import EquipmentSearchHeader from "../../../../CustomerAdmin/Equipment/components/EquipmentSearchHeader";
import getEquipmentSearchParams from "../../../../CustomerAdmin/Equipment/utils/getEquipmentSearchParams";

const EquipmentTypeEquipmentList = (props: {
    equipmentTypeID: number,
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
    }, [props.equipmentTypeID, JSON.stringify(equipmentSearchParams)])
    
    const getEquipment = () => {
        setShowAdvancedSearch(false);
        getAPI(`equipment`, {
            equipment_type_id: [props.equipmentTypeID],
            ...equipmentSearchParams,
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData);
        }, setIsEquipmentLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Equipment Type Equipment'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1400}
                top
            >
                <EquipmentSearchHeader 
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    siteID={props.equipmentTypeID}
                />
                <EquipmentList 
                    hasSearched={true} 
                    isEquipmentLoading={isEquipmentLoading} 
                    equipment={equipmentData} 
                    perPage={equipmentSearchParams.perPage}
                    totalCount={props.totalCount}
                    hideType
                />
            </WindowOverlay>
            
            <EquipmentAdvancedSearch
                show={showAdvancedSearch} 
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default EquipmentTypeEquipmentList