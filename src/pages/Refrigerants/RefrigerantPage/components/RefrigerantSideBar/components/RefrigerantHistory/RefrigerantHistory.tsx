import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import RefrigerantMovementHistory from "./components/RefrigerantMovementHistory"

const RefrigerantHistory = (props: {
    refrigerantID: number,
    refrigerantMovementCount: number,
}) => {
    const [showHistory, setShowHistory] = useState(false);
    return (
        <>
            <SideBarModule title="History">
                <SideBarButton
                    text={`Refrigerant Movements (${props.refrigerantMovementCount})`}
                    iconFont="propane"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <RefrigerantMovementHistory 
                refrigerant_id={props.refrigerantID} 
                totalCount={props.refrigerantMovementCount}
                show={showHistory} 
                hideFunc={() => setShowHistory(false)}
            />
        </>
    )
}

export default RefrigerantHistory