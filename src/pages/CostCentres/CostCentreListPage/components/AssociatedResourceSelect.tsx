import { Dispatch, SetStateAction } from "react";
import NewSelectMenu, { NewSelectItem } from "../../../../components/form/NewSelectMenu/NewSelectMenu";
import Label from "../../../../components/ui/General/Label/Label";
import getAssociatedResourceTypeIcon from "../../utils/getAssociatedResourceTypeIcon";
import getAssociatedResourceTypeName from "../../utils/getAssociatedResourceTypeName";
import FormErrorMessage from "../../../../components/form/FormErrorMessage/FormErrorMessage";

const AssociatedResourceSelect = (props: {
    selectedAssociatedResource: number,
    setSelectedAssociatedResource: Dispatch<SetStateAction<number>>,
    required?: boolean,
    hasSubmitted: boolean
}) => {

    const selectItems: Array<NewSelectItem> = [];

    for (let selectIndex = 0; selectIndex < 6; selectIndex++) {
        selectItems.push({
            icon: <Label 
                iconFont={getAssociatedResourceTypeIcon(selectIndex)}
                noBackground
            />,
            text: getAssociatedResourceTypeName(selectIndex),
            clickFunc: () => props.setSelectedAssociatedResource(selectIndex),
            selected: props.selectedAssociatedResource === selectIndex
        })
    }

    const showRequired = props.selectedAssociatedResource === 0 && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont={getAssociatedResourceTypeIcon(props.selectedAssociatedResource)}
                selectedText={getAssociatedResourceTypeName(props.selectedAssociatedResource)}
                selectItems={selectItems}
            />
            {props.required && <FormErrorMessage 
                text={`Associated resource is required`}
                show={showRequired}
            />}
        </>
    )
}

export default AssociatedResourceSelect