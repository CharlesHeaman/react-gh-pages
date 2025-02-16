import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import DateInput from "../../../../../../../../components/form/DateInput/DateInput"
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton"
import TextInput from "../../../../../../../../components/form/TextInput/TextInput"
import WeightInput from "../../../../../../../../components/form/WeightInput/WeightInput"
import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { GasBottleResponseData } from "../../../../../../../../types/gasBottle.types"
import formatWeight from "../../../../../../../../utils/formatWeight"
import putAPI from "../../../../../../../../utils/putAPI"
import updateStateParams from "../../../../../../../../utils/updateStateParams/updateStateParams"
import ActionButton from "../../../../../../../../components/form/ActionButton/ActionButton"
import SetTareWeightButton from "./SetTareWeightButton"

const ReturnGasBottleToSupplier = (props: {
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
    const [returnParams, setReturnParams] = useState({
        current_bottle_weight: (props.current_gas_weight + props.tare_weight).toString(),
        supplier_returned_date: new Date(),
    });
    
    const assignToEngineer = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`gas_bottles/${props.gasBottleID}/return`, {}, {
            current_gas_weight: formatWeight(parseFloat(returnParams.current_bottle_weight) - props.tare_weight),
            supplier_returned_date: returnParams.supplier_returned_date,
        }, (response: any) => {
            const gasBottleData: GasBottleResponseData = response.data;
            props.setGasBottleData(gasBottleData);
            props.hideFunc();
        }, setIsUpdating)
    }

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setReturnParams)
    }

    const updateDateParams = (date: Date) => {
        setReturnParams((prevState: any) => {
            return {
                ...prevState, 
                supplier_returned_date: date
            }
        })
    }

    const formComplete = (
        returnParams.current_bottle_weight.length > 0 &&
        parseFloat(returnParams.current_bottle_weight) >= props.tare_weight
    );
    
    return (
        <WindowOverlay 
            title={"Return to Supplier"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc} 
            footer={<SubmitButton 
                text={"Return to Supplier"} 
                iconFont="assignment_return"
                disabled={hasSubmitted && !formComplete} 
                color='purple'
                clickFunc={assignToEngineer}            
                submitting={isUpdating}
                submittingText="Returning..."
            />}
        >
            <p>{`Record the ${!props.isConsumable ? 'current bottle weight, ' : ''}return note number and date of return to return this bottle to supplier.`}</p>
            <InfoGrid>
                <GridItem title='Return Date'>
                    <DateInput
                        name="supplier_returned_date"
                        value={returnParams.supplier_returned_date}
                        updateFunc={updateDateParams} 
                        label="Return date"
                        hasSubmitted
                        required
                    />
                </GridItem>
                {!props.isConsumable ? <GridItem title='Current Bottle Weight'>
                    <WeightInput 
                        name={"current_bottle_weight"} 
                        value={returnParams.current_bottle_weight} 
                        label={"Current bottle weight"} 
                        updateFunc={updateParams} 
                        min={props.tare_weight}
                        tooLightText="Bottle weight cannot be less than tare weight"
                        secondaryButton={<SetTareWeightButton clickFunc={() => setReturnParams((prevState: any) => {
                            return {
                                ...prevState, 
                                current_bottle_weight: props.tare_weight.toString()
                            }
                        })}/>}
                        hasSubmitted
                        required
                    />
                </GridItem> : null}
            </InfoGrid>
        </WindowOverlay>
    )
}

export default ReturnGasBottleToSupplier