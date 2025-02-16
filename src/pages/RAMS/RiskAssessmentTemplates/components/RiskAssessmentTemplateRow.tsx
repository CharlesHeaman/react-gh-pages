import DefaultLabel from "../../../../components/ui/InactiveLabel/DefaultLabel"
import { RiskAssessmentTemplateResponseData } from "../../../../types/riskAssessmentTemplate.types"
import RiskAssessmentTemplateLink from "./RiskAssessmentTemplateLink"

const RiskAssessmentTemplateRow = (props: {
    riskAssessmentTemplate: RiskAssessmentTemplateResponseData,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <RiskAssessmentTemplateLink 
                        riskAssessmentTemplateID={props.riskAssessmentTemplate.id} 
                        name={props.riskAssessmentTemplate.data.name}
                        inactive={!props.riskAssessmentTemplate.data.is_active}
                    />
                </div>
            </td>
            <td className="text-left">{props.riskAssessmentTemplate.data.description}</td>
            <td>{props.riskAssessmentTemplate.data.is_default ? <DefaultLabel/> : null}</td>
        </tr>
    )
}

export default RiskAssessmentTemplateRow