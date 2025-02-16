import { EquipmentResponseData } from "../types/equipment.types";
import { SiteResponseData } from "../types/sites.types";

const countCustomerEquipment = (equipment: Array<EquipmentResponseData>, sites: Array<SiteResponseData>, customerID: number): number => {
    const siteIDs = sites.filter(site => site.data.customer_id === customerID).map(site => site.id);
    return equipment.filter(equipment => siteIDs.includes(equipment.data.site_id)).length;
}

export default countCustomerEquipment