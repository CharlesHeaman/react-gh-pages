import CreateButton from "../../components/form/CreateButton/CreateButton"
import QueryFilterSelect from "../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../components/form/SearchForm/SearchForm"
import ShowCreateButton from "../../components/form/ShowCreateButton/ShowCreateButton"
import PermsProtectedComponent from "../../components/PermsProtectedComponent"
import HeaderFlex from "../../components/ui/HeaderFlex"

const RefrigerantSearchHeader = (props: {
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
                <SearchForm
                    placeHolder="Search by name or common name..."
                    prefix="refrigerants"
                />
                <QueryFilterSelect
                    selections={activeFilterOptions}
                    paramName="refrigerants_is_active"
                />
                <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                    <ShowCreateButton 
                        text="Create Refrigerant, Gas/Air" 
                        clickFunc={props.showCreate}
                    />
                </PermsProtectedComponent>
            </HeaderFlex>
        </>
    )
}

export default RefrigerantSearchHeader