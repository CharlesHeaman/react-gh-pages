import BooleanLabel from "../../../components/ui/BooleanLabel/BooleanLabel"
import DepartmentLabel from "../../../components/ui/Department/DepartmentLabel"
import Label from "../../../components/ui/General/Label/Label"
import { DepartmentResponseData } from "../../../types/department.types"
import { EquipmentTypeResponseData } from "../../../types/equipmentType.types"
import findDepartment from "../../../utils/findDepartment"
import formatMinutes from "../../../utils/formatMinutes"
import EnergySourceLabel from "../../Equipment/components/EnergySourceLabel"
import styles from './..//../Products/components/ActionIconButton.module.css'
import EquipmentTypeLink from "./EquipmentTypeLink"
import SlaveQuantityLabel from "./SlaveQuantityLabel"

const EquipmentTypeRow = (props: {
    equipmentType: EquipmentTypeResponseData,
    departments: Array<DepartmentResponseData>
    hideDepartment?: boolean,
    hideEnergySource?: boolean,
    showAdd?: boolean,
    addFunc?: (product: EquipmentTypeResponseData) => void
}) => {
    console.log(props.departments)
    const department = props.equipmentType.data.department_ids.length === 1 ? findDepartment(props.departments, props.equipmentType.data.department_ids[0]) : null;
    return (
        <tr>
            {props.showAdd && <td>
                <summary
                    className={`${styles['action-icon-button']} light-green no-select`}
                    onClick={() => props.addFunc && props.addFunc(props.equipmentType)}
                >
                    <span className="material-icons">add</span>
                </summary>
            </td>}
            <td className="text-left">
                <div className="flex">
                    <EquipmentTypeLink 
                        equipmentTypeID={props.equipmentType.id} 
                        name={props.equipmentType.data.name}
                        inactive={!props.equipmentType.data.is_active}
                    />
                </div>
            </td>
            {!props.hideDepartment ? <td>{props.equipmentType.data.department_ids.length > 1 ?
                <Label color="grey" text="Multiple" iconFont="share"/> :
                department ? <DepartmentLabel department={department}/> : null
            }</td> : null}
            {!props.hideEnergySource ? <td><EnergySourceLabel energySource={props.equipmentType.data.energy_source}/></td> : null}
            <td className="text-right">{formatMinutes(props.equipmentType.data.service_duration)} min</td>
            <td><BooleanLabel true={props.equipmentType.data.is_master}/></td>
            <td><SlaveQuantityLabel slaveQuantity={props.equipmentType.data.slave_quantity}/></td>
            <td><BooleanLabel true={props.equipmentType.data.is_slave}/></td>
        </tr>
    )
}

export default EquipmentTypeRow