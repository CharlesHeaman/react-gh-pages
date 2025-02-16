import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { EquipmentCollectionResponse } from "../../../../../../types/equipment.types";
import getAPI from "../../../../../../utils/getAPI";
import EquipmentAdvancedSearch from "../../../../Equipment/components/EquipmentAdvancedSearch";
import EquipmentList from "../../../../Equipment/components/EquipmentList";
import EquipmentSearchHeader from "../../../../Equipment/components/EquipmentSearchHeader";
import getEquipmentSearchParams from "../../../../Equipment/utils/getEquipmentSearchParams";

const SiteEquipmentList = (props: {
    siteID: number,
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
    }, [props.siteID, JSON.stringify(equipmentSearchParams)])
    
    const getEquipment = () => {
        setShowAdvancedSearch(false);
        getAPI(`equipment`, {
            site_ids: [props.siteID],
            ...equipmentSearchParams,
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData);
        }, setIsEquipmentLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Site Equipment'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1600}
                top
            >
                <EquipmentSearchHeader 
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    siteID={props.siteID}
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

export default SiteEquipmentList