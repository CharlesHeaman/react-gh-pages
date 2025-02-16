import ActionMenu from "../../../../../../../../../components/form/ActionMenu/ActionMenu"
import DepartmentLabel from "../../../../../../../../../components/ui/Department/DepartmentLabel"
import Label from "../../../../../../../../../components/ui/General/Label/Label"
import { DepartmentResponseData } from "../../../../../../../../../types/department.types"
import formatMoney from "../../../../../../../../../utils/formatMoney"
import DepartmentLink from "../../../../../../../../System/Departments/DepartmentLink"

const NonContractRatesRow = (props: {
    department: DepartmentResponseData,
}) => {
    return (
        <tr>
            <td className="text-left"><DepartmentLabel department={props.department}/></td>
            <td><Label text="Default" iconFont="settings" color="grey"/></td>
            <td>{formatMoney(props.department.data.engineer_rate)}</td>
            <td>{formatMoney(props.department.data.mate_rate)}</td>
            <td>{formatMoney(props.department.data.mileage_rate)}</td>
            <td>{props.department.data.material_markup}%</td>
            <td>{props.department.data.subcontract_markup}%</td>
            <td>{props.department.data.hire_markup}%</td>
            <td><ActionMenu actionItems={[
                {
                    iconFont: 'edit',
                    text: 'Edit Rates',
                    clickFunc: () => null
                },
                {
                    iconFont: 'settings',
                    text: 'Reset Default',
                    clickFunc: () => null
                }
            ]}/></td>
        </tr>  
    )
}
export default NonContractRatesRow