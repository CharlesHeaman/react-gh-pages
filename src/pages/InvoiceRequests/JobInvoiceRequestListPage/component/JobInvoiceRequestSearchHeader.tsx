import { useSearchParams } from "react-router-dom"
import QueryFilterSelect from "../../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../../components/form/SearchForm/SearchForm"
import ClearAdvancedSearchButton from "../../../../components/ui/ClearAdvancedSearchButton/ClearAdvancedSearchButton"
import HeaderFlex from "../../../../components/ui/HeaderFlex"
import getObjectHasValue from "../../../../utils/getObjectHasValue"
import clearJobInvoiceRequestAdvancedSearchParams from "../utils/clearJobInvoiceRequestAdvancedSearchParams"
import getJobInvoiceRequestAdvancedSearchParams from "../utils/getJobInvoiceRequestAdvancedSearchParams"

const JobInvoiceRequestSearchHeader = (props: {
    showAdvancedSearch: () => void,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters
    const statusFilterOptions = [
        {
            text: 'Outstanding',
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

    const advancedParams = getJobInvoiceRequestAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);
    
    return (
        <>
            <HeaderFlex>
                <SearchForm
                    showAdvancedSearch={props.showAdvancedSearch}
                    placeHolder="Search all job invoice requests by request id..."
                    prefix="job_invoice_requests"
                    hasAdvancedSearch={hasAdvancedSearch}
                />
                {hasAdvancedSearch ? 
                    <ClearAdvancedSearchButton 
                        clearFunc={() => clearJobInvoiceRequestAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                    /> : 
                    null
                }
                <QueryFilterSelect
                    selections={statusFilterOptions}
                    paramName="job_invoice_requests_is_processed"
                />
            </HeaderFlex>
        </>
    )
}

export default JobInvoiceRequestSearchHeader