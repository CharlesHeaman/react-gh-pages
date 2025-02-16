import { useState } from "react";
import MarkdownEditor from "../../../../components/form/MarkdownEditor/MarkdownEditor";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import putAPI from "../../../../utils/putAPI";

const EditQuotedEquipmentQuoteText = (props: {
    quotedEquipmentID: number,
    quoteText: string,
    getQuotedEquipment: () => void,
    show: boolean,
    hideFunc: () => void
}) => {
    // Form States
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quoteText, setQuoteText] = useState(props.quoteText);

    const updateQuoteText = () => {
        putAPI(`quoted_equipment/${props.quotedEquipmentID}/update_text`, {}, {
            quote_description: quoteText
        }, () => {
            props.hideFunc();
            props.getQuotedEquipment();
        }, setIsSubmitting);
    }
    
    return (
        <WindowOverlay 
            title="Edit Quote Text " 
            maxWidth={800} 
            show={props.show} 
            hideFunc={props.hideFunc} 
            footer={<SubmitButton
                text="Save Changes"
                iconFont="save"
                color="light-green"
                submitting={isSubmitting}
                submittingText='Reactivating...'
                clickFunc={updateQuoteText}
            />
        }>
            <MarkdownEditor
                content={quoteText} 
                setter={setQuoteText}
            />
        </WindowOverlay>
    )
}

export default EditQuotedEquipmentQuoteText

