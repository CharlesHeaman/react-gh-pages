import { useState } from "react";
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import EquipmentTypeEquipmentList from "./EquipmentTypeEquipmentList";
import EquipmentTypeHistory from "./EquipmentTypeHistory";

const EquipmentTypeAssociatedData = (props: {
    equipmentTypeID: number,
    equipmentCount: number,
    activityCount: number,
}) => {
    const [showEquipment, setShowEquipment] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title='Equipment Type'>
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

            <EquipmentTypeEquipmentList
                equipmentTypeID={props.equipmentTypeID}
                totalCount={props.equipmentCount}
                show={showEquipment}
                hideFunc={() => setShowEquipment(false)}
            />

            <EquipmentTypeHistory
                equipmentTypeID={props.equipmentTypeID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            />
        </>
    )
}

export default EquipmentTypeAssociatedData