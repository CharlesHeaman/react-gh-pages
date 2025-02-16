import { useSearchParams } from "react-router-dom"
import CreateButton from "../../../../components/form/CreateButton/CreateButton"
import QueryFilterSelect from "../../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../../components/form/SearchForm/SearchForm"
import ClearAdvancedSearchButton from "../../../../components/ui/ClearAdvancedSearchButton/ClearAdvancedSearchButton"
import HeaderFlex from "../../../../components/ui/HeaderFlex"
import clearCustomerAdvancedSearchParams from "../utils/clearCustomerAdvancedSearchParams"
import getCustomerAdvancedSearchParams from "../utils/getCustomerAdvancedSearchParams"
import getObjectHasValue from "../../../../utils/getObjectHasValue"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"
import OrderBySelect from "../../../../components/ui/PaginationNavigation/OrderBySelect"

const CustomerSearchHeader = (props: {
    showAdvancedSearch: () => void
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
    ];

    // Order By
    const orderByOptions = [
        {
            text: 'Code',
            iconFont: 'tag',
            value: 'code',
            selected: true
        },
        {
            text: 'Name',
            iconFont: 'groups',
            value: 'name'
        },
        {
            text: 'Type',
            iconFont: 'history_edu',
            value: 'is_contracted'
        },
        {
            text: 'Accounts Status',
            iconFont: 'payments',
            value: 'accounts_status'
        }
    ];

    const advancedParams = getCustomerAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    return (
        <>
            <HeaderFlex>
                <SearchForm
                    showAdvancedSearch={props.showAdvancedSearch}
                    placeHolder="Search all customers by code or name..."
                    prefix="customers"
                    hasAdvancedSearch={hasAdvancedSearch}
                />
                {hasAdvancedSearch ? 
                    <ClearAdvancedSearchButton 
                        clearFunc={() => clearCustomerAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                    /> : 
                    null
                }
                <OrderBySelect 
                    resourceName={'customers'}
                    selections={orderByOptions}
                />
                <QueryFilterSelect
                    selections={activeFilterOptions}
                    paramName="customers_is_active"
                />
                <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                    <CreateButton 
                        text={"Create Customer"} 
                        to={"customers/create"}
                    />
                </PermsProtectedComponent>
            </HeaderFlex>
        </>
    )
}

export default CustomerSearchHeader