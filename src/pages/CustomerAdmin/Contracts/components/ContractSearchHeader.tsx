import { useSearchParams } from "react-router-dom"
import CreateButton from "../../../../components/form/CreateButton/CreateButton"
import QueryFilterSelect from "../../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../../components/form/SearchForm/SearchForm"
import HeaderFlex from "../../../../components/ui/HeaderFlex"
import getContractAdvancedSearchParams from "../utils/getContractAdvancedSearchParams"
import getObjectHasValue from "../../../../utils/getObjectHasValue"
import ClearAdvancedSearchButton from "../../../../components/ui/ClearAdvancedSearchButton/ClearAdvancedSearchButton"
import clearContractAdvancedSearchParams from "../utils/clearContractAdvancedSearchParams"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"

const ContractSearchHeader = (props: {
    showAdvancedSearch: () => void
    customerID?: number,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

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

    const advancedParams = getContractAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    return (
        <>
            <HeaderFlex>
                <SearchForm
                    showAdvancedSearch={props.showAdvancedSearch}
                    placeHolder="Search all contracts by reference number..."
                    prefix="contracts"
                    hasAdvancedSearch={hasAdvancedSearch}
                />
                {hasAdvancedSearch ? 
                    <ClearAdvancedSearchButton 
                        clearFunc={() => clearContractAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                    /> : 
                    null
                }
                <QueryFilterSelect
                    selections={activeFilterOptions}
                    paramName="contracts_is_active"
                />
                <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                    <CreateButton 
                        text={"Create Contracts"} 
                        to={`contracts/create${props.customerID ? `?customer_id=${props.customerID}` : ''}`}
                    />
                </PermsProtectedComponent>
            </HeaderFlex>
        </>
    )
}

export default ContractSearchHeader