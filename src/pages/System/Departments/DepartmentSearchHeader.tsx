
import CreateButton from "../../../components/form/CreateButton/CreateButton"
import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../components/form/SearchForm/SearchForm"
import PermsProtectedComponent from "../../../components/PermsProtectedComponent"
import HeaderFlex from "../../../components/ui/HeaderFlex"

const DepartmentSearchHeader = () => {
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
                prefix="departments"
            />
            <QueryFilterSelect
                paramName="departments_is_active" 
                selections={activeFilterOptions}                            
            />
            <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                <CreateButton
                    text="Create Department"
                    to="system/departments/create"
                />
            </PermsProtectedComponent>
        </HeaderFlex>
    )
}

export default DepartmentSearchHeader