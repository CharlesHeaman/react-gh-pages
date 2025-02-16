import ExpiryDateLabel from "../../../../components/ui/ExpiryDateLabel/ExpiryDateLabel"
import { RiskAssessmentResponseData } from "../../../../types/riskAssessment.types"
import RiskAssessmentLink from "./RiskAssessmentLink"

const RiskAssessmentRow = (props: {
    riskAssessment: RiskAssessmentResponseData
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    {/* {!props.riskAssessment.data.is_active ? <DisabledLabel hideText/> : ''} */}
                    <RiskAssessmentLink riskAssessmentID={props.riskAssessment.id} name={props.riskAssessment.data.name}/>
                </div>
            </td>
            <td><ExpiryDateLabel date={props.riskAssessment.data.next_review_at}/></td>
        </tr>
    )
}

export default RiskAssessmentRow