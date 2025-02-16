import { ChangeEvent } from "react";
import TextInput from "../../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateEquipmentAttributes } from "../../../../../types/equipment.types";

const EquipmentGasDetailsForm = (props: {
    equipmentDetails: CreateEquipmentAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean,
}) => {
    return (
        <section>
            {props.isEdit && <h2>Gas Details</h2>}
            <InfoGrid>                    
                <GridItem title='Gas Council Number' span={3}>
                    <TextInput
                        name="gas_council_number"
                        value={props.equipmentDetails.gas_council_number}
                        label="Gas council number"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Pump' span={3} secondaryTitle="(optional)">
                    <TextInput
                        name="pump"
                        value={props.equipmentDetails.pump}
                        label="Pump"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default EquipmentGasDetailsForm