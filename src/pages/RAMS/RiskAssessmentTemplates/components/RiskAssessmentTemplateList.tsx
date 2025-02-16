import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../components/ui/SearchTable/SearchTable";
import { RiskAssessmentTemplateCollectionResponse } from "../../../../types/riskAssessmentTemplate.types";
import RiskAssessmentTemplateRow from "./RiskAssessmentTemplateRow";
import RiskAssessmentTemplateRowSkeleton from "./RiskAssessmentTemplateRowSkeleton";

const RiskAssessmentTemplateList = (props: {
    isRiskAssessmentTemplatesLoading: boolean,
    riskAssessmentTemplates: RiskAssessmentTemplateCollectionResponse | undefined,
    perPage: number,
    showAdvancedSearch?: () => void
}) => {

    // Resource Constants
    const resourceName = "risk assessment templates";
    const resourceIcon = "assignment_late";

    const isLoading = (
        props.isRiskAssessmentTemplatesLoading
    )
    return (
        <div>
            <SearchTable
                headers={['Name', 'Description', '']}
                isLoading={!(!isLoading && props.riskAssessmentTemplates)}
                skeletonRow={<RiskAssessmentTemplateRowSkeleton/>}
                skeletonCount={props.perPage}
                count={props.riskAssessmentTemplates ? props.riskAssessmentTemplates.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.riskAssessmentTemplates && props.riskAssessmentTemplates.data.map((riskAssessmentTemplate, index) => 
                    <RiskAssessmentTemplateRow 
                        riskAssessmentTemplate={riskAssessmentTemplate}
                        key={index}
                    />  
                )}
            />
            {(!isLoading && props.riskAssessmentTemplates) && <PaginationNavigation
                data={props.riskAssessmentTemplates.data}
                totalCount={props.riskAssessmentTemplates.total_count}
                perPage={props.riskAssessmentTemplates.pages.per_page}
                resourceName={resourceName}
                prefix="risk_assessment_templates"    
            />}
        </div>
    )
}

export default RiskAssessmentTemplateList