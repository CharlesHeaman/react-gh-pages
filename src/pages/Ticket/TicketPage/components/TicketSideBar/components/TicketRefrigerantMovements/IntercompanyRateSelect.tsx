import { Dispatch, SetStateAction } from "react";
import NewSelectMenu, { NewSelectItem } from "../../../../../../../components/form/NewSelectMenu/NewSelectMenu";
import Label from "../../../../../../../components/ui/General/Label/Label";

const IntercompanyRateSelect = (props: {
    selectedIntercompanyRate: number,
    setSelectedIntercompanyRate: Dispatch<SetStateAction<number>>
}) => {

    const selectItems: Array<NewSelectItem> = [
        {
            icon: <Label
                iconFont="not_interested"
                hideText
                noBackground
            />,
            text: 'None',
            clickFunc: () => props.setSelectedIntercompanyRate(0),
            selected: props.selectedIntercompanyRate === 0
        },
        {
            icon: <Label
                iconFont="dataset_linked"
                hideText
                noBackground
            />,
            text: 'Intercompany 1',
            clickFunc: () => props.setSelectedIntercompanyRate(1),
            selected: props.selectedIntercompanyRate === 1
        },
        {
            icon: <Label
                iconFont="dataset_linked"
                hideText
                noBackground
            />,
            text: 'Intercompany 2',
            clickFunc: () => props.setSelectedIntercompanyRate(2),
            selected: props.selectedIntercompanyRate === 2
        }
    ];

    return (
        <NewSelectMenu
            iconFont={props.selectedIntercompanyRate === 0 ? 'not_interested' : 'dataset_linked'}
            selectedText={props.selectedIntercompanyRate === 0 ? 'None' : props.selectedIntercompanyRate === 1 ? 'Intercompany 1' : 'Intercompany 2'}
            selectItems={selectItems}
        />
    )
}

export default IntercompanyRateSelect