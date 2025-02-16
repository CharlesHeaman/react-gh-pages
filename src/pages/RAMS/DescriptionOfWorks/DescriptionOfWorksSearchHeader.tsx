import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../components/form/SearchForm/SearchForm"
import ShowCreateButton from "../../../components/form/ShowCreateButton/ShowCreateButton"
import PermsProtectedComponent from "../../../components/PermsProtectedComponent"
import HeaderFlex from "../../../components/ui/HeaderFlex"

const DescriptionOfWorksSearchHeader = (props: {
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
                    placeHolder="Search description of works by name..."
                    prefix="description_of_works"
                />
                <QueryFilterSelect
                    selections={activeFilterOptions}
                    paramName="description_of_works_is_active"
                />
                <PermsProtectedComponent requiredPerms={{ iso: 2 }}>
                    <ShowCreateButton 
                        text={"Create Description of Works"}
                        clickFunc={props.showCreate} 
                    />
                </PermsProtectedComponent>
            </HeaderFlex>
        </>
    )
}

export default DescriptionOfWorksSearchHeader