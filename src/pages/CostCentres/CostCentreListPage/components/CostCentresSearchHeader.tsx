import QueryFilterSelect from "../../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../../components/form/SearchForm/SearchForm"
import ShowCreateButton from "../../../../components/form/ShowCreateButton/ShowCreateButton"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"
import HeaderFlex from "../../../../components/ui/HeaderFlex"

const CostCentreSearchHeader = (props: {
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
        <HeaderFlex>
            <SearchForm
                placeHolder="Search by name..."
                prefix="cost_centres"
            />
            <QueryFilterSelect
                paramName="cost_centres_is_active" 
                selections={activeFilterOptions}                            
            />
            <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                <ShowCreateButton
                    text="Create Cost Centre"
                    clickFunc={props.showCreate}
                />
            </PermsProtectedComponent>
        </HeaderFlex>
    )
}

export default CostCentreSearchHeader