import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import DefaultLabel from "../../../components/ui/InactiveLabel/DefaultLabel";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import { RiskAssessmentTemplateResponseData } from "../../../types/riskAssessmentTemplate.types";
import { TemplateFooterResponseData } from "../../../types/templateFooter.types";
import { TemplateHeaderResponseData } from "../../../types/templateHeader.types";
import { UserResponseData } from "../../../types/user.types";
import escapeCodeSnippetHTML from "../../../utils/escapeCodeSnippetHTML";
import { CodeSnippet } from "../../../utils/getAllCodeSnippets";
import getAPI from "../../../utils/getAPI";
import getCodeSnippets from "../../../utils/getCodeSnippets";
import RiskAssessmentTemplateInformation from "./components/RiskAssessmentTemplateInformation";
import RiskAssessmentTemplateSideBar from "./components/RiskAssessmentTemplateSideBar";
import EditRiskAssessmentTemplateForm from "./EditRiskAssessmentTemplateForm";
import RiskAssessmentTemplateInformationSkeleton from "./RiskAssessmentTemplateInformationSkeleton";

const RiskAssessmentTemplatePage = () => {
    const { riskAssessmentTemplateID } = useParams();

    const [codeSnippets, setCodeSnippets] = useState<Array<CodeSnippet>>([]);

    const [isRiskAssessmentTemplateLoading, setIsRiskAssessmentTemplateLoading] = useState(true);
    const [riskAssessmentTemplateData, setRiskAssessmentTemplateData] = useState<RiskAssessmentTemplateResponseData>();
    const [isCreatedByUserLoading, setIsCreatedByUserLoading] = useState(false);
    const [createdByUserData, setCreatedByUserData] = useState<UserResponseData>();
    const [isTemplateHeaderLoading, setIsTemplateHeaderLoading] = useState(false);
    const [templateHeaderData, setTemplateHeaderData] = useState<TemplateHeaderResponseData>();
    const [isTemplateFooterLoading, setIsTemplateFooterLoading] = useState(false);
    const [templateFooterData, setTemplateFooterData] = useState<TemplateFooterResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getRiskAssessmentTemplate();
    }, [riskAssessmentTemplateID]);

    useEffect(() => {
        riskAssessmentTemplateData && setCodeSnippets(escapeCodeSnippetHTML(getCodeSnippets(riskAssessmentTemplateData.data.content)))
    }, [riskAssessmentTemplateData]);

    useEffect(() => {
        if (riskAssessmentTemplateData === undefined) return;
        riskAssessmentTemplateData.data.template_header_id && getTemplateHeader(riskAssessmentTemplateData.data.template_header_id);
    }, [riskAssessmentTemplateData?.data.template_header_id]);

    useEffect(() => {
        if (riskAssessmentTemplateData === undefined) return;
        riskAssessmentTemplateData.data.template_footer_id && getTemplateFooter(riskAssessmentTemplateData.data.template_footer_id);
    }, [riskAssessmentTemplateData?.data.template_footer_id]);


    const getRiskAssessmentTemplate = () => {
        getAPI(`risk_assessment_templates/${riskAssessmentTemplateID}`, {}, (response: any) => {
            const riskAssessmentTemplatesData: RiskAssessmentTemplateResponseData = response.data;
            setRiskAssessmentTemplateData(riskAssessmentTemplatesData);
            getCreatedByUser(riskAssessmentTemplatesData.data.created_by_id);
            riskAssessmentTemplatesData.data.template_header_id && getTemplateHeader(riskAssessmentTemplatesData.data.template_header_id);
            riskAssessmentTemplatesData.data.template_footer_id && getTemplateFooter(riskAssessmentTemplatesData.data.template_footer_id);
        }, setIsRiskAssessmentTemplateLoading)
    }

    const getCreatedByUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setCreatedByUserData(userData);
        }, setIsCreatedByUserLoading)
    }

    const getTemplateHeader = (templateHeaderID: number) => {
        getAPI(`template_headers/${templateHeaderID}`, {}, (response: any) => {
            const templateHeaderData: TemplateHeaderResponseData = response.data;
            setTemplateHeaderData(templateHeaderData);
        }, setIsTemplateHeaderLoading)
    }

    const getTemplateFooter = (templateFooterID: number) => {
        getAPI(`template_footers/${templateFooterID}`, {}, (response: any) => {
            const templateFooterData: TemplateFooterResponseData = response.data;
            setTemplateFooterData(templateFooterData);
        }, setIsTemplateFooterLoading)
    }

    const isLoading = (
        isRiskAssessmentTemplateLoading ||
        isTemplateFooterLoading || 
        isTemplateHeaderLoading
    )

    const isHeaderLoading = (
        isRiskAssessmentTemplateLoading 
    )

    return (
        <>
            <OuterContainer
                title='Risk Assessment Template'
                id={riskAssessmentTemplateID}
                headerContent={!isHeaderLoading && riskAssessmentTemplateData ? 
                    <div className='flex'>
                        {!riskAssessmentTemplateData.data.is_active && <InactiveLabel/>}
                        {riskAssessmentTemplateData?.data.is_default ? <DefaultLabel/> : null}
                    </div> :
                    undefined
                }
                maxWidth={1050}
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && riskAssessmentTemplateData ?
                            !isEditMode ? 
                                <RiskAssessmentTemplateInformation
                                    riskAssessmentTemplate={riskAssessmentTemplateData}
                                    templateHeader={templateHeaderData}
                                    templateFooter={templateFooterData}
                                    codeSnippets={codeSnippets}
                                /> :
                                <EditRiskAssessmentTemplateForm
                                    template={riskAssessmentTemplateData}
                                    setRiskAssessmentTemplateData={setRiskAssessmentTemplateData}
                                    disabledEdit={() => setIsEditMode(false)}
                                />
                            :
                            <RiskAssessmentTemplateInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <RiskAssessmentTemplateSideBar
                            riskAssessmentTemplate={riskAssessmentTemplateData}
                            setRiskAssessmentTemplateData={setRiskAssessmentTemplateData}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode}
                        /> 
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default RiskAssessmentTemplatePage