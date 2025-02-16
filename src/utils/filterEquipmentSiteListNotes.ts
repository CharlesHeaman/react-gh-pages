import { SiteListNoteResponseData } from '../types/siteListNotes.types';

const filterEquipmentSiteListNotes = (siteListNotes: Array<SiteListNoteResponseData>, equipment: number): Array<SiteListNoteResponseData> => {
    return siteListNotes.filter(siteListNote => siteListNote.data.equipment_id === equipment)
}

export default filterEquipmentSiteListNotes