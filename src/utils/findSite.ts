import { SiteResponseData } from './../types/sites.types';

const findSite = (sites: Array<SiteResponseData>, siteID: number) => {
    return sites.find(site => site.id === siteID)
}

export default findSite