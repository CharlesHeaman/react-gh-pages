import { TemplateHeaderResponseData } from "../../../types/templateHeader.types"
import TemplateHeaderLink from "./TemplateHeaderLink"

const TemplateHeaderSelectRow = (props: {
    templateHeader: TemplateHeaderResponseData,
    updateSelection: (siteID: number) => void,
    selected: boolean
}) => {
    return (
        <tr
            onClick={() => props.updateSelection(props.templateHeader.id)}
        >
            <td>
                <input 
                    type="checkbox"
                    checked={props.selected}
                />
            </td>
            <td className="text-left">
                <div className="flex">
                    <TemplateHeaderLink 
                        templateHeaderID={props.templateHeader.id} 
                        name={props.templateHeader.data.name}
                        inactive={!props.templateHeader.data.is_active}
                    />
                </div>
            </td>
        </tr>
    )
}

export default TemplateHeaderSelectRow