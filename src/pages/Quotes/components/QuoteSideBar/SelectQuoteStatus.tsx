import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import FilterSelect, { FilterSelection } from "../../../../components/ui/FilterSelect/FilterSelect";
import putAPI from "../../../../utils/putAPI";
import getQuoteStatusColor from "../../utils/getQuoteStatusColor";
import getQuoteStatusIcon from "../../utils/getQuoteStatusIcon";
import getQuoteStatusTitle from "../../utils/getQuoteStatusTitle";
import { QuoteResponseData } from "../../../../types/quote.types";

const SelectQuoteStatus = (props: {
    quotedID: number,
    quotedStatus: number,
    setQuoteData: Dispatch<SetStateAction<QuoteResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {
    // Form State
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectOptions, setSelectOptions] = useState<Array<FilterSelection>>([
        {
            text: getQuoteStatusTitle(2),
            value: 2,
            iconFont: getQuoteStatusIcon(2),
            color: getQuoteStatusColor(2),
            selected: props.quotedStatus === 2
        },
        {
            text: getQuoteStatusTitle(0),
            value: 0,
            iconFont: getQuoteStatusIcon(0),
            color: getQuoteStatusColor(0),
            selected: props.quotedStatus === 0
        },
        {
            text: getQuoteStatusTitle(1),
            value: 1,
            iconFont: getQuoteStatusIcon(1),
            color: getQuoteStatusColor(1),
            selected: props.quotedStatus === 1
        },
        {
            text: getQuoteStatusTitle(3),
            value: 3,
            iconFont: getQuoteStatusIcon(3),
            color: getQuoteStatusColor(3),
            selected: props.quotedStatus === 3
        },
        {
            text: getQuoteStatusTitle(5),
            value: 5,
            iconFont: getQuoteStatusIcon(5),
            color: getQuoteStatusColor(5),
            selected: props.quotedStatus === 5
        },
    ]);

    var selectOption = selectOptions.find(selection => selection.selected)?.value;

    const updateStatus = () => {
        putAPI(`quotes/${props.quotedID}/update_status`, {}, {
            status: selectOption
        }, (response: any) => {
            const quoteData: QuoteResponseData = response.data;
            props.setQuoteData(quoteData);
            props.hideFunc();
        }, setIsUpdating);
    }

    return (
        <WindowOverlay
            title='Update Quote Status'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={525}
            footer={<SubmitButton
                text="Select Status"
                clickFunc={updateStatus}
                iconFont="label"
                submitting={isUpdating}
                submittingText="Updating..."
            />}
        >
            <InfoGrid>
                <GridItem title='Status'>
                    <FilterSelect
                        selections={selectOptions}
                        selectionSetter={setSelectOptions}
                    />                
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default SelectQuoteStatus