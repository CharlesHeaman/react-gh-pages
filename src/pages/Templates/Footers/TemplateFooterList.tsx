import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { TemplateFooterCollectionResponse } from "../../../types/templateFooter.types";
import RiskAssessmentTemplateRowSkeleton from "../../RAMS/RiskAssessmentTemplates/components/RiskAssessmentTemplateRowSkeleton";
import TemplateFooterRow from "./TemplateFooterRow";


const TemplateFooterList = (props: {
    isTemplateFootersLoading: boolean,
    templateFooters: TemplateFooterCollectionResponse | undefined,
    perPage: number,
    showAdvancedSearch?: () => void
}) => {

    // Resource Constants
    const resourceName = "template footers";
    const resourceIcon = "vertical_align_bottom";

    const isLoading = (
        props.isTemplateFootersLoading
    )

    return (
        <div>
            <SearchTable
                headers={['Name', 'Description']}
                isLoading={!(!isLoading && props.templateFooters)}
                skeletonRow={<RiskAssessmentTemplateRowSkeleton/>}
                skeletonCount={Math.min(props.perPage)}
                count={props.templateFooters ? props.templateFooters.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.templateFooters && props.templateFooters.data.map((templateFooter, index) => 
                    <TemplateFooterRow 
                        templateFooter={templateFooter}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.templateFooters) && <PaginationNavigation
                data={props.templateFooters.data}
                totalCount={props.templateFooters.total_count}
                perPage={props.templateFooters.pages.per_page}
                resourceName={resourceName}
                prefix="template_footers"    
            />}
        </div>
    )
}

export default TemplateFooterList