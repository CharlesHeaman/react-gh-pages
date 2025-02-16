import BooleanLabel from "../../../components/ui/BooleanLabel/BooleanLabel"
import { DepartmentResponseData } from "../../../types/department.types"
import formatMoney from "../../../utils/formatMoney"
import DepartmentLink from "./DepartmentLink"

const DepartmentRow = (props: {
    department: DepartmentResponseData,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <DepartmentLink     
                        departmentID={props.department.id}  
                        name={props.department.data.name}
                        inactive={!props.department.data.is_active}
                    />
                </div>
            </td>
            <td>{formatMoney(props.department.data.contract_engineer_rate)}</td>
            <td>{formatMoney(props.department.data.contract_mate_rate)}</td>
            <td>{formatMoney(props.department.data.contract_mileage_rate)}</td>
            <td>{props.department.data.contract_material_markup}%</td>
            <td>{props.department.data.contract_subcontract_markup}%</td>
            <td>{props.department.data.contract_hire_markup}%</td>
            <td><BooleanLabel true={props.department.data.uses_equipment_module}/></td>
            <td><BooleanLabel true={props.department.data.uses_refrigerant_module}/></td>
            <td><BooleanLabel true={props.department.data.uses_fuel_module}/></td>
            <td><BooleanLabel true={props.department.data.uses_job_module}/></td>
            <td><BooleanLabel true={props.department.data.uses_collection_module}/></td>
        </tr>
    )
}

export default DepartmentRow