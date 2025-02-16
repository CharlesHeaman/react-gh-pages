import { useState } from "react"
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule";

const OnCallEmployeeAssociatedData = (props: {
    onCallEngineerID: number,
    activityCount: number,
}) => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title='On-call Employee'>
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            {/* <EngineerEquipmentDetailsHistory
                engineerequipmentdetailsID={props.engineerequipmentdetailsID}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
                totalCount={props.activityCount}
            /> */}
        </>
    )
}

export default OnCallEmployeeAssociatedData