import { Dispatch, SetStateAction } from "react";
import NewSelectMenu, { NewSelectItem } from "../../../components/form/NewSelectMenu/NewSelectMenu";
import Label from "../../../components/ui/General/Label/Label";
import getDispatchByTitle from "../utils/getDispatchByTitle";
import getDispatchByIcon from "../utils/getDispatchByIcon";

const DispatchBySelect = (props: {
    selectedDispatchBy: number,
    setSelectedDispatchBy: Dispatch<SetStateAction<number>>
}) => {

    const addSelection = (value: number) => {
        selectItems.push({
            icon: <Label 
                iconFont={getDispatchByIcon(value)}
                noBackground
            />,
            text: getDispatchByTitle(value),
            clickFunc: () => props.setSelectedDispatchBy(value),
            selected: props.selectedDispatchBy === value
        });
    }

    const selectItems: Array<NewSelectItem> = [];

    addSelection(3);
    addSelection(5);
    addSelection(4);
    addSelection(2);
    addSelection(9);

    return (
        <NewSelectMenu
            iconFont={getDispatchByIcon(props.selectedDispatchBy)}
            selectedText={getDispatchByTitle(props.selectedDispatchBy)}
            selectItems={selectItems}
        />
    )
}

export default DispatchBySelect