import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import RefrigerantGasBottles from "../../../../../../GasBottles/GasBottlePage/components/GasBottleSideBar/components/GasBottleAssignment/components/RefrigerantGasBottles";
import RefrigerantEquipment from "./RefrigerantEquipment";
import RefrigerantHistory from "./RefrigerantHistory";

const AssociatedDataRefrigerant = (props: {
    refrigerantID: number,
    equipmentCount: number,
    gasBottleCount: number,
    activityCount: number,
}) => {
    const [showGasBottles, setShowGasBottles] = useState(false);
    const [showEquipment, setShowEquipment] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title="Refrigerant">
                <SideBarButton
                    text={`Equipment (${props.equipmentCount})`}
                    iconFont="local_laundry_service"
                    clickEvent={() => setShowEquipment(true)}
                />
                <SideBarButton
                    text={`Gas Bottles (${props.gasBottleCount})`}
                    iconFont="propane_tank"
                    clickEvent={() => setShowGasBottles(true)}
                />
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <RefrigerantEquipment
                refrigerantID={props.refrigerantID}
                show={showEquipment}
                hideFunc={() => setShowEquipment(false)}    
                totalCount={props.equipmentCount}        
            />

            <RefrigerantGasBottles
                refrigerantID={props.refrigerantID}
                show={showGasBottles}
                hideFunc={() => setShowGasBottles(false)}
                totalCount={props.gasBottleCount}
            />

            <RefrigerantHistory
                refrigerantID={props.refrigerantID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            />
        </>
    )
}

export default AssociatedDataRefrigerant