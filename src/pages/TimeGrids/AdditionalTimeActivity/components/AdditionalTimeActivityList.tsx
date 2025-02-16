import { useNavigate } from "react-router-dom"
import ListItem from "../../../../components/ui/Containers/ListItem/ListItem"
import ListWrapper from "../../../../components/ui/Containers/ListWrapper/ListWrapper"
import DisabledLabel from "../../../../components/ui/DisabledLabel/DisabledLabel"
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation"
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound"
import { AdditionalTimeActivityCollectionResponse } from "../../../../types/additionalTimeActivity.types"
import ProductCategoryRow from "../../../ProductCategories/components/ProductCategoryRow"
import ProductCategoryRowSkeleton from "../../../ProductCategories/components/ProductCategoryRowSkeleton"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import AdditionalTimeActivityRow from "./AdditionalTimeActivityRow"

const AdditionalTimeActivityList = (props: {
    isAdditionalTimeActivityLoading: boolean,
    additionalTimeActivityData: AdditionalTimeActivityCollectionResponse | undefined,
    perPage: number,
}) => {
    // Resource Constants
    const resourceName = 'additional time activities';
    const resourceIcon = 'more_time';    

    const isLoading = (
        props.isAdditionalTimeActivityLoading 
    )

    return (
        <div>
            <SearchTable
                headers={['Name']}
                isLoading={!(!isLoading && props.additionalTimeActivityData)}
                skeletonRow={<ProductCategoryRowSkeleton/>}
                skeletonCount={props.perPage}
                count={props.additionalTimeActivityData ? props.additionalTimeActivityData.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.additionalTimeActivityData && props.additionalTimeActivityData.data.map((additionalTimeActivity, index) => 
                    <AdditionalTimeActivityRow 
                        additionalTimeActivity={additionalTimeActivity}
                        key={index}
                    />  
                )}
            />
            {(!isLoading && props.additionalTimeActivityData) && <PaginationNavigation
                data={props.additionalTimeActivityData.data}
                totalCount={props.additionalTimeActivityData.total_count}
                perPage={props.additionalTimeActivityData.pages.per_page}
                resourceName={resourceName}
                prefix="additional_time_activity"
            />}
        </div>
    )
}

export default AdditionalTimeActivityList