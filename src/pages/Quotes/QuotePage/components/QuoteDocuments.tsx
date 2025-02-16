import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { QuoteDocumentsCollectionResponse } from "../../../../types/quoteDocuments.types";
import getAPI from "../../../../utils/getAPI";
import getDocumentSearchParams from "../../../../utils/getDocumentSearchParams";
import DocumentSearchHeader from "../../../Vehicles/VehiclePage/components/DocumentSearchHeader";
import UploadQuoteDocuments from "../../components/QuoteSideBar/UploadQuoteDocument";
import QuoteDocumentsList from "./QuoteDocumentsList";

const QuoteDocuments = (props: {
    quoteID: number,
}) => {
    const [showUpload, setShowUpload] = useState(false);

    const [searchParams] = useSearchParams();

    const documentSearchParams = getDocumentSearchParams(searchParams, "quote")

    // Data States
    const [isDocumentsLoading, setIsDocumentsLoading] = useState(true);
    const [documentsData, setDocumentsData] = useState<QuoteDocumentsCollectionResponse>();
    
    useEffect(() => {
        getDocuments();
    }, [props.quoteID, JSON.stringify(documentSearchParams)]);
    
    const getDocuments = () => {
        getAPI('quote_documents', {
            ...documentSearchParams,
            quote_id: props.quoteID,
        }, (response: any) => {
            const documentData: QuoteDocumentsCollectionResponse = response.data;
            setDocumentsData(documentData);
        }, setIsDocumentsLoading);
    }
    
    return (
        <>
            <section>
                <h2>Documents</h2>
                <DocumentSearchHeader
                    resourcePrefix="quote"
                    showUpload={() => setShowUpload(true)}
                />                
                <QuoteDocumentsList  
                    isLoading={isDocumentsLoading}
                    documents={documentsData}
                    getDocuments={getDocuments}
                />
            </section>
            
            <UploadQuoteDocuments 
                quoteID={props.quoteID}
                show={showUpload} 
                hideFunc={() => setShowUpload(false)}
                getDocuments={getDocuments}
            /> 
        </>
    )
}

export default QuoteDocuments;