import { Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { RiskAssessmentTemplateResponseData } from "../../../../types/riskAssessmentTemplate.types"
import putAPI from "../../../../utils/putAPI"

const MarkRiskAssessmentTemplateAsDefault = (props: {
    riskAssessmentTemplateID: number,
    setRiskAssessmentTemplateData: Dispatch<SetStateAction<RiskAssessmentTemplateResponseData | undefined>>
    show: boolean,
    hideFunc: () => void
}) => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const markAsDefault = () => {
        putAPI(`risk_assessment_templates/${props.riskAssessmentTemplateID}/mark_as_default`, {}, {
            is_default: true
        }, (response: any) => {
            props.setRiskAssessmentTemplateData(response.data);
            props.hideFunc();
        }, setIsSubmitting)
    }

    return (
        <WindowOverlay 
            title={"Mark as Default"} 
            maxWidth={300} 
            hideFunc={props.hideFunc} 
            show={props.show} 
            footer={<SubmitButton
                text="Mark as Default"
                color="dark-blue"
                iconFont="star"
                submitting={isSubmitting}
                submittingText='Updating...'
                clickFunc={markAsDefault}
            />}
        >
            <p>This will mark this risk assessment template as the new default template.</p>
        </WindowOverlay>

    )
}

export default MarkRiskAssessmentTemplateAsDefault