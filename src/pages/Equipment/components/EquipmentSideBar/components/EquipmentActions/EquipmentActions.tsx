import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import EquipmentChangeSite from "./components/EquipmentChangeSite";
import { EquipmentResponseData } from "../../../../../../types/equipment.types";
import { SiteResponseData } from "../../../../../../types/sites.types";

const EquipmentActions = (props: {
    equipmentID: number,
    site: SiteResponseData,
    customerID: number,
    setEquipmentData: Dispatch<SetStateAction<EquipmentResponseData | undefined>>,
    setIsEditMode: () => void
}) => {
    const [showChangeSite, setShowChangeSite] = useState(false);
    return (
        <>
            <SideBarModule title='Actions'>
                <SideBarButton 
                    text='Edit Equipment'
                    color="orange"
                    iconFont='edit'
                    clickEvent={props.setIsEditMode}
                />
                <SideBarButton 
                    text='Move to New Site'
                    iconFont='business'
                    clickEvent={() => setShowChangeSite(true)}
                />
            </SideBarModule>

            <EquipmentChangeSite 
                equipmentID={props.equipmentID} 
                site={props.site} 
                customerID={props.customerID} 
                setEquipmentData={props.setEquipmentData} 
                show={showChangeSite} 
                hideFunc={() => setShowChangeSite(false)}            
            />
        </>
    )
}

export default EquipmentActions