import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../components/ui/SearchTable/SearchTable";
import { MethodStatementTemplateCollectionResponse } from "../../../../types/methodStatementTemplate.types";
import MethodStatementTemplateRow from "./MethodStatementTemplateRow";
import MethodStatementTemplateRowSkeleton from "./MethodStatementTemplateRowSkeleton";

const MethodStatementTemplateList = (props: {
    isMethodStatementTemplatesLoading: boolean,
    methodStatementTemplates: MethodStatementTemplateCollectionResponse | undefined,
    perPage: number,
    showAdvancedSearch?: () => void
}) => {

    // Resource Constants
    const resourceName = "method statement templates";
    const resourceIcon = "feed";

    const isLoading = (
        props.isMethodStatementTemplatesLoading
    )

    return (
        <div>
            <SearchTable
                headers={['Name', 'Description', '']}
                isLoading={!(!isLoading && props.methodStatementTemplates)}
                skeletonRow={<MethodStatementTemplateRowSkeleton/>}
                skeletonCount={props.perPage}
                count={props.methodStatementTemplates ? props.methodStatementTemplates.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.methodStatementTemplates && props.methodStatementTemplates.data.map((methodStatementTemplate, index) => 
                    <MethodStatementTemplateRow 
                        methodStatementTemplate={methodStatementTemplate}
                        key={index}
                    />  
                )}
            />
            {(!isLoading && props.methodStatementTemplates) && <PaginationNavigation
                data={props.methodStatementTemplates.data}
                totalCount={props.methodStatementTemplates.total_count}
                perPage={props.methodStatementTemplates.pages.per_page}
                resourceName={resourceName}
                prefix="method_statement_templates"    
            />}
        </div>
    )
}

export default MethodStatementTemplateList