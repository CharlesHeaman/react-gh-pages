import { Dispatch, SetStateAction } from "react";
import NewSelectMenu, { NewSelectItem } from "../../../../../../../../components/form/NewSelectMenu/NewSelectMenu";
import Label from "../../../../../../../../components/ui/General/Label/Label";
import getPlantEquipmentDocumentIcon from "../../../../../utils/plantEquipmentDocumentIcon";
import getPlantEquipmentDocumentText from "../../../../../utils/plantEquipmentDocumentText";

const PlantEquipmentDocumentTypeSelect = (props: {
    selectedType: number,
    setSelectedType: Dispatch<SetStateAction<number>>
}) => {

    const selectItems: Array<NewSelectItem> = [];

    const addItemToSelectItems = (value: number) => {
        selectItems.push({
            icon: <Label 
                iconFont={getPlantEquipmentDocumentIcon(value)}
                noBackground
            />,
            text: getPlantEquipmentDocumentText(value),
            clickFunc: () => props.setSelectedType(value),
            selected: props.selectedType === value
        })
    }

    addItemToSelectItems(0);
    addItemToSelectItems(1);
    addItemToSelectItems(2);
    addItemToSelectItems(3);

    return (
        <NewSelectMenu
            iconFont={getPlantEquipmentDocumentIcon(props.selectedType)}
            selectedText={getPlantEquipmentDocumentText(props.selectedType)}
            selectItems={selectItems}
        />
    )
}

export default PlantEquipmentDocumentTypeSelect