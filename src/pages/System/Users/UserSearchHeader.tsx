import CreateButton from "../../../components/form/CreateButton/CreateButton"
import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../components/form/SearchForm/SearchForm"
import PermsProtectedComponent from "../../../components/PermsProtectedComponent"
import HeaderFlex from "../../../components/ui/HeaderFlex"

const UserSearchHeader = () => {
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
    ];

    return (
        <>
            <HeaderFlex>
                <SearchForm
                    placeHolder="Search all users by name..."
                    prefix="users"
                />
                <QueryFilterSelect
                    selections={activeFilterOptions}
                    paramName="users_is_active"
                />
                <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                    <CreateButton 
                        text={"Create User"} 
                        to={"system/users/create"}
                    />
                </PermsProtectedComponent>
            </HeaderFlex>
        </>
    )
}

export default UserSearchHeader