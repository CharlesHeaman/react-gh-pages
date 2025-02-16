import { useSearchParams } from "react-router-dom"
import CreateButton from "../../../../components/form/CreateButton/CreateButton"
import QueryFilterSelect from "../../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../../components/form/SearchForm/SearchForm"
import ClearAdvancedSearchButton from "../../../../components/ui/ClearAdvancedSearchButton/ClearAdvancedSearchButton"
import HeaderFlex from "../../../../components/ui/HeaderFlex"
import getObjectHasValue from "../../../../utils/getObjectHasValue"
import clearPlantEquipmentAdvancedSearchParams from "../../utils/clearPlantEquipmentAdvancedSerachParams"
import getPlantEquipmentAdvancedSearchParams from "./getPlantEquipmentAdvancedSearchParams"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"

const PlantEquipmentSearchHeader = (props: {
    showAdvancedSearch: () => void,
    manufacturerID?: number,
    hideFilters?: boolean,
    hideCreate?: boolean
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters
    const typeSelectOptions = [
        {
            text: 'All',
            value: undefined,
            iconFont: 'public',
            selected: true
        },
        {
            text: 'PAT',
            value: 'pat',
            iconFont: 'domain_verification',
        },
        {
            text: 'Calibration',
            value: 'calibration',
            iconFont: 'compass_calibration',
        },
        {
            text: 'Inspection',
            value: 'inspection',
            iconFont: 'assignment_turned_in',
        },
        {
            text: 'Maintenance',
            value: 'maintenance',
            iconFont: 'home_repair_service',
        }
    ]


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

    const advancedParams = getPlantEquipmentAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);
    
    return (
        <>
            <HeaderFlex>
                <SearchForm
                    showAdvancedSearch={props.showAdvancedSearch}
                    placeHolder="Search plant/tools by description..."
                    prefix="plant_equipment"
                    hasAdvancedSearch={hasAdvancedSearch}
                />
                {hasAdvancedSearch ? 
                    <ClearAdvancedSearchButton 
                        clearFunc={() => clearPlantEquipmentAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                    /> : 
                    null
                }
                {!props.hideFilters && <>
                    <QueryFilterSelect
                        selections={typeSelectOptions} 
                        paramName={"plant_equipment_type"}                        
                    />
                    <QueryFilterSelect
                        selections={activeFilterOptions}
                        paramName="plant_equipment_is_active"
                    />
                </>}
                <PermsProtectedComponent requiredPerms={{ engineer_assets: 2 }}>
                    {!props.hideCreate && <CreateButton 
                        text={"Create Plant/Tools"} 
                        to={`plant_and_equipment/create${props.manufacturerID ? `?manufacturer_id=${props.manufacturerID}` : ''}`}
                    />}
                </PermsProtectedComponent>
            </HeaderFlex>
            
        </>
    )
}

export default PlantEquipmentSearchHeader