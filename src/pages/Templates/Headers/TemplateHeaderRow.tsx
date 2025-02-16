import { TemplateHeaderResponseData } from "../../../types/templateHeader.types"
import TemplateHeaderLink from "./TemplateHeaderLink"

const TemplateHeaderRow = (props: {
    templateHeader: TemplateHeaderResponseData,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <TemplateHeaderLink 
                        templateHeaderID={props.templateHeader.id} 
                        name={props.templateHeader.data.name}
                        inactive={!props.templateHeader.data.is_active}
                    />
                </div>
            </td>
            <td className="text-left">{props.templateHeader.data.description}</td>
        </tr>
    )
}

export default TemplateHeaderRow