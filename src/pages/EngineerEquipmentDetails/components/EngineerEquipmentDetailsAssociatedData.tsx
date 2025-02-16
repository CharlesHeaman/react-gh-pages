import { useState } from "react"
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule";
import EngineerEquipmentDetailsHistory from "./EngineerEquipmentDetailsHistory";

const EngineerEquipmentDetailsAssociatedData = (props: {
    engineerEquipmentDetailsID: number,
    activityCount: number,
}) => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title='Engineer Equipment Details'>
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <EngineerEquipmentDetailsHistory
                engineerEquipmentDetailsID={props.engineerEquipmentDetailsID}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
                totalCount={props.activityCount}
            />
        </>
    )
}

export default EngineerEquipmentDetailsAssociatedData