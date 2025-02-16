import DepartmentLabel from "../../../../components/ui/Department/DepartmentLabel"
import Label from "../../../../components/ui/General/Label/Label"
import { CostCentreResponseData } from "../../../../types/costCentres.types"
import { DepartmentResponseData } from "../../../../types/department.types"
import AssociatedResourceTypeLabel from "../../utils/AssociatedResourceTypeLabel"
import CostCentreLink from "./CostCentreLink"

const CostCentreRow = (props: {
    costCentre: CostCentreResponseData,
    department: DepartmentResponseData | undefined,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <CostCentreLink     
                        costCentreID={props.costCentre.id}  
                        name={props.costCentre.data.name}
                        inactive={!props.costCentre.data.is_active}
                    />
                </div>
            </td>
            <td>
                <AssociatedResourceTypeLabel resourceType={props.costCentre.data.associated_resource_type}/>
            </td>
            <td className="text-left">
                {props.department ? 
                    <DepartmentLabel department={props.department}/> : 
                    <Label text="None" iconFont="not_interested" color="no-color"/>
                }
            </td>
        </tr>
    )
}

export default CostCentreRow