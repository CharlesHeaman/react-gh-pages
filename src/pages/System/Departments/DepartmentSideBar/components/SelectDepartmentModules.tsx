import { Dispatch, SetStateAction, useState } from "react"
import CheckboxInput from "../../../../../components/form/CheckboxInput/CheckboxInput"
import SubmitButton from "../../../../../components/form/SubmitButton/SubmitButton"
import WindowOverlay from "../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import Label from "../../../../../components/ui/General/Label/Label"
import { DepartmentResponseData } from "../../../../../types/department.types"
import putAPI from "../../../../../utils/putAPI"

const SelectDepartmentModules = (props: {
    department: DepartmentResponseData,
    setDepartmentData: Dispatch<SetStateAction<DepartmentResponseData | undefined>>
    show: boolean,
    hideFunc: () => void
}) => {  
    // Form States
    const [isUpdating, setIsUpdating] = useState(false);
    const [usesEquipmentModule, setUsesEquipmentModule] = useState(props.department.data.uses_equipment_module);
    const [usesRefrigerantModule, setUsesRefrigerantModule] = useState(props.department.data.uses_refrigerant_module);
    const [usesFuelModule, setUsesFuelModule] = useState(props.department.data.uses_fuel_module);
    const [usesJobModule, setUsesJobModule] = useState(props.department.data.uses_job_module);

    const selectModules = () => {
        putAPI(`departments/${props.department.id}/select_modules`, {}, {
            uses_equipment_module: usesEquipmentModule,
            uses_refrigerant_module: usesRefrigerantModule,
            uses_fuel_module: usesFuelModule,
            uses_job_module: usesJobModule,
        }, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            props.setDepartmentData(departmentData);
            props.hideFunc();
        }, setIsUpdating)
    }

    return (
        <WindowOverlay 
            title="Department Modules"
            maxWidth={450}
            show={props.show}
            hideFunc={props.hideFunc}
            footer={
                <SubmitButton   
                    text="Select Modules"
                    clickFunc={selectModules}
                    iconFont="checklist_rtl"
                    submitting={isUpdating}
                    submittingText="Selecting..."
                />
            }
        >
            <table className="selectTable">
                <thead>
                    <tr>
                        <th>Module</th>
                        <th>Enabled</th>
                    </tr>
                </thead>
                <tbody>
                    <tr onClick={() => setUsesEquipmentModule(!usesEquipmentModule)}>
                        <td>
                            <div className="flex" style={{ gap: 'var(--large-gap)'}}>
                                <Label iconFont='local_laundry_service' color='no-color' bigIcon/>
                                <h2>Equipment Module</h2>
                            </div>
                        </td>
                        <td>
                            <CheckboxInput
                                name="uses_equipment_module"
                                checked={usesEquipmentModule}
                                updateFunc={() => null}
                            />
                        </td>
                    </tr>
                    <tr onClick={() => setUsesRefrigerantModule(!usesRefrigerantModule)}>
                        <td>
                            <div className="flex" style={{ gap: 'var(--large-gap)'}}>
                                <Label iconFont='propane_tank' color='no-color' bigIcon/>
                                <h2>Refrigerant Module</h2>
                            </div>
                        </td>
                        <td>
                            <CheckboxInput
                                name="uses_refrigerant_module"
                                checked={usesRefrigerantModule}
                                updateFunc={(event) => setUsesRefrigerantModule(event.target.checked)}
                            />
                        </td>
                    </tr>
                    <tr onClick={() => setUsesFuelModule(!usesFuelModule)}>
                        <td>
                            <div className="flex" style={{ gap: 'var(--large-gap)'}}>
                                <Label iconFont='gas_meter' color='no-color' bigIcon/>
                                <h2>Fuel Module</h2>
                            </div>
                        </td>
                        <td>
                            <CheckboxInput
                                name="uses_fuel_module"
                                checked={usesFuelModule}
                                updateFunc={(event) => setUsesFuelModule(event.target.checked)}
                            />
                        </td>
                    </tr>
                    <tr onClick={() => setUsesJobModule(!usesJobModule)}>
                        <td>
                            <div className="flex" style={{ gap: 'var(--large-gap)'}}>
                                <Label iconFont='dataset_linked' color='no-color' bigIcon/>
                                <h2>Job Module</h2>
                            </div>
                        </td>
                        <td>
                            <CheckboxInput
                                name="uses_job_module"
                                checked={usesJobModule}
                                updateFunc={(event) => setUsesJobModule(event.target.checked)}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </WindowOverlay>
    )
}

export default SelectDepartmentModules