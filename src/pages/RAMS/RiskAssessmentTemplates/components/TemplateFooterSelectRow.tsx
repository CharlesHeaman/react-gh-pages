import { TemplateFooterResponseData } from "../../../../types/templateFooter.types"
import TemplateFooterLink from "../../../Templates/Footers/TemplateFooterLink"

const TemplateFooterSelectRow = (props: {
    templateFooter: TemplateFooterResponseData,
    updateSelection: (siteID: number) => void,
    selected: boolean
}) => {
    return (
        <tr
            onClick={() => props.updateSelection(props.templateFooter.id)}
        >
            <td>
                <input 
                    type="checkbox"
                    checked={props.selected}
                />
            </td>
            <td className="text-left">
                <div className="flex">
                    <TemplateFooterLink 
                        templateFooterID={props.templateFooter.id} 
                        name={props.templateFooter.data.name}
                        inactive={!props.templateFooter.data.is_active}
                    />
                </div>
            </td>
        </tr>
    )
}

export default TemplateFooterSelectRow