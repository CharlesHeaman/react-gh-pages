import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import GasBottleAudit from "./components/GasBottleAudit";
import GasBottleRefrigerantHistory from "./components/GasBottleRefrigerantHistory";

const GasBottleAssociatedData = (props: {
    bottleID: number,
    bottleNumber: string,
    activityCount: number,
    refrigerantMovementCount: number,
    isConsumable?: boolean,
}) => {
    const [showBottleHistory, setShowBottleHistory] = useState(false);
    const [showRefrigerantHistory, setShowRefrigerantHistory] = useState(false);
    return (
        <>
            <SideBarModule title={`${props.isConsumable ? 'Gas/Air' : 'Refrigerant'} Bottle`}>
                {!props.isConsumable ? <SideBarButton
                    text={`Refrigerant Movements (${props.refrigerantMovementCount})`}
                    iconFont="propane"
                    clickEvent={() => setShowRefrigerantHistory(true)}
                /> : null}
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowBottleHistory(true)}
                />
            </SideBarModule>

            <GasBottleAudit   
                bottleID={props.bottleID}
                show={showBottleHistory}
                hideFunc={() => setShowBottleHistory(false)}
                totalCount={props.activityCount}
                isConsumable={props.isConsumable}
            />

            <GasBottleRefrigerantHistory
                bottleNumber={props.bottleNumber}
                show={showRefrigerantHistory}
                hideFunc={() => setShowRefrigerantHistory(false)}
                totalCount={props.refrigerantMovementCount}
            />
        </>
    )
}

export default GasBottleAssociatedData