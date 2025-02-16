import { useSearchParams } from "react-router-dom"
import CreateButton from "../../../../components/form/CreateButton/CreateButton"
import QueryFilterSelect from "../../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../../components/form/SearchForm/SearchForm"
import HeaderFlex from "../../../../components/ui/HeaderFlex"
import getObjectHasValue from "../../../../utils/getObjectHasValue"
import getEquipmentAdvancedSearchParams from "./getEquipmentAdvancedSearchParams"
import ClearAdvancedSearchButton from "../../../../components/ui/ClearAdvancedSearchButton/ClearAdvancedSearchButton"
import clearEquipmentAdvancedSearchParams from "../utils/clearEquipmentAdvancedSearchParams"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"
import OrderBySelect from "../../../../components/ui/PaginationNavigation/OrderBySelect"

const EquipmentSearchHeader = (props: {
    showAdvancedSearch: () => void,
    customerID?: number,
    siteID?: number,
    refrigerantID?: number,
    supplierID?: number,
    manufacturerID?: number
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

    // Order By
    const orderByOptions = [
        {
            text: 'Code',
            iconFont: 'tag',
            value: 'code',
            selected: true
        },
        {
            text: 'Site Name',
            iconFont: 'business',
            value: 'site_name'
        },
        {
            text: 'Equipment Type',
            iconFont: 'local_laundry_service',
            value: 'equipment_type_name'
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
            text: 'Model No.',
            iconFont: 'menu_book',
            value: 'model_number'
        },
        {
            text: 'Serial No..',
            iconFont: 'pin',
            value: 'serial_number'
        }
    ];

    const advancedParams = getEquipmentAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    return (
        <>
            <HeaderFlex>
                <SearchForm
                    showAdvancedSearch={props.showAdvancedSearch}
                    placeHolder="Search all equipment by code or description..."
                    prefix="equipment"
                    hasAdvancedSearch={hasAdvancedSearch}
                />
                {hasAdvancedSearch ? 
                    <ClearAdvancedSearchButton 
                        clearFunc={() => clearEquipmentAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                    /> : 
                    null
                }
                <OrderBySelect 
                    resourceName={'equipment'}
                    selections={orderByOptions}
                />
                <QueryFilterSelect 
                    selections={activeFilterOptions}
                    paramName={"equipment_is_active"} 
                />
                <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                    <CreateButton 
                        text={"Create Equipment Collection"} 
                        to={`equipment/create_collection${props.customerID ? `?customer_id=${props.customerID}` : ''}${props.siteID ? `?site_id=${props.siteID}` : ''}`}
                        iconFont="playlist_add"
                    />
                    <CreateButton 
                        text={"Create Equipment"} 
                        to={`equipment/create${props.customerID ? `?customer_id=${props.customerID}` : ''}${props.siteID ? `?site_id=${props.siteID}` : ''}${props.refrigerantID ? `?refrigerant_id=${props.refrigerantID}` : ''}${props.supplierID ? `?supplier_id=${props.supplierID}` : ''}${props.manufacturerID ? `?manufacturer_id=${props.manufacturerID}` : ''}`}
                    />
                </PermsProtectedComponent>
            </HeaderFlex>
        </>
    )
}

export default EquipmentSearchHeader