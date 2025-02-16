import { Dispatch, SetStateAction } from "react";
import NewSelectMenu, { NewSelectItem } from "../../../../../components/form/NewSelectMenu/NewSelectMenu";
import Label from "../../../../../components/ui/General/Label/Label";
import getInvoicePeriodIcon from "../../utils/getInvoicePeriodIcon";
import getInvoicePeriodTitle from "../../utils/getInvoicePeriodTitle";

const InvoicePeriodSelect = (props: {
    selectedInvoicePeriod: number,
    setSelectedInvoicePeriod: Dispatch<SetStateAction<number>>
}) => {

    const selectItems: Array<NewSelectItem> = [];

    for (let selectIndex = 0; selectIndex < 5; selectIndex++) {
        selectItems.push({
            icon: <Label 
                iconFont={getInvoicePeriodIcon(selectIndex)}
                noBackground
            />,
            text: getInvoicePeriodTitle(selectIndex),
            clickFunc: () => props.setSelectedInvoicePeriod(selectIndex),
            selected: props.selectedInvoicePeriod === selectIndex
        })
    }
    return (
        <NewSelectMenu
            iconFont={getInvoicePeriodIcon(props.selectedInvoicePeriod)}
            selectedText={getInvoicePeriodTitle(props.selectedInvoicePeriod)}
            selectItems={selectItems}
        />
    )
}

export default InvoicePeriodSelect