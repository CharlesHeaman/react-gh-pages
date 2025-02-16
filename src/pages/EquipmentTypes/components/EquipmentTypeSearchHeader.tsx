import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../components/form/SearchForm/SearchForm"
import ShowCreateButton from "../../../components/form/ShowCreateButton/ShowCreateButton"
import PermsProtectedComponent from "../../../components/PermsProtectedComponent"
import HeaderFlex from "../../../components/ui/HeaderFlex"

const EquipmentTypeSearchHeader = (props: {
    showCreate?: () => void
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
                placeHolder="Search equipment type by name..."
                prefix="equipment_types"
            />
            <QueryFilterSelect
                paramName="equipment_types_is_active" 
                selections={activeFilterOptions}                            
            />
            <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                {props.showCreate ? <ShowCreateButton
                    text="Create Equipment Type"
                    clickFunc={props.showCreate}
                /> : null}
            </PermsProtectedComponent>
        </HeaderFlex>
    )
}

export default EquipmentTypeSearchHeader