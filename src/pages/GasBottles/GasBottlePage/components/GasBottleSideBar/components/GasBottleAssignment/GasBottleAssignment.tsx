import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import AssignGasBottleToEngineer from "./components/AssignGasBottleToEngineer";
import UnassignGasBottle from "./components/UnassignGasBottle";
import { GasBottleResponseData } from "../../../../../../../types/gasBottle.types";

const GasBottleAssignment = (props: {
    gasBottleID: number,
    isAssigned: boolean,
    current_gas_weight: number,
    tare_weight: number,
    setGasBottleData: Dispatch<SetStateAction<GasBottleResponseData | undefined>>,
    isConsumable?: boolean,
}) => {
    const [showAssign, setShowAssign] = useState(false);
    const [showUnassign, setShowUnassign] = useState(false);

    return (
        <>
            <SideBarModule title="Assignment">
                {!props.isAssigned ?
                    <SideBarButton
                        text="Assign to Engineer"
                        iconFont="assignment_ind"
                        color="light-green"
                        clickEvent={() => setShowAssign(true)}
                    /> :
                    <SideBarButton
                        text="Unassign Bottle"
                        iconFont="person_off"
                        color="dark-blue"
                        clickEvent={() => setShowUnassign(true)}
                    />
                }
            </SideBarModule>

            <AssignGasBottleToEngineer
                gasBottleID={props.gasBottleID}
                current_gas_weight={props.current_gas_weight}
                tare_weight={props.tare_weight}
                setGasBottleData={props.setGasBottleData}
                show={showAssign}
                hideFunc={() => setShowAssign(false)}
                isConsumable={props.isConsumable}
            />

            <UnassignGasBottle
                gasBottleID={props.gasBottleID}
                current_gas_weight={props.current_gas_weight}
                tare_weight={props.tare_weight}
                setGasBottleData={props.setGasBottleData}
                show={showUnassign}
                hideFunc={() => setShowUnassign(false)}
                isConsumable={props.isConsumable}
            />
        </>
    )
}

export default GasBottleAssignment