import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { QuoteResponseData } from "../../../../types/quote.types";
import putAPI from "../../../../utils/putAPI";

const DeclineQuote = (props: {
    quotedID: number,
    setQuoteData: Dispatch<SetStateAction<QuoteResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {
    // Form State
    const [isUpdating, setIsUpdating] = useState(false);

    const updateStatus = () => {
        putAPI(`quotes/${props.quotedID}/update_status`, {}, {
            status: 3
        }, (response: any) => {
            const quoteData: QuoteResponseData = response.data;
            props.setQuoteData(quoteData);
            props.hideFunc();
        }, setIsUpdating);
    }

    return (
        <WindowOverlay
            title='Mark Quote as Declined'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Mark as Declined"
                color="red"
                clickFunc={updateStatus}
                iconFont="thumb_down"
                submitting={isUpdating}
                submittingText="Updating..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Mark this quote as declined by the customer?</p>
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default DeclineQuote