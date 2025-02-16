import { Dispatch, SetStateAction } from "react";
import NewSelectMenu, { NewSelectItem } from "../../../../components/form/NewSelectMenu/NewSelectMenu";
import Label from "../../../../components/ui/General/Label/Label";
import getISOApprovalColor from "../../utils/getISOApprovalColor";
import getISOApprovalIcon from "../../utils/getISOApprovalIcon";
import getISOApprovalText from "../../utils/getISOApprovalText";

const ISOApprovalSelect = (props: {
    selectedISOApproval: boolean | null,
    setSelectedISOApproval: Dispatch<SetStateAction<boolean | null>>
}) => {

    const selectItems: Array<NewSelectItem> = [];

    const addItemToSelectItems = (value: boolean | null) => {
        selectItems.push({
            icon: <Label 
                iconFont={getISOApprovalIcon(value)}
                color={props.selectedISOApproval !== value ? 
                    getISOApprovalColor(value) :
                    ''
                }
                noBackground
            />,
            text: getISOApprovalText(value),
            clickFunc: () => props.setSelectedISOApproval(value),
            selected: props.selectedISOApproval === value
        })
    }

    addItemToSelectItems(false);
    addItemToSelectItems(null);
    addItemToSelectItems(true);

    return (
        <NewSelectMenu
            iconFont={getISOApprovalIcon(props.selectedISOApproval)}
            selectedText={getISOApprovalText(props.selectedISOApproval)}
            selectItems={selectItems}
        />
    )
}

export default ISOApprovalSelect