import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { ManualCollectionResponse, ManualResponseData } from "../../../types/manuals.types";
import ScheduleOfWorksRowSkeleton from "../scheduleOfWorks/ScheduleOfWorksDocumentRowSkeleton";
import ManualsDocumentRow from "./ManualsDocumentRow";

const ManualsList = (props: {
    isManualsLoading: boolean,
    manuals: ManualCollectionResponse | undefined,
    perPage: number,
    showRename: (document: ManualResponseData) => void,
    showDeactivate: (document: ManualResponseData) => void,
    totalCount?: number,
}) => {
    // Resource Constants
    const resourceName = "manuals";
    const resourceIcon = "find_in_page";

    const isLoading = (
        props.isManualsLoading 
    )

    return (
        <div>
            <SearchTable 
                headers={['Document Name', 'Date', '']} 
                skeletonRow={<ScheduleOfWorksRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)} 
                count={props.manuals ? props.manuals.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.manuals)}
                body={props.manuals && props.manuals.data.map((manual, index) => 
                    <ManualsDocumentRow 
                        document={manual} 
                        actions={[
                            {
                                iconFont: 'edit',
                                text: 'Rename',
                                clickFunc: () => props.showRename(manual)
                            },
                            {
                                iconFont: 'highlight_off',
                                text: 'Deactivate',
                                clickFunc: () => props.showDeactivate(manual)
                            }
                        ]}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.manuals) && <PaginationNavigation
                data={props.manuals.data}
                totalCount={props.manuals.total_count}
                perPage={props.manuals.pages.per_page}
                resourceName={resourceName}
                prefix="manuals"
            />}
        </div>
    )
}

export default ManualsList