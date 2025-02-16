import { Dispatch, SetStateAction } from "react";
import NewSelectMenu, { NewSelectItem } from "../../../components/form/NewSelectMenu/NewSelectMenu";
import getOwnerTypeIcon from "../components/getOwnerTypeIcon";
import Label from "../../../components/ui/General/Label/Label";
import getOwnerTypeText from "../components/getOwnerTypeText";
import FormErrorMessage from "../../../components/form/FormErrorMessage/FormErrorMessage";

const OwnerSelect = (props: {
    selectedOwner: number,
    setSelectedOwner: Dispatch<SetStateAction<number>>,
    required?: boolean,
    hasSubmitted: boolean
}) => {

    const selectItems: Array<NewSelectItem> = [];

    for (let selectIndex = 1; selectIndex < 3; selectIndex++) {
        selectItems.push({
            icon: <Label 
                iconFont={getOwnerTypeIcon(selectIndex)}
                noBackground
            />,
            text: getOwnerTypeText(selectIndex),
            clickFunc: () => props.setSelectedOwner(selectIndex),
            selected: props.selectedOwner === selectIndex
        })
    }

    const showRequired = props.selectedOwner === 0 && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont={getOwnerTypeIcon(props.selectedOwner)}
                selectedText={getOwnerTypeText(props.selectedOwner)}
                selectItems={selectItems}
            />
            {props.required && <FormErrorMessage 
                text={`Owner is required`}
                show={showRequired}
            />}
        </>
    )
}

export default OwnerSelect