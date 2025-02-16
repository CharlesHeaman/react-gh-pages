import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { RiskAssessmentTemplateCollectionResponse } from "../../../types/riskAssessmentTemplate.types";
import getAPI from "../../../utils/getAPI";
import RiskAssessmentTemplateList from "./components/RiskAssessmentTemplateList";
import RiskAssessmentTemplateSearchHeader from "./components/RiskAssessmentTemplateSearchHeader";
import getRiskAssessmentTemplateSearchParams from "./utils/getRiskAssessmentTemplateSearchParams";
import CreateRiskAssessmentTemplate from "./CreateRiskAssessmentTemplate";

const RiskAssessmentTemplatesListPage = () => {
    const [searchParams] = useSearchParams();

    // Form States
    const [showCreate, setShowCreate] = useState(false);

    // Data States
    const [isRiskAssessmentTemplatesLoading, setIsRiskAssessmentTemplatesLoading] = useState(true);
    const [riskAssessmentTemplateData, setRiskAssessmentTemplateData] = useState<RiskAssessmentTemplateCollectionResponse>();

    // Search Params
    const riskAssessmentTemplateSearchParams = getRiskAssessmentTemplateSearchParams(searchParams);

    useEffect(() => {
        getRiskAssessmentTemplates();
    }, [JSON.stringify(riskAssessmentTemplateSearchParams)]);

    const getRiskAssessmentTemplates = () => {
        getAPI('risk_assessment_templates', riskAssessmentTemplateSearchParams, (response: any) => {
            const riskAssessmentTemplatesData: RiskAssessmentTemplateCollectionResponse = response.data;
            setRiskAssessmentTemplateData(riskAssessmentTemplatesData);
        }, setIsRiskAssessmentTemplatesLoading)
    }
    return (
        <>
            <OuterContainer
                title='Risk Assessment Templates'
                description="Create, edit and deactivate risk assessment templates that are used to generate risk assessments."
                maxWidth={1000}
                noBorder
            >
                <RiskAssessmentTemplateSearchHeader
                    showCreate={() => setShowCreate(true)}
                />
                <RiskAssessmentTemplateList 
                    isRiskAssessmentTemplatesLoading={isRiskAssessmentTemplatesLoading} 
                    riskAssessmentTemplates={riskAssessmentTemplateData} 
                    perPage={riskAssessmentTemplateSearchParams.perPage}
                />
            </OuterContainer>

            <CreateRiskAssessmentTemplate
                show={showCreate}
                hideFunc={() => setShowCreate(false)}
            />
        </>
    )
}

export default RiskAssessmentTemplatesListPage