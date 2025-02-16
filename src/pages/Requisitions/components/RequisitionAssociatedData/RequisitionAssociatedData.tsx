import { useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";
import RequisitionHistory from "./RequisitionHistory/RequisitionHistory";

const RequisitionAssociatedData = (props: {
    requisitionID: number,
    activityCount: number,
}) => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title="Requisition">
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <RequisitionHistory 
                requisitionID={props.requisitionID}
                totalCount={props.activityCount}
                show={showHistory} 
                hideFunc={() => setShowHistory(false)}
            /> 
        </>
    )
}

export default RequisitionAssociatedData