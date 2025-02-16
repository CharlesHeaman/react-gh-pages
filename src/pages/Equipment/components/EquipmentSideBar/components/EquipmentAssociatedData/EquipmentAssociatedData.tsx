import { useState } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import EquipmentSlavesList from "./components/EquipmentSlavesList";
import EquipmentHistory from "../../../../../CustomerAdmin/Equipment/components/EquipmentHistory";

const EquipmentAssociatedData = (props: {
    equipmentID: number,
    slavesCount: number,
    activityCount: number,
}) => {
    const [showSlaves, setShowSlaves] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title='Equipment'>
                <SideBarButton 
                    text={`Slaves (${props.slavesCount})`}
                    iconFont='local_laundry_service'
                    clickEvent={() => setShowSlaves(true)}
                />
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <EquipmentSlavesList
                equipmentID={props.equipmentID}
                totalCount={props.slavesCount}
                show={showSlaves}
                hideFunc={() => setShowSlaves(false)}
            />

            <EquipmentHistory
                equipmentID={props.equipmentID}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
                totalCount={props.activityCount}
            />
        </>
    )
}

export default EquipmentAssociatedData