import { useSearchParams } from "react-router-dom";
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { useState } from "react";
import ContractSitesList from "./components/ContractSitesList";
import ContractEquipmentList from "./ContractEquipmentList";
import ContractHistory from "../ContractAssociatedData/components/ContractHistory";

const ContractAssociatedData = (props: {
    contractID: number,
    sitesCount: number,
    equipmentCount: number,
    activityCount: number,
}) => {
    const [searchParams] = useSearchParams();

    const [showSites, setShowSites] = useState(searchParams.get("showSites") === "true");
    const [showEquipment, setShowEquipment] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title='Contract'>
                <SideBarButton 
                    text={`Sites (${props.sitesCount})`}
                    iconFont='business'
                    clickEvent={() => setShowSites(true)}
                />
                <SideBarButton 
                    text={`Equipment (${props.equipmentCount})`}
                    iconFont='local_laundry_service'
                    clickEvent={() => setShowEquipment(true)}
                />
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <ContractSitesList 
                contractID={props.contractID} 
                totalCount={props.sitesCount} 
                show={showSites} 
                hideFunc={() => setShowSites(false)}            
            />

            <ContractEquipmentList 
                contractID={props.contractID} 
                totalCount={props.equipmentCount} 
                show={showEquipment} 
                hideFunc={() => setShowEquipment(false)}            
            />

            <ContractHistory
                contractID={props.contractID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            />
        </>
    )
}

export default ContractAssociatedData