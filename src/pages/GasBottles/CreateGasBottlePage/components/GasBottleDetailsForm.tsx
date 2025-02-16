import { ChangeEvent, Dispatch, SetStateAction } from "react";
import RefrigerantSelect from "../../../../components/form/RefrigerantSelect/RefrigerantSelect";
import TextInput from "../../../../components/form/TextInput/TextInput";
import WeightInput from "../../../../components/form/WeightInput/WeightInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateGasBottleAttributes } from "../../../../types/gasBottle.types";
import { RefrigerantResponseData } from "../../../../types/refrigerant.types";
import formatWeight from "../../../../utils/formatWeight";
import FilterSelect, { FilterSelection } from "../../../../components/ui/FilterSelect/FilterSelect";

const GasBottleDetailsForm = (props: {
    gasBottleDetails: CreateGasBottleAttributes,
    selectOptions: Array<FilterSelection>,
    setSelectOptions: Dispatch<SetStateAction<Array<FilterSelection>>>,
    selectedRefrigerant: RefrigerantResponseData | undefined,
    setSelectedRefrigerant: Dispatch<SetStateAction<RefrigerantResponseData | undefined>>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isConsumable?: boolean,
}) => {
    return (
        <section>
            <InfoGrid columnCount={props.isConsumable ? 4 : 6}>                
                <GridItem title='Number' span={2}>
                    <TextInput
                        name="number"
                        label="Number"
                        value={props.gasBottleDetails.number}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        maxWidth={100}
                        autoFocus
                        required
                    />
                </GridItem>
                <GridItem title={props.isConsumable ? 'Gas/Air' : 'Refrigerant'} span={2}>
                    <RefrigerantSelect
                        selectedRefrigerant={props.selectedRefrigerant}
                        setSelectedRefrigerant={props.setSelectedRefrigerant}
                        hasSubmitted={props.showErrors}
                        isConsumable={props.isConsumable}
                        required
                    />
                </GridItem>
                {!props.isConsumable ? <>
                    <GridItem title='Type' span={2}>
                        <FilterSelect
                            selections={props.selectOptions}
                            selectionSetter={props.setSelectOptions}
                        />
                    </GridItem>
                    <GridItem title='Bottle Weight' span={2}>
                        <WeightInput
                            name="bottle_weight"
                            value={props.gasBottleDetails.bottle_weight}
                            label="Bottle weight"
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                        />
                    </GridItem>
                    <GridItem title='Tare Weight' span={2}>
                        <WeightInput
                            name="tare_weight"
                            value={props.gasBottleDetails.tare_weight}
                            label="Tare weight"
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            max={parseFloat(props.gasBottleDetails.bottle_weight)}
                            tooHeavyText="Tare weight cannot be greater than bottle weight"
                        />
                    </GridItem>
                    <GridItem title='Refrigerant Weight' span={2}>
                        <p>{formatWeight(parseFloat(props.gasBottleDetails.bottle_weight) - parseFloat(props.gasBottleDetails.tare_weight))}kg</p>
                    </GridItem>
                </> : null}
            </InfoGrid>
        </section>
    )
}

export default GasBottleDetailsForm