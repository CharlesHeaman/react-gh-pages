import { useSearchParams } from "react-router-dom"
import QueryFilterSelect from "../../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../../components/form/SearchForm/SearchForm"
import ClearAdvancedSearchButton from "../../../../components/ui/ClearAdvancedSearchButton/ClearAdvancedSearchButton"
import HeaderFlex from "../../../../components/ui/HeaderFlex"
import getObjectHasValue from "../../../../utils/getObjectHasValue"
import getTicketInvoiceRequestAdvancedSearchParams from "../utils/getTicketInvoiceRequestAdvancedSearchParams"
import clearTicketInvoiceRequestAdvancedSearchParams from "../../JobInvoiceRequestListPage/utils/clearJobInvoiceRequestAdvancedSearchParams"

const TicketInvoiceRequestSearchHeader = (props: {
    showAdvancedSearch: () => void,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters
    const statusFilterOptions = [
        {
            text: 'Outstanding',
            value: 'outstanding',
            iconFont: 'pending',
            selected: true
        },
        {
            text: 'Awaiting Approval',
            value: 'awaiting_approval',
            iconFont: 'hourglass_empty',
        },
        {
            text: 'Holding',
            value: 'holding',
            iconFont: 'pan_tool',
        },
        {
            text: 'All',
            value: undefined,
            iconFont: 'public',
        }
    ]

    const advancedParams = getTicketInvoiceRequestAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);
    
    return (
        <>
            <HeaderFlex>
                <SearchForm
                    showAdvancedSearch={props.showAdvancedSearch}
                    placeHolder="Search all ticket invoice requests by request id..."
                    prefix="ticket_invoice_requests"
                    hasAdvancedSearch={hasAdvancedSearch}
                />
                {hasAdvancedSearch ? 
                    <ClearAdvancedSearchButton 
                        clearFunc={() => clearTicketInvoiceRequestAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                    /> : 
                    null
                }
                <QueryFilterSelect
                    selections={statusFilterOptions}
                    paramName="ticket_invoice_requests_status"
                />
            </HeaderFlex>
        </>
    )
}

export default TicketInvoiceRequestSearchHeader