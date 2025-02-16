import { Dispatch, SetStateAction } from "react";
import NewSelectMenu, { NewSelectItem } from "../../../../../../../components/form/NewSelectMenu/NewSelectMenu";
import Label from "../../../../../../../components/ui/General/Label/Label";
import getSupplierManufacturerDocumentIcon from "../../../../../utils/getSupplierManufacturerDocumentIcon";
import getSupplierManufacturerDocumentText from "../../../../../utils/getSupplierManufacturerDocumentText";

const SupplierManufacturerDocumentTypeSelect = (props: {
    selectedType: number,
    setSelectedType: Dispatch<SetStateAction<number>>
}) => {

    const selectItems: Array<NewSelectItem> = [];

    const addItemToSelectItems = (value: number) => {
        selectItems.push({
            icon: <Label 
                iconFont={getSupplierManufacturerDocumentIcon(value)}
                noBackground
            />,
            text: getSupplierManufacturerDocumentText(value),
            clickFunc: () => props.setSelectedType(value),
            selected: props.selectedType === value
        })
    }

    addItemToSelectItems(1);
    addItemToSelectItems(2);
    addItemToSelectItems(3);

    return (
        <NewSelectMenu
            iconFont={getSupplierManufacturerDocumentIcon(props.selectedType)}
            selectedText={getSupplierManufacturerDocumentText(props.selectedType)}
            selectItems={selectItems}
        />
    )
}

export default SupplierManufacturerDocumentTypeSelect