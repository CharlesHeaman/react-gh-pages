import DefaultLabel from "../../../../components/ui/InactiveLabel/DefaultLabel"
import { MethodStatementTemplateResponseData } from "../../../../types/methodStatementTemplate.types"
import MethodStatementTemplateLink from "./MethodStatementTemplateLink"

const MethodStatementTemplateRow = (props: {
    methodStatementTemplate: MethodStatementTemplateResponseData,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <MethodStatementTemplateLink 
                        methodStatementTemplateID={props.methodStatementTemplate.id} 
                        name={props.methodStatementTemplate.data.name}
                        inactive={!props.methodStatementTemplate.data.is_active}
                    />
                </div>
            </td>
            <td className="text-left">{props.methodStatementTemplate.data.description}</td>
            <td>{props.methodStatementTemplate.data.is_default ? <DefaultLabel/> : null}</td>
        </tr>
    )
}

export default MethodStatementTemplateRow