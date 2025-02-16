import { SiteContactResponseData } from "../types/siteContact.types";

const countSiteContacts = (siteContacts: Array<SiteContactResponseData>, siteID: number): number => {
    return siteContacts.filter(siteContact => siteContact.data.site_id === siteID).length;
}

export default countSiteContacts