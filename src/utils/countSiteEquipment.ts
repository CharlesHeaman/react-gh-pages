import { EquipmentResponseData } from "../types/equipment.types";

const countSiteEquipment = (equipment: Array<EquipmentResponseData>, siteID: number): number => {
    return equipment.filter(equipment => equipment.data.site_id === siteID).length;
}

export default countSiteEquipment