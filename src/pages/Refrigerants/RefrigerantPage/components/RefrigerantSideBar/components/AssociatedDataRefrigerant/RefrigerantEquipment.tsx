import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { EquipmentCollectionResponse } from "../../../../../../../types/equipment.types";
import getAPI from "../../../../../../../utils/getAPI";
import EquipmentAdvancedSearch from "../../../../../../CustomerAdmin/Equipment/components/EquipmentAdvancedSearch";
import EquipmentList from "../../../../../../CustomerAdmin/Equipment/components/EquipmentList";
import EquipmentSearchHeader from "../../../../../../CustomerAdmin/Equipment/components/EquipmentSearchHeader";
import getEquipmentSearchParams from "../../../../../../CustomerAdmin/Equipment/utils/getEquipmentSearchParams";

const RefrigerantEquipment = (props: {
    refrigerantID: number,
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
    }, [props.refrigerantID, JSON.stringify(equipmentSearchParams)])
    
    const getEquipment = (ignoreAdvanced?: boolean) => {
        setShowAdvancedSearch(false);
        getAPI(`equipment`, {
            refrigerant_id: props.refrigerantID,
            ...equipmentSearchParams,
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData);
        }, setIsEquipmentLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Refrigerant Equipment List'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1600}
                top
            >
                <EquipmentSearchHeader 
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    refrigerantID={props.refrigerantID}
                />
                <EquipmentList 
                    hasSearched={true} 
                    isEquipmentLoading={isEquipmentLoading} 
                    equipment={equipmentData} 
                    perPage={equipmentSearchParams.perPage}
                    totalCount={props.totalCount}
                />
            </WindowOverlay>

            <EquipmentAdvancedSearch
                show={showAdvancedSearch} 
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default RefrigerantEquipment