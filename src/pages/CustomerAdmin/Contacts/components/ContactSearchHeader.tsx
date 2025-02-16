import { useSearchParams } from "react-router-dom"
import CreateButton from "../../../../components/form/CreateButton/CreateButton"
import QueryFilterSelect from "../../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../../components/form/SearchForm/SearchForm"
import HeaderFlex from "../../../../components/ui/HeaderFlex"
import getObjectHasValue from "../../../../utils/getObjectHasValue"
import getContactAdvancedSearchParams from "../utils/getContactAdvancedSearchParams"
import ClearAdvancedSearchButton from "../../../../components/ui/ClearAdvancedSearchButton/ClearAdvancedSearchButton"
import clearContactAdvancedSearchParams from "../utils/clearContactAdvancedSearchParams"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"

const ContactSearchHeader = (props: {
    showAdvancedSearch: () => void,
    customerID?: number,
    siteID?: number
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

    const advancedParams = getContactAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);
    
    return (
        <>
            <HeaderFlex>
                <SearchForm
                    showAdvancedSearch={props.showAdvancedSearch}
                    placeHolder="Search all contacts by name..."
                    prefix="contacts"
                    hasAdvancedSearch={hasAdvancedSearch}
                />
                {hasAdvancedSearch ? 
                    <ClearAdvancedSearchButton 
                        clearFunc={() => clearContactAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                    /> : 
                    null
                }
                <QueryFilterSelect
                    selections={activeFilterOptions}
                    paramName="contacts_is_active"
                />
                <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                    <CreateButton 
                        text={"Create Contact"} 
                        to={`contacts/create${props.customerID ? `?customer_id=${props.customerID}` : ''}${props.siteID ? `?site_id=${props.siteID}` : ''}`}
                    />
                </PermsProtectedComponent>
            </HeaderFlex>
        </>
    )
}

export default ContactSearchHeader