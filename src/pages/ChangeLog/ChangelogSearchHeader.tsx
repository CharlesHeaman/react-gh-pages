import QueryFilterSelect from "../../components/form/QueryFilterSelect/QueryFilterSelect";
import SearchForm from "../../components/form/SearchForm/SearchForm";
import HeaderFlex from "../../components/ui/HeaderFlex";

const ChangelogSearchHeader = () => {
    // Filters
    const systemFilterOptions = [
        {
            text: 'All',
            value: undefined,
            iconFont: 'public',
            selected: true
        }, 
        {
            text: 'Admin',
            value: [1],
            iconFont: 'keyboard'
        },
        {
            text: 'Mobile',
            value: [0],
            iconFont: 'phone_android'
        },
        {
            text: 'API',
            value: [2],
            iconFont: 'api'
        }
    ]
    
    return (
        <>
            <HeaderFlex>
                <SearchForm
                    placeHolder="Search by title or description..."
                    prefix="change"
                />
                <QueryFilterSelect
                    selections={systemFilterOptions}
                    paramName="change_is_active"
                />
            </HeaderFlex>
        </>
    )
}

export default ChangelogSearchHeader