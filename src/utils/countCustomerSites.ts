import { SiteResponseData } from "../types/sites.types"

const countCustomerSites = (sites: Array<SiteResponseData>, customerID: number): number => {
    return sites.filter(site => site.data.customer_id === customerID).length;
}

export default countCustomerSites