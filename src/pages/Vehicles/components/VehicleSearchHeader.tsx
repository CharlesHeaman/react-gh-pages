import { useSearchParams } from "react-router-dom";
import CreateButton from "../../../components/form/CreateButton/CreateButton";
import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect";
import SearchForm from "../../../components/form/SearchForm/SearchForm";
import PermsProtectedComponent from "../../../components/PermsProtectedComponent";
import ClearAdvancedSearchButton from "../../../components/ui/ClearAdvancedSearchButton/ClearAdvancedSearchButton";
import HeaderFlex from "../../../components/ui/HeaderFlex";
import getObjectHasValue from "../../../utils/getObjectHasValue";
import getVehicleAdvancedSearchParams from "../VehicleListPage/utils/getVehicleAdvancedSearchParam";
import clearVehicleAdvancedSearchParams from "../VehicleListPage/utils/clearVehicleAdvancedSearchParam";


const VehicleSearchHeader = (props: {
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
    ]

    const advancedParams = getVehicleAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    return (
        <>
            <HeaderFlex>
                <SearchForm
                    showAdvancedSearch={props.showAdvancedSearch}
                    hasAdvancedSearch={hasAdvancedSearch}
                    placeHolder="Search by registration, make, model or assigned user..."
                    prefix="vehicles"
                />
                <QueryFilterSelect
                    selections={activeFilterOptions}
                    paramName="vehicles_is_active"
                />
                {hasAdvancedSearch ? 
                    <ClearAdvancedSearchButton 
                        clearFunc={() => clearVehicleAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                    /> : 
                    null
                }
                <PermsProtectedComponent requiredPerms={{ engineer_assets: 2 }}>
                    <CreateButton 
                        text="Create Vehicle"
                        to="vehicles/create"
                    />
                </PermsProtectedComponent>
            </HeaderFlex>
        </>
    )
}

export default VehicleSearchHeader