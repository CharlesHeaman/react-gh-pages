import { ChangeEvent, Dispatch, SetStateAction } from "react";
import IntegerInput from "../../../../components/form/IntegerInput/IntegerInput";
import TextInput from "../../../../components/form/TextInput/TextInput";
import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateRefrigerantAttributes } from "../../../../types/refrigerant.types";
import FilterSelect, { FilterSelection } from "../../../../components/ui/FilterSelect/FilterSelect";

const RefrigerantDetailsForm = (props: {
    refrigerantDetails: CreateRefrigerantAttributes,
    selectOptions: Array<FilterSelection>,
    setSelectOptions: Dispatch<SetStateAction<Array<FilterSelection>>>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Refrigerant, Gas/Air Details</h2>}
            <InfoGrid>                
                <GridItem title='Name' span={3}>
                    <TextInput
                        name="name"
                        label="Name"
                        value={props.refrigerantDetails.name}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        autoFocus
                        required
                    />
                </GridItem>
                <GridItem title='Common Name' span={3}>
                    <TextInput
                        name="common_name"
                        label="Common name"
                        value={props.refrigerantDetails.common_name}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Type' span={3}>
                    <FilterSelect
                        selections={props.selectOptions}
                        selectionSetter={props.setSelectOptions}
                    />
                </GridItem>
                <GridItem title='Global Warming Potential' span={3}>
                    <IntegerInput
                        name="global_warming_potential"
                        label="GWP"
                        value={props.refrigerantDetails.global_warming_potential}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        maxWidth={60}
                        required
                    />
                </GridItem>
                <GridItem title='Notes' secondaryTitle="(optional)">
                    <TextareaInput
                        name="notes"
                        value={props.refrigerantDetails.notes}
                        label="Notes"
                        updateFunc={props.updateParams}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default RefrigerantDetailsForm