import { Dispatch, SetStateAction } from "react";
import FormErrorMessage from "../../../components/form/FormErrorMessage/FormErrorMessage";
import NewSelectMenu, { NewSelectItem } from "../../../components/form/NewSelectMenu/NewSelectMenu";
import Label from "../../../components/ui/General/Label/Label";
import getEnergySourceIcon from "../../Equipment/components/getEnergySourceIcon";
import getEnergySourceText from "../../Equipment/components/getEnergySourceText";

const EnergySourceSelect = (props: {
    selectedEnergySource: number | null,
    setSelectedEnergySource: Dispatch<SetStateAction<number | null>>,
    required?: boolean,
    hasSubmitted: boolean
}) => {

    const selectItems: Array<NewSelectItem> = [{
        icon: <Label 
            iconFont={getEnergySourceIcon(null)}
            noBackground
        />,
        text: getEnergySourceText(null),
        clickFunc: () => props.setSelectedEnergySource(null),
        selected: props.selectedEnergySource === null
    }];

    for (let selectIndex = 0; selectIndex < 4; selectIndex++) {
        selectItems.push({
            icon: <Label 
                iconFont={getEnergySourceIcon(selectIndex)}
                noBackground
            />,
            text: getEnergySourceText(selectIndex),
            clickFunc: () => props.setSelectedEnergySource(selectIndex),
            selected: props.selectedEnergySource === selectIndex
        })
    }

    const showRequired = props.selectedEnergySource === 0 && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont={getEnergySourceIcon(props.selectedEnergySource)}
                selectedText={getEnergySourceText(props.selectedEnergySource)}
                selectItems={selectItems}
            />
            {props.required && <FormErrorMessage 
                text={`Certification body is required`}
                show={showRequired}
            />}
        </>
    )
}

export default EnergySourceSelect