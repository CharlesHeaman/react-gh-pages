import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../components/ui/SearchTable/SearchTable";
import { EquipmentCollectionResponse } from "../../../../types/equipment.types";
import findEquipmentType from "../../../../utils/findEquipmentType";
import EquipmentRow from "./EquipmentRow";
import EquipmentRowSkeleton from "./EquipmentRowSkeleton";
import getAPI from "../../../../utils/getAPI";
import { EquipmentTypeResponseData, EquipmentTypeCollectionResponse } from "../../../../types/equipmentType.types";
import SearchHelperText from "../../../../components/ui/SearchHelperText/SearchHelperText";
import { SiteCollectionResponse, SiteResponseData } from "../../../../types/sites.types";
import findSite from "../../../../utils/findSite";

const EquipmentList = (props: {
    hasSearched: boolean,
    isEquipmentLoading: boolean,
    equipment: EquipmentCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    hideSite?: boolean,
    hideType?: boolean
    showAdvancedSearch?: () => void
}) => {
    // Data States
    const [isEquipmentTypesLoading, setIsEquipmentTypesLoading] = useState(false);
    const [equipmentTypesData, setEquipmentTypesData] = useState<Array<EquipmentTypeResponseData>>([]);
    const [isSitesLoading, setIsSitesLoading] = useState(false);
    const [siteData, setSiteData] = useState<Array<SiteResponseData>>([]);

    // Resource Constants
    const resourceName = "equipment";
    const resourceIcon = "local_laundry_service";

    useEffect(() => {
        !props.hideType && setIsEquipmentTypesLoading(true);
        !props.hideSite && setIsSitesLoading(true)
    }, [props.isEquipmentLoading])

    useEffect(() => {
        if (props.equipment && props.equipment.data.length > 0) {
            !props.hideType && getEquipmentTypes([...new Set(props.equipment.data.map(equipment => equipment.data.equipment_type_id))]);
            !props.hideSite && getSites([...new Set(props.equipment.data.map(equipment => equipment.data.site_id))]);
        } else {
            !props.hideType && setIsEquipmentTypesLoading(false);
            !props.hideSite && setIsSitesLoading(false)
        }
    }, [props.equipment])

    const getEquipmentTypes = (equipmentTypeIDs: Array<number | null>) => {
        const idsArray = equipmentTypeIDs.filter(equipmentTypeID => equipmentTypeID !== null);
        getAPI('equipment_types', {
            ids: idsArray.length > 0 ? idsArray : [-1],
        }, (response: any) => {
            const equipmentTypeData: EquipmentTypeCollectionResponse = response.data;
            setEquipmentTypesData(equipmentTypeData.data);
        }, setIsEquipmentTypesLoading);
    }

    const getSites = (siteIDs: Array<number>) => {
        getAPI('sites', {
            ids: siteIDs
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSiteData(siteData.data)
        }, setIsSitesLoading)
    }

    const isLoading = (
        props.isEquipmentLoading || 
        isEquipmentTypesLoading ||
        isSitesLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Code', 'Site', 'Type', 'Location', 'Description', 'Model No.', 'Serial No.'];
        if (props.hideSite) {
            var headerIndex = tableHeader.indexOf('Site');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (props.hideType) {
            var headerIndex = tableHeader.indexOf('Type');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        return tableHeader
    }
    
    return (
        <div>
            {props.hasSearched ?
                <SearchTable
                    headers={getTableHeader()}
                    isLoading={!(!isLoading && props.equipment)}
                    skeletonRow={<EquipmentRowSkeleton hideSite={props.hideSite} hideType={props.hideType}/>}
                    skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                    count={props.equipment ? props.equipment.data.length : 0}
                    resourceName="equipment"
                    resourceIconFont="local_laundry_service"
                    body={props.equipment && props.equipment.data.map((equipment, index) => 
                        <EquipmentRow 
                            equipment={equipment}
                            equipmentType={equipment.data.equipment_type_id ? findEquipmentType(equipmentTypesData, equipment.data.equipment_type_id) : undefined}
                            site={findSite(siteData, equipment.data.site_id)}
                            hideSite={props.hideSite}
                            hideType={props.hideType}
                            key={index}
                        />  
                    )}
                />
                :
                props.showAdvancedSearch ? <SearchHelperText
                    iconFont={resourceIcon}
                    text="Search equipment by code or description"
                    showAdvanced={props.showAdvancedSearch}
                /> : null
            }
            {(!isLoading && props.hasSearched && props.equipment) && <PaginationNavigation
                data={props.equipment.data}
                totalCount={props.equipment.total_count}
                perPage={props.equipment.pages.per_page} 
                prefix="equipment"
                resourceName={resourceName} 
            />}
        </div>
    )
}

export default EquipmentList