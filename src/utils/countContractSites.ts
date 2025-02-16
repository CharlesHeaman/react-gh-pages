import { SiteResponseData } from "../types/sites.types"

const countContractSites = (sites: Array<SiteResponseData>, contractID: number): number => {
    return sites.filter(site => site.data.contract_id === contractID).length;
}

export default countContractSites