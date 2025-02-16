import QueryFilterSelect from "../../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../../components/form/SearchForm/SearchForm"
import HeaderFlex from "../../../../components/ui/HeaderFlex"

const EngineerEquipmentDetailsSearchHeader = () => {

    // Filters
    const isProcessedFilter = [
        {
            text: 'Pending',
            value: false,
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
                    placeHolder="Search by details id..."
                    prefix="engineer_equipment_details"
                />
                <QueryFilterSelect
                    selections={isProcessedFilter}
                    paramName="engineer_equipment_details_is_processed"
                />
            </HeaderFlex>
        </>
    )
}

export default EngineerEquipmentDetailsSearchHeader