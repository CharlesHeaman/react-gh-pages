import { useSearchParams } from "react-router-dom"
import CreateButton from "../../../../components/form/CreateButton/CreateButton"
import QueryFilterSelect from "../../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../../components/form/SearchForm/SearchForm"
import ClearAdvancedSearchButton from "../../../../components/ui/ClearAdvancedSearchButton/ClearAdvancedSearchButton"
import HeaderFlex from "../../../../components/ui/HeaderFlex"
import getSiteAdvancedSearchParams from "../utils/getSiteAdvancedSearchParams"
import clearSiteAdvancedSearchParams from "./clearSiteAdvancedSearchParams"
import getObjectHasValue from "../../../../utils/getObjectHasValue"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"
import OrderBySelect from "../../../../components/ui/PaginationNavigation/OrderBySelect"

const SiteSearchHeader = (props: {
    showAdvancedSearch: () => void,
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
            text: 'Customer Name',
            iconFont: 'groups',
            value: 'customer_name'
        },
        {
            text: 'Name',
            iconFont: 'business',
            value: 'name'
        },
        {
            text: 'Location',
            iconFont: 'location_on',
            value: 'location'
        },
        {
            text: 'Description',
            iconFont: 'notes',
            value: 'description'
        },
        {
            text: 'Department',
            iconFont: 'dashboard',
            value: 'department_id'
        },
        {
            text: 'Contract Ref No.',
            iconFont: 'history_edu',
            value: 'contract_reference_number'
        }
    ];

    const advancedParams = getSiteAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    return (
        <>
            <HeaderFlex>
                <SearchForm
                    showAdvancedSearch={props.showAdvancedSearch}
                    placeHolder="Search all sites by code or name..."
                    prefix="sites"
                    hasAdvancedSearch={hasAdvancedSearch}
                />
                {hasAdvancedSearch ? 
                    <ClearAdvancedSearchButton 
                        clearFunc={() => clearSiteAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                    /> : 
                    null
                }
                <OrderBySelect 
                    resourceName={'sites'}
                    selections={orderByOptions}
                />
                <QueryFilterSelect
                    selections={activeFilterOptions}
                    paramName="sites_is_active"
                />
                <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                    <CreateButton 
                        text={"Create Site"} 
                        to={`sites/create${props.customerID ? `?customer_id=${props.customerID}` : ''}`}
                    />
                </PermsProtectedComponent>
            </HeaderFlex>
        </>
    )
}

export default SiteSearchHeader