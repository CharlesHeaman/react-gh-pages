import { useSearchParams } from "react-router-dom"
import CreateButton from "../../../../components/form/CreateButton/CreateButton"
import QueryFilterSelect from "../../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../../components/form/SearchForm/SearchForm"
import ClearAdvancedSearchButton from "../../../../components/ui/ClearAdvancedSearchButton/ClearAdvancedSearchButton"
import HeaderFlex from "../../../../components/ui/HeaderFlex"
import getObjectHasValue from "../../../../utils/getObjectHasValue"
import clearGasBottleAdvancedSearchParams from "./clearGasBottleAdvancedSearchParam"
import getGasBottleAdvancedSearchParams from "./getGasBottleAdvancedSearchParam"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"

const GasBottleSearchHeader = (props: {
    showAdvancedSearch: () => void,
    refrigerantID?: number,
    supplierID?: number,
    isConsumable?: boolean,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters
    const statusFilterOptions = [
        {
            text: 'Not Returned',
            value: 'not_returned',
            iconFont: 'inventory',
            selected: true
        },
        {
            text: 'Assigned',
            value: 'assigned',
            iconFont: 'assignment_ind',
        },
        {
            text: 'Unassigned',
            value: 'unassigned',
            iconFont: 'person_off',
        },
        {
            text: 'Returned',
            value: 'returned',
            iconFont: 'assignment_return',
        }
    ]
    const advancedParams = getGasBottleAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    return (
        <HeaderFlex>
            <SearchForm
                showAdvancedSearch={props.showAdvancedSearch}
                placeHolder="Search all gas bottles code or number..."
                prefix="gas_bottles"
                hasAdvancedSearch={hasAdvancedSearch}
            />
            {hasAdvancedSearch ? 
                <ClearAdvancedSearchButton 
                    clearFunc={() => clearGasBottleAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                /> : 
                null
            }
            <QueryFilterSelect 
                paramName={"gas_bottles_status"} 
                selections={statusFilterOptions}                        
            />
            {/* <CreateButton 
                text={"Create Collection"} 
                to={`gas_bottles/create_collection${props.refrigerantID ? `?refrigerant_id=${props.refrigerantID}` : ''}${props.supplierID ? `?supplier_id=${props.supplierID}` : ''}`}
                collection
            /> */}
            <PermsProtectedComponent requiredPerms={{ engineer_assets: 2 }}>
                <CreateButton 
                    text={"Return Bottles"} 
                    to={`${props.isConsumable ? 'gas_air_bottles' : 'refrigerant_bottles'}/process_return`}
                    iconFont="assignment_return"
                />
                <CreateButton 
                    text={"Queue Bottles for Return"} 
                    to={`${props.isConsumable ? 'gas_air_bottles' : 'refrigerant_bottles'}/queue_return`}
                    iconFont="playlist_add"
                />
                <CreateButton 
                    text={"Create Bottle"} 
                    to={`${props.isConsumable ? 'gas_air_bottles' : 'refrigerant_bottles'}/create${props.refrigerantID ? `?refrigerant_id=${props.refrigerantID}` : ''}${props.supplierID ? `?supplier_id=${props.supplierID}` : ''}`}
                />
            </PermsProtectedComponent>
        </HeaderFlex>
    )
}

export default GasBottleSearchHeader