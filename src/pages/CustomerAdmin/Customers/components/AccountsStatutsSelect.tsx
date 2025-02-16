import { Dispatch, SetStateAction } from "react";
import NewSelectMenu, { NewSelectItem } from "../../../../components/form/NewSelectMenu/NewSelectMenu";
import Label from "../../../../components/ui/General/Label/Label";
import getCustomerAccountsStatusColor from "../utils/getCustomerAccountsStatusColour";
import getCustomerAccountsStatusIcon from "../utils/getCustomerAccountsStatusIcon";
import getCustomerAccountsStatusTitle from "../utils/getCustomerAccountsStatusText";

const AccountsStatusSelect = (props: {
    selectedAccountsStatus: number,
    setSelectedAccountsStatus: Dispatch<SetStateAction<number>>,
    showAny?: boolean
}) => {

    const selectItems: Array<NewSelectItem> = [];

    for (let selectIndex = 0; selectIndex < 4; selectIndex++) {
        selectItems.push({
            icon: <Label 
                iconFont={getCustomerAccountsStatusIcon(selectIndex)}
                color={props.selectedAccountsStatus !== selectIndex ? 
                    getCustomerAccountsStatusColor(selectIndex) :
                    ''
                }
                noBackground
            />,
            text: getCustomerAccountsStatusTitle(selectIndex),
            clickFunc: () => props.setSelectedAccountsStatus(selectIndex),
            selected: props.selectedAccountsStatus === selectIndex
        })
    }

    if (props.showAny) {
        selectItems.unshift({
            icon: <Label 
                iconFont="public"
                color="grey"
                noBackground
            />,
            text: 'Any',
            clickFunc: () => props.setSelectedAccountsStatus(-1),
            selected: props.selectedAccountsStatus === -1
        })
    }

    return (
        <NewSelectMenu
            iconFont={props.selectedAccountsStatus >= 0 ? getCustomerAccountsStatusIcon(props.selectedAccountsStatus) : 'public'}
            selectedText={props.selectedAccountsStatus >= 0 ? getCustomerAccountsStatusTitle(props.selectedAccountsStatus) : 'Any'}
            selectItems={selectItems}
        />
    )
}

export default AccountsStatusSelect