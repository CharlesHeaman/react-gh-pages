import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import ReturnGasBottleToSupplier from "./components/ReturnGasBottleToSupplier"
import { GasBottleResponseData } from "../../../../../../../types/gasBottle.types";
import QueueBottleForReturn from "./components/QueueBottleForReturn";
import RemoveBottleFromReturnsQueue from "./components/RemoveBottleFromReturnsQueue";

const GasBottleRental = (props: {
    gasBottleID: number,
    isQueued: boolean,
    current_gas_weight: number,
    tare_weight: number,
    setGasBottleData: Dispatch<SetStateAction<GasBottleResponseData | undefined>>,
    isConsumable?: boolean,
}) => {
    const [showReturn, setShowReturn] = useState(false);
    const [showQueue, setShowQueue] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    
    return (
        <>
            <SideBarModule title="Rental">
                {!props.isQueued ? 
                    <>
                        <SideBarButton
                            text="Return to Supplier"
                            iconFont="assignment_return"
                            color="purple"
                            clickEvent={() => setShowReturn(true)}
                        />
                        <SideBarButton
                            text="Queue for Return"
                            iconFont="playlist_add"
                            color="dark-purple"
                            clickEvent={() => setShowQueue(true)}
                        />
                    </> : 
                    <SideBarButton
                        text="Remove from Returns Queue"
                        iconFont="playlist_remove"
                        color="red"
                        clickEvent={() => setShowRemove(true)}
                    />

                }
            </SideBarModule>

            <ReturnGasBottleToSupplier
                gasBottleID={props.gasBottleID}
                current_gas_weight={props.current_gas_weight}
                tare_weight={props.tare_weight}
                setGasBottleData={props.setGasBottleData}
                show={showReturn}
                hideFunc={() => setShowReturn(false)}
                isConsumable={props.isConsumable}
            />

            <QueueBottleForReturn
                gasBottleID={props.gasBottleID}
                current_gas_weight={props.current_gas_weight}
                tare_weight={props.tare_weight}
                setGasBottleData={props.setGasBottleData}
                show={showQueue}
                hideFunc={() => setShowQueue(false)}
                isConsumable={props.isConsumable}
            />

            <RemoveBottleFromReturnsQueue
                gasBottleID={props.gasBottleID}
                current_gas_weight={props.current_gas_weight}
                tare_weight={props.tare_weight}
                setGasBottleData={props.setGasBottleData}
                show={showRemove}
                hideFunc={() => setShowRemove(false)}            
            />
        </>
    )
}

export default GasBottleRental