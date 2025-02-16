import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { TemplateHeaderCollectionResponse } from "../../../types/templateHeader.types";
import RiskAssessmentTemplateRowSkeleton from "../../RAMS/RiskAssessmentTemplates/components/RiskAssessmentTemplateRowSkeleton";
import TemplateHeaderSelectRow from "./TemplateHeaderSelectRow";


const SelectTemplateHeaderList = (props: {
    isTemplateHeadersLoading: boolean,
    templateHeaders: TemplateHeaderCollectionResponse | undefined,
    selectedID: number,
    updateSelection: (templateHeaderID: number) => void,
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
                headers={['', 'Name']}
                isLoading={!(!isLoading && props.templateHeaders)}
                skeletonRow={<RiskAssessmentTemplateRowSkeleton/>}
                skeletonCount={Math.min(props.perPage)}
                count={props.templateHeaders ? props.templateHeaders.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.templateHeaders && props.templateHeaders.data.map((templateHeader, index) => 
                    <TemplateHeaderSelectRow 
                        templateHeader={templateHeader}
                        selected={props.selectedID === templateHeader.id}
                        updateSelection={props.updateSelection}
                        key={index}
                    />
                )}
                selectTable
            />
            {/* {(!isLoading && props.templateHeaders) && <PaginationNavigation
                totalCount={props.templateHeaders.total_count}
                perPage={props.templateHeaders.pages.per_page}
                resourceName={resourceName}
                prefix="template_headers"    
            />} */}
        </div>
    )
}

export default SelectTemplateHeaderList