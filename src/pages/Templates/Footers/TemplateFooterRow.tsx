import { TemplateFooterResponseData } from "../../../types/templateFooter.types"
import TemplateFooterLink from "./TemplateFooterLink"

const TemplateFooterRow = (props: {
    templateFooter: TemplateFooterResponseData,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <TemplateFooterLink 
                        templateFooterID={props.templateFooter.id} 
                        name={props.templateFooter.data.name}
                        inactive={!props.templateFooter.data.is_active}
                    />
                </div>
            </td>
            <td className="text-left">{props.templateFooter.data.description}</td>
        </tr>
    )
}

export default TemplateFooterRow