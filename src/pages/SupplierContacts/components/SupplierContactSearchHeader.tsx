import { useSearchParams } from "react-router-dom";
import CreateButton from "../../../components/form/CreateButton/CreateButton";
import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect";
import SearchForm from "../../../components/form/SearchForm/SearchForm";
import ClearAdvancedSearchButton from "../../../components/ui/ClearAdvancedSearchButton/ClearAdvancedSearchButton";
import HeaderFlex from "../../../components/ui/HeaderFlex";
import getObjectHasValue from "../../../utils/getObjectHasValue";
import getSupplierContactAdvancedSearchParams from "../utils/SupplierContactAdvancedSearchParams";
import clearSupplierContactAdvancedSearchParams from "../utils/clearSupplierContactAdvancedSearchParams";
import PermsProtectedComponent from "../../../components/PermsProtectedComponent";

const SupplierContactSearchHeader = (props: {
    showAdvancedSearch: () => void,
    supplierManufacturerID?: number
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

    const advancedParams = getSupplierContactAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);
    
    return (
        <HeaderFlex>
            <SearchForm
                showAdvancedSearch={props.showAdvancedSearch}
                placeHolder="Search all contacts by name..."
                prefix="supplier_contacts"
                hasAdvancedSearch={hasAdvancedSearch}
            />
            {hasAdvancedSearch ? 
                <ClearAdvancedSearchButton 
                    clearFunc={() => clearSupplierContactAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                /> : 
                null
            }
            <QueryFilterSelect
                selections={activeFilterOptions}
                paramName="supplier_contacts_is_active"
            />
            <PermsProtectedComponent requiredPerms={{ stock: 2 }}>
                <CreateButton 
                    text={"Create Contact"} 
                    to={`supplier_contacts/create${props.supplierManufacturerID ? `?supplier_manufacturer_id=${props.supplierManufacturerID}` : ''}`}
                />
            </PermsProtectedComponent>
        </HeaderFlex>
    )
}

export default SupplierContactSearchHeader