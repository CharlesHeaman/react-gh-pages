import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { TemplateHeaderCollectionResponse } from "../../../types/templateHeader.types";
import RiskAssessmentTemplateRowSkeleton from "../../RAMS/RiskAssessmentTemplates/components/RiskAssessmentTemplateRowSkeleton";
import TemplateHeaderRow from "./TemplateHeaderRow";


const TemplateHeaderList = (props: {
    isTemplateHeadersLoading: boolean,
    templateHeaders: TemplateHeaderCollectionResponse | undefined,
    perPage: number,
    showAdvancedSearch?: () => void
}) => {

    // Resource Constants
    const resourceName = "template headers";
    const resourceIcon = "vertical_align_top";

    const isLoading = (
        props.isTemplateHeadersLoading
    )

    return (
        <div>
            <SearchTable
                headers={['Name', 'Description']}
                isLoading={!(!isLoading && props.templateHeaders)}
                skeletonRow={<RiskAssessmentTemplateRowSkeleton/>}
                skeletonCount={Math.min(props.perPage)}
                count={props.templateHeaders ? props.templateHeaders.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.templateHeaders && props.templateHeaders.data.map((templateHeader, index) => 
                    <TemplateHeaderRow 
                        templateHeader={templateHeader}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.templateHeaders) && <PaginationNavigation
                data={props.templateHeaders.data}
                totalCount={props.templateHeaders.total_count}
                perPage={props.templateHeaders.pages.per_page}
                resourceName={resourceName}
                prefix="template_headers"    
            />}
        </div>
    )
}

export default TemplateHeaderList