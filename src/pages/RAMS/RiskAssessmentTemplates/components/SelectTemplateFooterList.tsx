import SearchTable from "../../../../components/ui/SearchTable/SearchTable";
import { TemplateFooterCollectionResponse } from "../../../../types/templateFooter.types";
import RiskAssessmentTemplateRowSkeleton from "./RiskAssessmentTemplateRowSkeleton";
import TemplateFooterSelectRow from "./TemplateFooterSelectRow";

const SelectTemplateFooterList = (props: {
    isTemplateFootersLoading: boolean,
    templateFooters: TemplateFooterCollectionResponse | undefined,
    selectedID: number,
    updateSelection: (templateFooterID: number) => void,
    perPage: number,
    showAdvancedSearch?: () => void
}) => {

    // Resource Constants
    const resourceName = "template footers";
    const resourceIcon = "vertical_align_top";

    const isLoading = (
        props.isTemplateFootersLoading
    )

    return (
        <div>
            <SearchTable
                headers={['', 'Name']}
                isLoading={!(!isLoading && props.templateFooters)}
                skeletonRow={<RiskAssessmentTemplateRowSkeleton/>}
                skeletonCount={Math.min(props.perPage)}
                count={props.templateFooters ? props.templateFooters.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.templateFooters && props.templateFooters.data.map((templateFooter, index) => 
                    <TemplateFooterSelectRow 
                        templateFooter={templateFooter}
                        selected={props.selectedID === templateFooter.id}
                        updateSelection={props.updateSelection}
                        key={index}
                    />
                )}
                selectTable
            />
            {/* {(!isLoading && props.templateFooters) && <PaginationNavigation
                totalCount={props.templateFooters.total_count}
                perPage={props.templateFooters.pages.per_page}
                resourceName={resourceName}
                prefix="template_footers"    
            />} */}
        </div>
    )
}

export default SelectTemplateFooterList