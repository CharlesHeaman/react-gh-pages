import { useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";
import SelectQuotedEquipmentStatus from "./SelectQuotedEquipmentStatus";

const QuotedEquipmentActions = (props: {
    quotedEquipmentID: number,
    quotedEquipmentStatus: number,
    getQuotedEquipment: () => void,
}) => {
    const [showStatus, setShowStatus] = useState(false);
    
    return (
        <>
            <SideBarModule title="Actions">
                <SideBarButton
                    text="Select Status"
                    iconFont="label"
                    color="no-color"
                    clickEvent={() => setShowStatus(true)}
                />
            </SideBarModule>
            
            <SelectQuotedEquipmentStatus 
                quotedEquipmentID={props.quotedEquipmentID} 
                quotedEquipmentStatus={props.quotedEquipmentStatus} 
                getQuotedEquipment={props.getQuotedEquipment}
                show={showStatus} 
                hideFunc={() => setShowStatus(false)}
            />

        </>
    )
}

export default QuotedEquipmentActions