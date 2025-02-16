import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import DefaultLabel from "../../../components/ui/InactiveLabel/DefaultLabel";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import { MethodStatementTemplateResponseData } from "../../../types/methodStatementTemplate.types";
import { TemplateFooterResponseData } from "../../../types/templateFooter.types";
import { TemplateHeaderResponseData } from "../../../types/templateHeader.types";
import { UserResponseData } from "../../../types/user.types";
import escapeCodeSnippetHTML from "../../../utils/escapeCodeSnippetHTML";
import { CodeSnippet } from "../../../utils/getAllCodeSnippets";
import getAPI from "../../../utils/getAPI";
import getCodeSnippets from "../../../utils/getCodeSnippets";
import MethodStatementTemplateInformation from "./MethodStatementTemplateInformation";
import EditMethodStatementTemplateForm from "./EditMethodStatementForm";
import RiskAssessmentTemplateInformationSkeleton from "../RiskAssessmentTemplates/RiskAssessmentTemplateInformationSkeleton";
import MethodStatementTemplateSideBar from "./MethodStatementTemplateSideBar";

const MethodStatementTemplatePage = () => {
    const { methodStatementTemplateID } = useParams();

    const [codeSnippets, setCodeSnippets] = useState<Array<CodeSnippet>>([]);

    const [isMethodStatementTemplateLoading, setIsMethodStatementTemplateLoading] = useState(true);
    const [methodStatementTemplateData, setMethodStatementTemplateData] = useState<MethodStatementTemplateResponseData>();
    const [isCreatedByUserLoading, setIsCreatedByUserLoading] = useState(false);
    const [createdByUserData, setCreatedByUserData] = useState<UserResponseData>();
    const [isTemplateHeaderLoading, setIsTemplateHeaderLoading] = useState(false);
    const [templateHeaderData, setTemplateHeaderData] = useState<TemplateHeaderResponseData>();
    const [isTemplateFooterLoading, setIsTemplateFooterLoading] = useState(false);
    const [templateFooterData, setTemplateFooterData] = useState<TemplateFooterResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getMethodStatementTemplate();
    }, [methodStatementTemplateID]);

    useEffect(() => {
        methodStatementTemplateData && setCodeSnippets(escapeCodeSnippetHTML(getCodeSnippets(methodStatementTemplateData.data.content)))
    }, [methodStatementTemplateData]);

    useEffect(() => {
        if (methodStatementTemplateData === undefined) return;
        methodStatementTemplateData.data.template_header_id && getTemplateHeader(methodStatementTemplateData.data.template_header_id);
    }, [methodStatementTemplateData?.data.template_header_id]);

    useEffect(() => {
        if (methodStatementTemplateData === undefined) return;
        methodStatementTemplateData.data.template_footer_id && getTemplateFooter(methodStatementTemplateData.data.template_footer_id);
    }, [methodStatementTemplateData?.data.template_footer_id]);


    const getMethodStatementTemplate = () => {
        getAPI(`method_statement_templates/${methodStatementTemplateID}`, {}, (response: any) => {
            const methodStatementTemplatesData: MethodStatementTemplateResponseData = response.data;
            setMethodStatementTemplateData(methodStatementTemplatesData);
            getCreatedByUser(methodStatementTemplatesData.data.created_by_id);
            methodStatementTemplatesData.data.template_header_id && getTemplateHeader(methodStatementTemplatesData.data.template_header_id);
            methodStatementTemplatesData.data.template_footer_id && getTemplateFooter(methodStatementTemplatesData.data.template_footer_id);
        }, setIsMethodStatementTemplateLoading)
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
        isMethodStatementTemplateLoading ||
        isTemplateFooterLoading || 
        isTemplateHeaderLoading
    )

    const isHeaderLoading = (
        isMethodStatementTemplateLoading 
    )

    return (
        <>
            <OuterContainer
                title='Method Statement Template'
                id={methodStatementTemplateID}
                headerContent={!isHeaderLoading && methodStatementTemplateData ? 
                    <div className='flex'>
                        {!methodStatementTemplateData.data.is_active && <InactiveLabel/>}
                        {methodStatementTemplateData?.data.is_default ? <DefaultLabel/> : null}
                    </div> :
                    undefined
                }
                maxWidth={1050}
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && methodStatementTemplateData ?
                            !isEditMode ? 
                                <MethodStatementTemplateInformation
                                    methodStatementTemplate={methodStatementTemplateData}
                                    templateHeader={templateHeaderData}
                                    templateFooter={templateFooterData}
                                    codeSnippets={codeSnippets}
                                /> :
                                <EditMethodStatementTemplateForm
                                    template={methodStatementTemplateData}
                                    setMethodStatementTemplateData={setMethodStatementTemplateData}
                                    disabledEdit={() => setIsEditMode(false)}
                                />
                            :
                            <RiskAssessmentTemplateInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <MethodStatementTemplateSideBar
                            methodStatementTemplate={methodStatementTemplateData}
                            setMethodStatementTemplateData={setMethodStatementTemplateData}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode}
                        /> 
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default MethodStatementTemplatePage