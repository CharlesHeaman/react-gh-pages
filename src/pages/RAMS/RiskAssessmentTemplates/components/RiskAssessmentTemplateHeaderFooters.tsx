import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { RiskAssessmentTemplateResponseData } from "../../../../types/riskAssessmentTemplate.types"
import SelectRiskAssessmentTemplateHeader from "./SelectRiskAssessmentTemplateHeader"
import SelectRiskAssessmentTemplateFooter from "./SelectRiskAssessmentTemplateFooter"

const RiskAssessmentTemplateHeadersFooters = (props: {
    riskAssessmentTemplateID: number,
    setRiskAssessmentTemplateData: Dispatch<SetStateAction<RiskAssessmentTemplateResponseData | undefined>>,
    templateFooterID: number | null,
    templateHeaderID: number | null,
}) => {

    const [showHeaders, setShowHeaders] = useState(false);
    const [showFooters, setShowFooters] = useState(false);

    return (
        <>
            <SideBarModule title="Header/Footer">
                <SideBarButton 
                    text='Select Header'
                    iconFont="vertical_align_top"
                    clickEvent={() => setShowHeaders(true)}
                />
                <SideBarButton 
                    text='Select Footer'
                    iconFont="vertical_align_bottom"
                    clickEvent={() => setShowFooters(true)}
                />
            </SideBarModule>

            <SelectRiskAssessmentTemplateHeader
                riskAssessmentTemplateID={props.riskAssessmentTemplateID}
                setRiskAssessmentTemplateData={props.setRiskAssessmentTemplateData}
                templateHeaderID={props.templateHeaderID}
                show={showHeaders}
                hideFunc={() => setShowHeaders(false)}
            />

            <SelectRiskAssessmentTemplateFooter
                riskAssessmentTemplateID={props.riskAssessmentTemplateID}
                setRiskAssessmentTemplateData={props.setRiskAssessmentTemplateData}
                templateFooterID={props.templateFooterID}
                show={showFooters}
                hideFunc={() => setShowFooters(false)}
            />
        </>
    )
}

export default RiskAssessmentTemplateHeadersFooters