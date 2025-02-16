import { ChangeEvent } from "react";
import CheckboxInput from "../../../components/form/CheckboxInput/CheckboxInput";
import TextInput from "../../../components/form/TextInput/TextInput";
import VoltsAmpsInput from "../../../components/form/VoltsAmpsInput/VoltsAmpsInput";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateAssetAttributes } from "../../../types/asset.types";
import DateInput from "../../../components/form/DateInput/DateInput";

const PlantEquipmentPATCalibrationMaintenanceForm = (props: {
    plantEquipmentDetails: CreateAssetAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateDateParams: (date: Date, name: string) => void, 
    updateCheckboxParams: (event: ChangeEvent<HTMLInputElement>) => void,
    showErrors: boolean,
}) => {
    return (
        <section>
            <InfoGrid>                
                <GridItem title='PA Test Required'>
                    <CheckboxInput
                        name="requires_pa_test"
                        checked={props.plantEquipmentDetails.requires_pa_test}
                        updateFunc={props.updateCheckboxParams}
                        autoFocus
                    />
                </GridItem>
                {props.plantEquipmentDetails.requires_pa_test && 
                    <>
                        <GridItem title='Last PA Test' secondaryTitle="(optional)" span={3}>
                            <DateInput
                                name="last_pa_test"
                                label="Last PA test"
                                value={props.plantEquipmentDetails.last_pa_test}
                                updateFunc={props.updateDateParams}
                                hasSubmitted={props.showErrors}
                            />
                        </GridItem>
                        <GridItem title='Next PA Test' secondaryTitle="(optional)" span={3}>
                            <DateInput
                                name="next_pa_test"
                                label="Next PA test"
                                value={props.plantEquipmentDetails.next_pa_test}
                                updateFunc={props.updateDateParams}
                                hasSubmitted={props.showErrors}
                            />
                        </GridItem>
                        <GridItem title='Test Volts' span={3}>
                            <VoltsAmpsInput 
                                name={"pa_test_volts"} 
                                value={props.plantEquipmentDetails.pa_test_volts} 
                                label={"Test volts"} 
                                updateFunc={props.updateParams} 
                                hasSubmitted={props.showErrors}
                                required                    
                            />
                        </GridItem>
                        <GridItem title='Test Amps' span={3}>
                            <VoltsAmpsInput 
                                name={"pa_test_amps"} 
                                value={props.plantEquipmentDetails.pa_test_amps} 
                                label={"Test amps"} 
                                updateFunc={props.updateParams} 
                                hasSubmitted={props.showErrors}
                                isAmps
                                required                    
                            />
                        </GridItem>
                    </> 
                }
            </InfoGrid>
            <hr/>
            <InfoGrid>
                <GridItem title='Calibration Required'>
                    <CheckboxInput
                        name="requires_calibration"
                        checked={props.plantEquipmentDetails.requires_calibration}
                        updateFunc={props.updateCheckboxParams}
                    />
                </GridItem>
                {props.plantEquipmentDetails.requires_calibration && 
                    <>
                        <GridItem title='Last Calibration' secondaryTitle="(optional)" span={3}>
                            <DateInput
                                name="last_calibration_test"
                                label="Last calibration"
                                value={props.plantEquipmentDetails.last_calibration_test}
                                updateFunc={props.updateDateParams}
                                hasSubmitted={props.showErrors}
                            />
                        </GridItem>
                        <GridItem title='Next Calibration' secondaryTitle="(optional)" span={3}>
                            <DateInput
                                name="next_calibration_test"
                                label="Next calibration"
                                value={props.plantEquipmentDetails.next_calibration_test}
                                updateFunc={props.updateDateParams}
                                hasSubmitted={props.showErrors}
                            />
                        </GridItem>
                        <GridItem title='Acceptable Error/Tolerance' span={3}>
                            <TextInput
                                name="acceptable_tolerance"
                                label="Acceptable error/tolerance"
                                value={props.plantEquipmentDetails.acceptable_tolerance}
                                updateFunc={props.updateParams}
                                hasSubmitted={props.showErrors}
                                required
                            />
                        </GridItem>
                        <GridItem span={3}></GridItem>
                        <GridItem title='Calibrated Externally' span={3}>
                            <CheckboxInput
                                name="calibrated_externally"
                                checked={props.plantEquipmentDetails.calibrated_externally}
                                updateFunc={props.updateCheckboxParams}
                            />
                        </GridItem>
                        {props.plantEquipmentDetails.calibrated_externally && 
                            <GridItem title='External Calibrator/Maintainer' span={3}>
                                <TextInput
                                    name="external_maintainer"
                                    label="External maintainer"
                                    value={props.plantEquipmentDetails.external_maintainer}
                                    updateFunc={props.updateParams}
                                    hasSubmitted={props.showErrors}
                                    required
                                />
                            </GridItem>
                        }
                    </>
                }
            </InfoGrid>
            <hr/>
            <InfoGrid>
                <GridItem title='Inspection Required'>
                    <CheckboxInput
                        name="requires_inspection"
                        checked={props.plantEquipmentDetails.requires_inspection}
                        updateFunc={props.updateCheckboxParams}
                    />
                </GridItem>
                {props.plantEquipmentDetails.requires_inspection &&
                    <>
                        <GridItem title='Last Inspection' secondaryTitle="(optional)" span={3}>
                            <DateInput
                                name="last_inspection"
                                label="Last inspection"
                                value={props.plantEquipmentDetails.last_inspection}
                                updateFunc={props.updateDateParams}
                                hasSubmitted={props.showErrors}
                            />
                        </GridItem>
                        <GridItem title='Next Inspection' secondaryTitle="(optional)" span={3}>
                            <DateInput
                                name="next_inspection"
                                label="Next inspection"
                                value={props.plantEquipmentDetails.next_inspection}
                                updateFunc={props.updateDateParams}
                                hasSubmitted={props.showErrors}
                            />
                        </GridItem>
                    </>
                }
            </InfoGrid>
            <hr/>
            <InfoGrid>
                <GridItem title='Maintenance Required'>
                    <CheckboxInput
                        name="requires_maintenance"
                        checked={props.plantEquipmentDetails.requires_maintenance}
                        updateFunc={props.updateCheckboxParams}
                    />
                </GridItem>
                {props.plantEquipmentDetails.requires_maintenance &&
                    <>
                        <GridItem title='Last Maintenance' secondaryTitle="(optional)" span={3}>
                            <DateInput
                                name="last_maintenance"
                                label="Last maintenance"
                                value={props.plantEquipmentDetails.last_maintenance}
                                updateFunc={props.updateDateParams}
                                hasSubmitted={props.showErrors}
                            />
                        </GridItem>
                        <GridItem title='Next Maintenance' secondaryTitle="(optional)" span={3}>
                            <DateInput
                                name="next_maintenance"
                                label="Next maintenance"
                                value={props.plantEquipmentDetails.next_maintenance}
                                updateFunc={props.updateDateParams}
                                hasSubmitted={props.showErrors}
                            />
                        </GridItem>
                        <GridItem title='Maintained Externally' span={3}>
                            <CheckboxInput
                                name="maintained_externally"
                                checked={props.plantEquipmentDetails.maintained_externally}
                                updateFunc={props.updateCheckboxParams}
                            />
                        </GridItem>
                        {props.plantEquipmentDetails.maintained_externally && 
                            <GridItem title='External Calibrator/Maintainer' span={3}>
                                <TextInput
                                    name="external_maintainer"
                                    label="External maintainer"
                                    value={props.plantEquipmentDetails.external_maintainer}
                                    updateFunc={props.updateParams}
                                    hasSubmitted={props.showErrors}
                                    required
                                />
                            </GridItem>
                        }
                    </>
                }
            </InfoGrid>
        </section>
    )
}

export default PlantEquipmentPATCalibrationMaintenanceForm