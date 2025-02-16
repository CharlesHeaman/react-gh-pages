import { Dispatch, SetStateAction } from "react";
import NewSelectMenu, { NewSelectItem } from "../../../../../../../components/form/NewSelectMenu/NewSelectMenu";
import Label from "../../../../../../../components/ui/General/Label/Label";

const TimeTypeSelect = (props: {
    selectedLabourType: number,
    setSelectedLabourType: Dispatch<SetStateAction<number>>
}) => {

    const selectItems: Array<NewSelectItem> = [
        {
            icon: <Label
                iconFont="person"
                hideText
                noBackground
            />,
            text: 'Engineer',
            clickFunc: () => props.setSelectedLabourType(0),
            selected: props.selectedLabourType === 0
        },
        {
            icon: <Label
                iconFont="person_add"
                hideText
                noBackground
            />,
            text: 'Mate',
            clickFunc: () => props.setSelectedLabourType(1),
            selected: props.selectedLabourType === 1
        }
    ];

    return (
        <NewSelectMenu
            iconFont={props.selectedLabourType === 0 ? 'person' : 'person_add'}
            selectedText={props.selectedLabourType === 0 ? 'Engineer' : 'Mate'}
            selectItems={selectItems}
        />
    )
}

export default TimeTypeSelect