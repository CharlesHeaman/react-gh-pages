import { Dispatch, SetStateAction } from "react";
import { EquipmentCollectionResponse } from "../../../../types/equipment.types";
import getAPI from "../../../../utils/getAPI";

const checkUniqueEquipmentCode = (
    code: string, 
    setCodeUnique: Dispatch<SetStateAction<boolean>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    equipmentID?: number,
) => {
    getAPI('equipment', {
        codes: [code]
    }, (response: any) => {
        const equipmentData: EquipmentCollectionResponse = response.data;
        const nonMatchingEquipmentID = equipmentData.data.filter(site => site.id !== equipmentID);
        setCodeUnique(nonMatchingEquipmentID.length === 0);
    }, setIsLoading)
}

export default checkUniqueEquipmentCode