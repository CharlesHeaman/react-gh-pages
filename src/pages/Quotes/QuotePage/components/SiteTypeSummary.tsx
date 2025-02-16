import { useEffect, useState } from "react";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { EquipmentCollectionResponse } from "../../../../types/equipment.types";
import getAPI from "../../../../utils/getAPI";
import EquipmentTypeSummaryList from "../../../CustomerAdmin/Equipment/components/EquipmentTypeSummaryList";
const SiteTypeSummary = (props: {
    siteID: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    // Data States
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentCollectionResponse>();

    // Search Parameters 
    useEffect(() => {
        getEquipment();
    }, [props.siteID])
    
    const getEquipment = () => {
        getAPI(`equipment`, {
            site_ids: [props.siteID],
            is_active: true
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData);
        }, setIsEquipmentLoading)    
    } 

    return (
        <WindowOverlay
            title='Site Equipment Summary'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={400}
            top
        >
            <EquipmentTypeSummaryList 
                isEquipmentLoading={isEquipmentLoading} 
                equipment={equipmentData} 
                perPage={5}
                totalCount={5}
            />
        </WindowOverlay>            
    )
}

export default SiteTypeSummary