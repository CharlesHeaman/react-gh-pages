import { Dispatch, SetStateAction, useState } from "react";
import DeactivateModule from "../../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { GasBottleResponseData } from "../../../../../../../types/gasBottle.types";
import putAPI from "../../../../../../../utils/putAPI";

const GasBottleDeactivate = (props: {
    gasBottleID: number,
    reactivate: boolean,
    setGasBottleData: Dispatch<SetStateAction<GasBottleResponseData | undefined>>,
    isConsumable?: boolean,
}) => {

    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateGasBottle = () => {
        putAPI(`gas_bottles/${props.gasBottleID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const gasBottleData: GasBottleResponseData = response.data;
            props.setGasBottleData(gasBottleData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName={`${props.isConsumable ? 'Gas/Air' : 'Refrigerant'} Bottle`}
                reactivate={props.reactivate}
                showFunc={() => setShowDeactivate(true)}
            />
            
            <DeactivateOverlay 
                resourceName={`${props.isConsumable ? 'Gas/Air' : 'Refrigerant'} Bottle`}
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateGasBottle}
            />
        </>
    )
}

export default GasBottleDeactivate