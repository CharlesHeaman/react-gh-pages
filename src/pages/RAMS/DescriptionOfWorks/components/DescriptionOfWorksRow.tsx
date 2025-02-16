import DepartmentLabel from "../../../../components/ui/Department/DepartmentLabel"
import DisabledLabel from "../../../../components/ui/DisabledLabel/DisabledLabel"
import ExpiryDateLabel from "../../../../components/ui/ExpiryDateLabel/ExpiryDateLabel"
import { DepartmentResponseData } from "../../../../types/department.types"
import { DescriptionOfWorksResponseData } from "../../../../types/descriptionOfWorks.types"
import DescriptionOfWorksLink from "./DescriptionOfWorksLink"

const DescriptionOfWorksRow = (props: {
    descriptionOfWorks: DescriptionOfWorksResponseData
    department: DepartmentResponseData | undefined,
}) => {
    return (
        props.department ? 
            <tr>
                <td className="text-left">
                    <div className="flex">
                        {!props.descriptionOfWorks.data.is_active ? <DisabledLabel hideText/> : ''}
                        <DescriptionOfWorksLink descriptionOfWorksID={props.descriptionOfWorks.id} name={props.descriptionOfWorks.data.name}/>
                    </div>
                </td>
                <td><DepartmentLabel department={props.department}/></td>
                <td><ExpiryDateLabel date={props.descriptionOfWorks.data.next_review_at}/></td>
            </tr> : null
    )
}

export default DescriptionOfWorksRow