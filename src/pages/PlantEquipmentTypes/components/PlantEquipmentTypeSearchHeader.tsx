import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../components/form/SearchForm/SearchForm"
import ShowCreateButton from "../../../components/form/ShowCreateButton/ShowCreateButton"
import PermsProtectedComponent from "../../../components/PermsProtectedComponent"
import HeaderFlex from "../../../components/ui/HeaderFlex"

const PlantEquipmentTypeSearchHeader = (props: {
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
                    placeHolder="Search type by name..."
                    prefix="plant_equipment_type"
                />
                <QueryFilterSelect
                    paramName="plant_equipment_type_is_active" 
                    selections={activeFilterOptions}                            
                />
                <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                    <ShowCreateButton
                        text="Create Plant/Tools Type"
                        clickFunc={props.showCreate}
                    />
                </PermsProtectedComponent>
            </HeaderFlex>
        </>
    )
}

export default PlantEquipmentTypeSearchHeader