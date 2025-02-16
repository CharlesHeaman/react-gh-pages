import { DepartmentResponseData } from "../../../types/department.types"
import Label from "../General/Label/Label"

const DepartmentLabel = (props: {
    department: DepartmentResponseData,
    hideIcon?: boolean
}) => {
    return (
        <Label 
            iconFont='dashboard'
            text={props.department.data.name} 
            hex={props.department.data.label_color}
            hideIcon={props.hideIcon}
        />
    )
}

export default DepartmentLabel