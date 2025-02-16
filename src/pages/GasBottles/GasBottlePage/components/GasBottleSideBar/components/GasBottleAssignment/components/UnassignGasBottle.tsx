import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton"
import WeightInput from "../../../../../../../../components/form/WeightInput/WeightInput"
import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { GasBottleResponseData } from "../../../../../../../../types/gasBottle.types"
import formatWeight from "../../../../../../../../utils/formatWeight"
import putAPI from "../../../../../../../../utils/putAPI"
import SetTareWeightButton from "../../GasBottleRental/components/SetTareWeightButton"

const UnassignGasBottle = (props: {
    gasBottleID: number,
    show: boolean,
    hideFunc: () => void,
    current_gas_weight: number,
    tare_weight: number,
    setGasBottleData: Dispatch<SetStateAction<GasBottleResponseData | undefined>>,
    isConsumable?: boolean,
}) => {
    
    // Form States
    const [isUpdating, setIsUpdating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [bottleWeight, setBottleWeight] = useState((props.current_gas_weight + props.tare_weight).toString());

    useEffect(() => {
        setBottleWeight((props.current_gas_weight + props.tare_weight).toString());
    }, [props.current_gas_weight, props.tare_weight])

    
    const assignToEngineer = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`gas_bottles/${props.gasBottleID}/assign`, {}, {
            assigned_to_id: 0,
            current_gas_weight: formatWeight(parseFloat(bottleWeight) - props.tare_weight)
        }, (response: any) => {
            const gasBottleData: GasBottleResponseData = response.data;
            props.setGasBottleData(gasBottleData);
            props.hideFunc();
        }, setIsUpdating)
    }

    const formComplete = (
        bottleWeight.length > 0 &&
        parseFloat(bottleWeight) >= props.tare_weight
    )
    
    return (
        <WindowOverlay 
            title={"Unassign Bottle"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc} 
            footer={<SubmitButton 
                text={"Unassign Bottle"} 
                iconFont="person_off"
                color='dark-blue'
                disabled={hasSubmitted && !formComplete}
                submitting={isUpdating}
                submittingText="Unassigning..."
                clickFunc={assignToEngineer}            
            />}
        >
            {!props.isConsumable ? 
                <p>Record the current bottle weight to unassign this bottle.</p> :
                <p>Unassign this bottle?</p>
            }
            {!props.isConsumable ?
                <InfoGrid>
                    <GridItem title='Current Bottle Weight'>
                        <WeightInput 
                            name={"current_bottle_weight"} 
                            value={bottleWeight} 
                            label={"Current bottle weight"} 
                            updateFunc={(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
                                setBottleWeight(event.target.value)
                            }} 
                            min={props.tare_weight}
                            tooLightText="Bottle weight cannot be less than tare weight"
                            secondaryButton={<SetTareWeightButton clickFunc={() => setBottleWeight(props.tare_weight.toString())}/>}
                            hasSubmitted
                            required
                        />
                    </GridItem>
                </InfoGrid> : null
            }
            
        </WindowOverlay>
    )
}

export default UnassignGasBottle