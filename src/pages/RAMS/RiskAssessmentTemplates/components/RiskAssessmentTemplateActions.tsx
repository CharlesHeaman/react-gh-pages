import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import MarkRiskAssessmentTemplateAsDefault from "./MarkRiskAssessmentTemplateAsDefault";
import { RiskAssessmentTemplateResponseData } from "../../../../types/riskAssessmentTemplate.types";

const RiskAssessmentTemplateActions = (props: {
    riskAssessmentTemplateID: number,
    setRiskAssessmentTemplateData: Dispatch<SetStateAction<RiskAssessmentTemplateResponseData | undefined>>,
    isDefault: boolean,
    setIsEditMode: () => void,
}) => {
    
    const [showMarkAsDefault, setShowMarkAsDefault] = useState(false);

    return (
        <>
            <SideBarModule title="Actions">
                {!props.isDefault ? <SideBarButton 
                    text='Mark as Default'
                    iconFont="star"
                    color="dark-blue"
                    clickEvent={() => setShowMarkAsDefault(true)}
                /> : null}
                <SideBarButton
                    text='Edit Template Details'
                    iconFont="edit"
                    color="orange"
                    clickEvent={props.setIsEditMode}
                />
            </SideBarModule>

            <MarkRiskAssessmentTemplateAsDefault
                riskAssessmentTemplateID={props.riskAssessmentTemplateID}
                setRiskAssessmentTemplateData={props.setRiskAssessmentTemplateData}
                show={showMarkAsDefault}
                hideFunc={() => setShowMarkAsDefault(false)}
            />
        </>
    )
}

export default RiskAssessmentTemplateActions