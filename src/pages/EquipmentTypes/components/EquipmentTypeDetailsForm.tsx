import { ChangeEvent, Dispatch, SetStateAction } from "react"
import CheckboxInput from "../../../components/form/CheckboxInput/CheckboxInput"
import MinutesInput from "../../../components/form/MinutesInput/MinutesInput"
import TextInput from "../../../components/form/TextInput/TextInput"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CreateEquipmentTypeAttributes } from "../../../types/equipmentType.types"
import IntegerInput from "../../../components/form/IntegerInput/IntegerInput"
import EnergySourceSelect from "./EnergySourceSelect"
import DepartmentSelect from "../../../components/form/DepartmentSelect/DepartmentSelect"
import { DepartmentResponseData } from "../../../types/department.types"
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton"
import IconButton from "../../../components/ui/Buttons/IconButton/IconButton"

const EquipmentTypeDetailsForm = (props: {
    equipmentTypeDetails: CreateEquipmentTypeAttributes,
    selectedEnergySource: number | null,
    setSelectedEnergySource: Dispatch<SetStateAction<number | null>>,
    selectedDepartment: Array<DepartmentResponseData>,
    setSelectedDepartment: Dispatch<SetStateAction<Array<DepartmentResponseData>>>
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateCheckboxParams: (event: ChangeEvent<HTMLInputElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    const updateDepartments = (updatedDepartment: DepartmentResponseData, updateIndex: number) => {
        if (props.selectedDepartment.length > updateIndex) {
            return props.setSelectedDepartment(prevState => 
                prevState.map((oldDepartment: DepartmentResponseData, departmentIndex) => {
                    if (updateIndex === departmentIndex) {
                        return updatedDepartment;
                    }
                    return oldDepartment
                })
            )
        }
        props.setSelectedDepartment([...props.selectedDepartment, updatedDepartment]);
    }

    const removeDepartment = (removeIndex: number) => {
        props.setSelectedDepartment(prevState => prevState.filter((_, index) => index !== removeIndex));
    }

    return (
        <>
            <section>
                {props.isEdit && <h2>Equipment Type Details</h2>}
                <InfoGrid columnCount={9}>
                    <GridItem title='Name'>
                        <TextInput
                            name="name"
                            label="Name"
                            value={props.equipmentTypeDetails.name}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            required
                            autoFocus
                        />
                    </GridItem>
                    <GridItem title='Department' span={3}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--small-gap)' }}>  
                            {[...Array(props.selectedDepartment.length + 1)].map((_, index) => <div className="flex">
                                <div>
                                    <DepartmentSelect
                                        selectedDepartment={props.selectedDepartment[index]}
                                        updateFunc={(department) => updateDepartments(department, index)}
                                        setSelectedDepartment={() => null}
                                        hasSubmitted={props.showErrors}
                                        required={index === 0}
                                    />
                                </div>
                                {index < props.selectedDepartment.length ?
                                    <SubmitButton
                                        text=""
                                        iconFont="close"
                                        color="red"
                                        clickFunc={() => removeDepartment(index)}
                                        smallPadding
                                    />
                                : null}
                            </div>
                            )}                      
                        </div>
                    </GridItem>
                    <GridItem title='Certification Body' span={3}>
                        <EnergySourceSelect 
                            selectedEnergySource={props.selectedEnergySource} 
                            setSelectedEnergySource={props.setSelectedEnergySource} 
                            hasSubmitted={props.showErrors}
                        />
                    </GridItem>
                    <GridItem title='Service Time' span={3}>
                        <MinutesInput
                            name="service_duration"
                            label="Service time"
                            value={props.equipmentTypeDetails.service_duration}
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            required
                        />
                    </GridItem>
                </InfoGrid>
                <hr/>
                <InfoGrid columnCount={9}>
                    <GridItem title='Master' span={3}>
                        <CheckboxInput
                            name="is_master"
                            checked={props.equipmentTypeDetails.is_master}
                            updateFunc={props.updateCheckboxParams}
                        />
                    </GridItem>
                    {props.equipmentTypeDetails.is_master ? <>
                        <GridItem title='Variable Slave Quantity' span={3}>
                            <CheckboxInput
                                name="is_variable_slave_quantity"
                                checked={props.equipmentTypeDetails.is_variable_slave_quantity}
                                updateFunc={props.updateCheckboxParams}
                                disabled={!props.equipmentTypeDetails.is_master}
                            />
                        </GridItem>
                        {!props.equipmentTypeDetails.is_variable_slave_quantity ? <GridItem title='Slave Quantity' span={3}>
                            <IntegerInput
                                name="slave_quantity"
                                label="Slave quantity"
                                suffix="slaves"
                                maxWidth={100}
                                value={props.equipmentTypeDetails.slave_quantity}
                                updateFunc={props.updateParams}
                                hasSubmitted={props.showErrors}
                                disabled={!props.equipmentTypeDetails.is_master || props.equipmentTypeDetails.is_variable_slave_quantity}
                                required
                            />
                        </GridItem> : null}
                    </> : null}
                </InfoGrid>
                <hr/>
                <InfoGrid columnCount={9}>
                    <GridItem title='Slave' span={3}>
                        <CheckboxInput
                            name="is_slave"
                            checked={props.equipmentTypeDetails.is_slave}
                            updateFunc={props.updateCheckboxParams}
                        />
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default EquipmentTypeDetailsForm 