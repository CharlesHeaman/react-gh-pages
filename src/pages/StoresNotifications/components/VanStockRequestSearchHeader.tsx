import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../components/form/SearchForm/SearchForm"
import HeaderFlex from "../../../components/ui/HeaderFlex"

const VanStockRequestSearchHeader = () => {
    // Filters
    const statusFilterOptions = [
        {
            text: 'Pending',
            value: 0,
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
                    placeHolder="Search Van Replenishment Requests by request id..."
                    prefix="stores_notifications"
                />
                <QueryFilterSelect
                    paramName="stores_notifications_status" 
                    selections={statusFilterOptions}                            
                />
            </HeaderFlex>
        </>
    )
}

export default VanStockRequestSearchHeader