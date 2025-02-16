import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import SelectQuoteStatus from "./SelectQuoteStatus"
import { QuoteResponseData } from "../../../../types/quote.types";
import postAPI from "../../../../utils/postAPI";
import GenerateQuotePDF from "./GenerateQuotePDF";
import DeclineQuote from "./DeclineQuote";
import { QuoteDocumentsResponseData } from "../../../../types/quoteDocuments.types";
import CreateQuoteRevision from "./CreateQuoteRevision";
import SendQuote from "./SendQuote";

const QuoteActions = (props: {
    quote: QuoteResponseData,
    setQuoteData: Dispatch<SetStateAction<QuoteResponseData | undefined>>,
}) => {
    const [showSend, setShowSend] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [showGenerate, setShowGenerate] = useState(false);
    const [showDecline, setShowDecline] = useState(false);
    const [documentGenerated, setDocumentGenerated] = useState(false);
    const [showCreateRevision, setShowCreateRevision] = useState(false);

    // Form States
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = () => {
        setShowGenerate(true);
        postAPI(`quotes/${props.quote.id}/generate_pdf`, {}, {}, (response: any) => {
            const documentData: QuoteDocumentsResponseData = response.data;
            window.open(`${process.env.REACT_APP_API_URL}/quote_documents/${documentData.data.file_name}`)?.focus();
            setShowGenerate(false);
            setDocumentGenerated(true);
        }, setIsGenerating);
    }

    return (
        <>
            <SideBarModule title="Actions">
                {/* Sent */}
                {props.quote.data.status === 0 &&
                    <>
                        <SideBarButton
                            text="Mark as Accepted"
                            color="light-green"
                            iconFont="thumb_up"
                            clickEvent={() => null}
                        />
                        <SideBarButton
                            text="Mark as Declined"
                            color="red"
                            iconFont="thumb_down"
                            clickEvent={() => setShowDecline(true)}
                        />
                    </>
                }
                {/* Pending */}
                {props.quote.data.status === 2 && 
                    <>
                        {!props.quote.data.is_project && (props.quote.data.quote_document_id !== null || documentGenerated) ? <SideBarButton 
                            text='Send Quote to Customer' 
                            iconFont="email" 
                            color="purple" 
                            clickEvent={() => setShowSend(true)}
                        /> : null}
                        {!props.quote.data.is_project ? <SideBarButton 
                            text='Generate Quote PDF' 
                            iconFont="note_add" 
                            color="dark-blue" 
                            clickEvent={generatePDF}
                        /> : null}
                    </>
                }
                <SideBarButton 
                    text='Select Quote Status' 
                    iconFont="label" 
                    clickEvent={() => setShowStatus(true)}
                />
                {!props.quote.data.is_project ? <SideBarButton 
                    text='Create Quote Revision' 
                    iconFont="file_copy" 
                    clickEvent={() => setShowCreateRevision(true)}
                /> : null}
            </SideBarModule>

            <SelectQuoteStatus 
                quotedID={props.quote.id} 
                quotedStatus={props.quote.data.status} 
                setQuoteData={props.setQuoteData} 
                show={showStatus} 
                hideFunc={() => setShowStatus(false)}            
            />

            <DeclineQuote
                quotedID={props.quote.id} 
                setQuoteData={props.setQuoteData} 
                show={showDecline} 
                hideFunc={() => setShowDecline(false)}                        
            />

            <GenerateQuotePDF
                show={showGenerate}
            />

            <CreateQuoteRevision 
                quotedID={props.quote.id} 
                show={showCreateRevision} 
                hideFunc={() => setShowCreateRevision(false)}
            />

            <SendQuote 
                quoteID={props.quote.id} 
                setQuoteData={props.setQuoteData} 
                show={showSend} 
                hideFunc={() => setShowSend(false)}/>
        </>
    )
}

export default QuoteActions