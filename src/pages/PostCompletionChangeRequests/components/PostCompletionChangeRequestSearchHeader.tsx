import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../components/form/SearchForm/SearchForm"
import HeaderFlex from "../../../components/ui/HeaderFlex"

const PostCompletionChangeRequestsSearchHeader = () => {

    // Filters
    const isProcessedFilter = [
        {
            text: 'Pending',
            value: true,
            iconFont: 'pending',
            selected: true
        },
        {
            text: 'All',
            value: undefined,
            iconFont: 'public',
        }
    ]

    return (
        <>
            <HeaderFlex>
                <SearchForm
                    placeHolder="Search by request id..."
                    prefix="post_completion_change_requests"
                />
                <QueryFilterSelect
                    selections={isProcessedFilter}
                    paramName="post_completion_change_requests_is_pending"
                />
            </HeaderFlex>
        </>
    )
}

export default PostCompletionChangeRequestsSearchHeader