import Label from "../../../../../../components/ui/General/Label/Label";
import { TrackerSiteResponseData } from "../../../../../../types/trackerSites.types";

const getSiteLabel = (siteID: string, sites: Array<TrackerSiteResponseData>, homeSiteID: string, workSiteID: string | null) => {
    const siteName = sites.find((site) => site.id === siteID)?.data.name;
    switch (siteID) {
        case homeSiteID:
            return <Label text='Home' color="light-blue"/>
        case workSiteID:
            return siteName ? <Label text={siteName} color="dark-blue"/> : null
        default:
            return siteName ? <Label text={siteName} color='grey'/> : null
    }
}

export default getSiteLabel