import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { QuoteResponseData } from "../../../../types/quote.types";
import postAPI from "../../../../utils/postAPI";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";


const SendQuote = (props: {
    quoteID: number,
    setQuoteData: Dispatch<SetStateAction<QuoteResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {

    const [isUpdating, setIsUpdating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    // const [selectedContact, setSelectedContact] = useState<SupplierContactResponseData | undefined>();
    
    const sendQuote = () => {
        postAPI(`quotes/${props.quoteID}/send`, {}, {
        }, (response: any) => {
            const quoteData: QuoteResponseData = response.data;
            props.setQuoteData(quoteData);
            props.hideFunc();
        }, setIsUpdating)
    }
    
    
    return (
        <WindowOverlay
            title='Send Quote to Customer'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Send Quote"
                iconFont="email"
                clickFunc={sendQuote}
                submitting={isUpdating}
                submittingText="Sending..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>[Placeholder text for updated email component]</p>
                </GridItem>
                {/* 
                {props.attachments.length > 0 && <GridItem>
                    <p>All attachments will be send with be included with the email</p>
                </GridItem>} */}
                {/* <GridItem title='Supplier Contact'>
                    <SupplierContactSelect 
                        supplier_id={props.supplier.id}
                        selectedSupplierContact={selectedContact} 
                        setSelectedSupplierContact={setSelectedContact} 
                        hasSubmitted={hasSubmitted}
                        required
                    />
                </GridItem>
                <GridItem title='Attachments'>
                    <PurchaseOrderAttachmentList  
                        attachments={props.attachments}
                        noEdit
                    />
                </GridItem> */}
            </InfoGrid>
        </WindowOverlay>
    )
}

export default SendQuote