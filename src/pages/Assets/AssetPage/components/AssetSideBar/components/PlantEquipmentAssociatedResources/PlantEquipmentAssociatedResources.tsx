import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import PlantEquipmentHistory from "./components/PlantEquipmentHistory";

const PlantEquipmentAssociatedResources = (props: {
    plantEquipmentID: number,
    activityCount: number,
}) => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <> 
            <SideBarModule title="Plant/Tools">
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <PlantEquipmentHistory
                plantEquipmentID={props.plantEquipmentID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            />
        </>
    )
}

export default PlantEquipmentAssociatedResources