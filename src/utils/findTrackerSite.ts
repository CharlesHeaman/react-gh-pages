import { TrackerSiteResponseData } from "../types/trackerSites.types";

const findTrackerSite = (sites: Array<TrackerSiteResponseData>, siteID: string): TrackerSiteResponseData | undefined => {
    return sites.find(site => site.id === siteID);
}

export default findTrackerSite