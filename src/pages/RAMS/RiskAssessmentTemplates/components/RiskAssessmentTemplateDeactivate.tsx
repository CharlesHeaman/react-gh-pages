import { Dispatch, SetStateAction, useState } from "react";
import { RiskAssessmentTemplateResponseData } from "../../../../types/riskAssessmentTemplate.types";
import DeactivateModule from "../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../components/ui/DeactivateModule/DeactivateOverlay";
import putAPI from "../../../../utils/putAPI";

const RiskAssessmentTemplateDeactivate = (props: {
    riskAssessmentTemplateID: number,
    reactivate: boolean,
    setRiskAssessmentTemplateData: Dispatch<SetStateAction<RiskAssessmentTemplateResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateRiskAssessmentTemplate = () => {
        putAPI(`risk_assessment_templates/${props.riskAssessmentTemplateID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const templateHeaderData: RiskAssessmentTemplateResponseData = response.data;
            props.setRiskAssessmentTemplateData(templateHeaderData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Template'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Template"
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateRiskAssessmentTemplate}/>
        </>

    )
}

export default RiskAssessmentTemplateDeactivate