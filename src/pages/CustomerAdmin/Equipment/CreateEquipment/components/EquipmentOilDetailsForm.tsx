import { ChangeEvent } from "react";
import TextInput from "../../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateEquipmentAttributes } from "../../../../../types/equipment.types";

const EquipmentOilDetailsForm = (props: {
    equipmentDetails: CreateEquipmentAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Fuel Details</h2>}
            <InfoGrid>                    
                <GridItem title='Pump' span={3}>
                    <TextInput
                        name="pump"
                        value={props.equipmentDetails.pump}
                        label="Pump"
                        updateFunc={props.updateParams}
                        required
                        hasSubmitted={props.showErrors}
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Nozzle' span={3}>
                    <TextInput
                        name="nozzle"
                        value={props.equipmentDetails.nozzle}
                        label="Nozzle"
                        updateFunc={props.updateParams}
                        required
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default EquipmentOilDetailsForm