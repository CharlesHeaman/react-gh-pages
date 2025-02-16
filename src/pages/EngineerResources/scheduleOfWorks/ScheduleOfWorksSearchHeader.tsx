import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../components/form/SearchForm/SearchForm"
import ShowCreateButton from "../../../components/form/ShowCreateButton/ShowCreateButton"
import HeaderFlex from "../../../components/ui/HeaderFlex"

const ScheduleOfWorksSearchHeader = (props: {
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
                    placeHolder="Search schedule of works documents by name..."
                    prefix="schedule_of_works"
                />
                <QueryFilterSelect
                    selections={activeFilterOptions}
                    paramName="schedule_of_works_is_active"
                />
                <ShowCreateButton
                    text="Upload Document"
                    clickFunc={props.showCreate}
                    isUpload
                />
            </HeaderFlex>
        </>
    )
}

export default ScheduleOfWorksSearchHeader