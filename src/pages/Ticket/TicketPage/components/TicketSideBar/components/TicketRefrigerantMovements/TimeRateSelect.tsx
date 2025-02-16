import { Dispatch, SetStateAction } from "react";
import NewSelectMenu, { NewSelectItem } from "../../../../../../../components/form/NewSelectMenu/NewSelectMenu";
import Label from "../../../../../../../components/ui/General/Label/Label";

const TimeRateSelect = (props: {
    selectedLabourRate: number,
    setSelectedLabourRate: Dispatch<SetStateAction<number>>
}) => {

    const selectItems: Array<NewSelectItem> = [
        {
            icon: <Label
                iconFont="timer"
                hideText
                noBackground
            />,
            text: 'Normal',
            clickFunc: () => props.setSelectedLabourRate(0),
            selected: props.selectedLabourRate === 0
        },
        {
            icon: <Label
                iconFont="more_time"
                hideText
                noBackground
            />,
            text: 'Overtime',
            clickFunc: () => props.setSelectedLabourRate(1),
            selected: props.selectedLabourRate === 1
        },
        {
            icon: <Label
                iconFont="looks_two"
                hideText
                noBackground
            />,
            text: 'Double Time',
            clickFunc: () => props.setSelectedLabourRate(2),
            selected: props.selectedLabourRate === 2
        }
    ];

    return (
        <NewSelectMenu
            iconFont={props.selectedLabourRate === 0 ? 'timer' : props.selectedLabourRate === 1 ? 'more_time' : 'looks_two'}
            selectedText={props.selectedLabourRate === 0 ? 'Normal' : props.selectedLabourRate === 1 ? 'Overtime' : 'Double Time'}
            selectItems={selectItems}
        />
    )
}

export default TimeRateSelect