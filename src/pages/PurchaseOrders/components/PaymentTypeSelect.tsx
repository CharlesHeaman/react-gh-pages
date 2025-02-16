import { Dispatch, SetStateAction } from "react";
import NewSelectMenu, { NewSelectItem } from "../../../components/form/NewSelectMenu/NewSelectMenu";
import Label from "../../../components/ui/General/Label/Label";
import getPaymentTypeIcon from "../utils/getPaymentTypeIcon";
import getPaymentTypeTitle from "../utils/getPaymentTypeText";

const PaymentTypeSelect = (props: {
    selectedPaymentType: number,
    setSelectedPaymentType: Dispatch<SetStateAction<number>>
}) => {

    const selectItems: Array<NewSelectItem> = [];

    for (let selectIndex = 1; selectIndex < 4; selectIndex++) {
        selectItems.push({
            icon: <Label 
                iconFont={getPaymentTypeIcon(selectIndex)}
                noBackground
            />,
            text: getPaymentTypeTitle(selectIndex),
            clickFunc: () => props.setSelectedPaymentType(selectIndex),
            selected: props.selectedPaymentType === selectIndex
        })
    }
    return (
        <NewSelectMenu
            iconFont={getPaymentTypeIcon(props.selectedPaymentType)}
            selectedText={getPaymentTypeTitle(props.selectedPaymentType)}
            selectItems={selectItems}
        />
    )
}

export default PaymentTypeSelect