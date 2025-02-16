import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { ScheduleOfWorksCollectionResponse, ScheduleOfWorksResponseData } from "../../../types/scheduleOfWorks.types";
import ScheduleOfWorksDocumentRow from "./ScheduleOfWorksDocumentRow";
import ScheduleOfWorksRowSkeleton from "./ScheduleOfWorksDocumentRowSkeleton";

const ScheduleOfWorksList = (props: {
    isScheduleOfWorksLoading: boolean,
    scheduleOfWorks: ScheduleOfWorksCollectionResponse | undefined,
    perPage: number,
    showRename: (document: ScheduleOfWorksResponseData) => void,
    showDeactivate: (document: ScheduleOfWorksResponseData) => void,
    totalCount?: number,
}) => {
    // Resource Constants
    const resourceName = "schedule of works";
    const resourceIcon = "description";

    const isLoading = (
        props.isScheduleOfWorksLoading 
    )

    return (
        <div>
            <SearchTable 
                headers={['Document Name', 'Date', '']} 
                skeletonRow={<ScheduleOfWorksRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)} 
                count={props.scheduleOfWorks ? props.scheduleOfWorks.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.scheduleOfWorks)}
                body={props.scheduleOfWorks && props.scheduleOfWorks.data.map((scheduleOfWorks, index) => 
                    <ScheduleOfWorksDocumentRow 
                        document={scheduleOfWorks} 
                        actions={[
                            {
                                iconFont: 'edit',
                                text: 'Rename',
                                clickFunc: () => props.showRename(scheduleOfWorks)
                            },
                            {
                                iconFont: 'highlight_off',
                                text: 'Deactivate',
                                clickFunc: () => props.showDeactivate(scheduleOfWorks)
                            }
                        ]}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.scheduleOfWorks) && <PaginationNavigation
                data={props.scheduleOfWorks.data}
                totalCount={props.scheduleOfWorks.total_count}
                perPage={props.scheduleOfWorks.pages.per_page}
                resourceName={resourceName}
                prefix="schedule_of_works"
            />}
        </div>
    )
}

export default ScheduleOfWorksList