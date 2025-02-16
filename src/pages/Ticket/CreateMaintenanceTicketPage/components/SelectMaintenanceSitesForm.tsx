import { SiteCollectionResponse } from "../../../../types/sites.types"
import SiteSelectList from "../../../CustomerAdmin/Sites/components/SiteSelectList"
import { NewSelectItem } from "../../../CustomerAdmin/Sites/SitePage/components/SiteSideBar/components/SiteActions/components/SelectSiteAssignedContacts"

const SelectMaintenanceSitesForm = (props: {
    isSitesLoading: boolean,
    updateSelection: (siteID: number) => void,
    sitesData: SiteCollectionResponse | undefined,
    selectedSites: Array<NewSelectItem>
}) => {
    return (
        <SiteSelectList 
            hasSearched={true} 
            isSitesLoading={props.isSitesLoading}
            selectedIDs={props.selectedSites.filter(selectItem => selectItem.selected).map(selectItem => selectItem.id)}
            updateSelection={props.updateSelection}
            sites={props.sitesData}
            hideDepartment
            perPage={10}
        />
    )
}

export default SelectMaintenanceSitesForm