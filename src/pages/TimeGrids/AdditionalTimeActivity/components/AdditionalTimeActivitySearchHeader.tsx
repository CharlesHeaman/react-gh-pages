import QueryFilterSelect from "../../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../../components/form/SearchForm/SearchForm"
import ShowCreateButton from "../../../../components/form/ShowCreateButton/ShowCreateButton"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"
import HeaderFlex from "../../../../components/ui/HeaderFlex"

const AdditionalTimeActivitySearchHeader = (props: {
    showCreate: () => void
}) => {
    // Filters
    const activeFilterOptions = [
        {
            text: 'Active',
            value: true,
            iconFont: 'check_circle',
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
                <QueryFilterSelect
                    paramName="additional_time_activity_is_active" 
                    selections={activeFilterOptions}                            
                />
                <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                    <ShowCreateButton
                        text="Create Activity"
                        clickFunc={props.showCreate}
                    />
                </PermsProtectedComponent>
            </HeaderFlex>
            <HeaderFlex>
                <SearchForm
                    placeHolder="Search activities by name..."
                    prefix="additional_time_activity"
                />
            </HeaderFlex>
        </>
    )
}

export default AdditionalTimeActivitySearchHeader