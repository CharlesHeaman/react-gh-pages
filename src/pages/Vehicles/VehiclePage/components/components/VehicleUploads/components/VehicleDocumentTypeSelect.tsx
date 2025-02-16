import { Dispatch, SetStateAction } from "react";
import NewSelectMenu, { NewSelectItem } from "../../../../../../../components/form/NewSelectMenu/NewSelectMenu";
import Label from "../../../../../../../components/ui/General/Label/Label";
import getVehicleDocumentIcon from "../../../../../utils/getVehicleDocumentIcon";
import getVehicleDocumentText from "../../../../../utils/getVehicleDocumentText";

const VehicleDocumentTypeSelect = (props: {
    selectedType: number,
    setSelectedType: Dispatch<SetStateAction<number>>
}) => {

    const selectItems: Array<NewSelectItem> = [];

    const addItemToSelectItems = (value: number) => {
        selectItems.push({
            icon: <Label 
                iconFont={getVehicleDocumentIcon(value)}
                noBackground
            />,
            text: getVehicleDocumentText(value),
            clickFunc: () => props.setSelectedType(value),
            selected: props.selectedType === value
        })
    }

    addItemToSelectItems(0);
    addItemToSelectItems(1);
    addItemToSelectItems(2);

    return (
        <NewSelectMenu
            iconFont={getVehicleDocumentIcon(props.selectedType)}
            selectedText={getVehicleDocumentText(props.selectedType)}
            selectItems={selectItems}
        />
    )
}

export default VehicleDocumentTypeSelect