import { Dispatch, SetStateAction } from "react";
import FormErrorMessage from "../../../../../components/form/FormErrorMessage/FormErrorMessage";
import NewSelectMenu, { NewSelectItem } from "../../../../../components/form/NewSelectMenu/NewSelectMenu";
import Label from "../../../../../components/ui/General/Label/Label";
import getFGasTypeIcon from "../../../../Equipment/components/getFGasTypeIcon";
import getFGasTypeText from "../../../../Equipment/components/getFGasTypeText";

const FGasTypeSelect = (props: {
    selectedFGasType: number,
    setSelectedFGasType: Dispatch<SetStateAction<number>>,
    required?: boolean,
    hasSubmitted: boolean
}) => {

    const selectItems: Array<NewSelectItem> = [];

    for (let selectIndex = 0; selectIndex < 3; selectIndex++) {
        selectItems.push({
            icon: <Label 
                iconFont={getFGasTypeIcon(selectIndex)}
                noBackground
            />,
            text: getFGasTypeText(selectIndex),
            clickFunc: () => props.setSelectedFGasType(selectIndex),
            selected: props.selectedFGasType === selectIndex
        })
    }

    const showRequired = props.selectedFGasType === 0 && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont={getFGasTypeIcon(props.selectedFGasType)}
                selectedText={getFGasTypeText(props.selectedFGasType)}
                selectItems={selectItems}
            />
            {props.required && <FormErrorMessage 
                text={`F-gas type is required`}
                show={showRequired}
            />}
        </>
    )
}

export default FGasTypeSelect