import { ChangeEvent } from "react"
import CheckboxInput from "../../../../../../components/form/CheckboxInput/CheckboxInput"
import IntegerInput from "../../../../../../components/form/IntegerInput/IntegerInput"
import TextareaInput from "../../../../../../components/form/TextareaInput/TextareaInput"
import TextInput from "../../../../../../components/form/TextInput/TextInput"
import GridItem from "../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CreatePlantEquipmentTypeAttributes } from "../../../../../../types/plantEquipmentTypes.types"

const PlantEquipmentTypeDetailsForm = (props: {
    plantEquipmentTypeDetails: CreatePlantEquipmentTypeAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateCheckboxParams: (event: ChangeEvent<HTMLInputElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Plant/Tools Type Details</h2>}
            <InfoGrid>
                <GridItem title='Name'>
                    <TextInput
                        name="name"
                        label="Name"
                        value={props.plantEquipmentTypeDetails.name}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Description' secondaryTitle="(optional)">
                    <TextareaInput
                        name="description"
                        value={props.plantEquipmentTypeDetails.description}
                        label="Description"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
            <hr/>
            <InfoGrid>
                <GridItem title='PA Test Required' span={3}>
                    <CheckboxInput 
                        name="is_pa_test_required"
                        checked={props.plantEquipmentTypeDetails.is_pa_test_required}
                        updateFunc={props.updateCheckboxParams}
                    />
                </GridItem>
                {props.plantEquipmentTypeDetails.is_pa_test_required ? 
                    <GridItem title='PA Test Frequency' span={3}>
                        <IntegerInput
                            name="pa_test_frequency"
                            label="PA test frequency"
                            value={props.plantEquipmentTypeDetails.pa_test_frequency}
                            updateFunc={props.updateParams}
                            suffix="months"
                            hasSubmitted={props.showErrors}
                            maxWidth={100}
                            required
                        />
                    </GridItem> :
                    <GridItem span={3}>

                    </GridItem>
                }
                <GridItem title='Calibration Test Required' span={3}>
                    <CheckboxInput 
                        name="is_calibration_test_required"
                        checked={props.plantEquipmentTypeDetails.is_calibration_test_required}
                        updateFunc={props.updateCheckboxParams}
                    />
                </GridItem>
                {props.plantEquipmentTypeDetails.is_calibration_test_required ? 
                    <GridItem title='Calibration Test Frequency' span={3}>
                        <IntegerInput
                            name="calibration_test_frequency"
                            label="Calibration test frequency"
                            value={props.plantEquipmentTypeDetails.calibration_test_frequency}
                            updateFunc={props.updateParams}
                            suffix="months"
                            hasSubmitted={props.showErrors}
                            maxWidth={100}
                            required
                        />
                    </GridItem> :
                    <GridItem span={3}>

                    </GridItem>
                }
                <GridItem title='Inspection Required' span={3}>
                    <CheckboxInput 
                        name="is_inspection_required"
                        checked={props.plantEquipmentTypeDetails.is_inspection_required}
                        updateFunc={props.updateCheckboxParams}
                    />
                </GridItem>
                {props.plantEquipmentTypeDetails.is_inspection_required ? 
                    <GridItem title='Inspection Frequency' span={3}>
                        <IntegerInput
                            name="inspection_frequency"
                            label="Inspection frequency"
                            value={props.plantEquipmentTypeDetails.inspection_frequency}
                            updateFunc={props.updateParams}
                            suffix="months"
                            hasSubmitted={props.showErrors}
                            maxWidth={100}
                            required
                        />
                    </GridItem> :
                    <GridItem span={3}>

                    </GridItem>
                }
                <GridItem title='Maintenance Required' span={3}>
                    <CheckboxInput 
                        name="is_maintenance_required"
                        checked={props.plantEquipmentTypeDetails.is_maintenance_required}
                        updateFunc={props.updateCheckboxParams}
                    />
                </GridItem>
                {props.plantEquipmentTypeDetails.is_maintenance_required ? 
                    <GridItem title='Maintenance Frequency' span={3}>
                        <IntegerInput
                            name="maintenance_frequency"
                            label="Maintenance frequency"
                            value={props.plantEquipmentTypeDetails.maintenance_frequency}
                            updateFunc={props.updateParams}
                            suffix="months"
                            hasSubmitted={props.showErrors}
                            maxWidth={100}
                            required
                        />
                    </GridItem> :
                    <GridItem span={3}>

                    </GridItem>
                }
            </InfoGrid>
        </section>
    )
}

export default PlantEquipmentTypeDetailsForm 