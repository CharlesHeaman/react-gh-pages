import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect";
import HeaderFlex from "../../../components/ui/HeaderFlex";

const TicketListFilter = () => {

    // Filters
    const listTypeOptions = [
        {
            text: 'Unassigned',
            value: 0,
            iconFont: 'person_off',
            selected: true
        },
        {
            text: 'Further Action Required',
            value: 1,
            iconFont: 'request_quote',
            selected: false
        },
        {
            text: 'Awaiting Parts',
            value: 2,
            iconFont: 'inventory_2',
            selected: false
        },
        {
            text: 'RAMS Outstanding',
            value: 3,
            iconFont: 'assignment_late',
            selected: false
        }
    ]

    return (
        <QueryFilterSelect
            selections={listTypeOptions}
            paramName="ticket_list_type"
        />
    )
}

export default TicketListFilter