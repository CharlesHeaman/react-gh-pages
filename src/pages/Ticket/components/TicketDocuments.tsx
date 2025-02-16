import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import getAPI from "../../../utils/getAPI";
import { TicketResponseData } from "../../../types/tickets.types";
import getDocumentSearchParams from "../../../utils/getDocumentSearchParams";
import DocumentSearchHeader from "../../Vehicles/VehiclePage/components/DocumentSearchHeader";
import UploadTicketDocuments from "../TicketPage/components/TicketSideBar/components/UploadTicketDocuments";
import TicketDocumentsList from "./TicketDocumentsList";
import { TicketUploadCollectionResponse } from "../../../types/ticketUploads.types";

const TicketDocuments = (props: {
    ticketID: number,
    ticketType: number,
    continuations: Array<TicketResponseData>,
}) => {
    const [showUpload, setShowUpload] = useState(false);

    const [searchParams] = useSearchParams();

    const documentSearchParams = getDocumentSearchParams(searchParams, "ticket")

    // Data States
    const [isDocumentsLoading, setIsDocumentsLoading] = useState(true);
    const [documentsData, setDocumentsData] = useState<TicketUploadCollectionResponse>();
    
    useEffect(() => {
        getDocuments();
    }, [props.continuations, JSON.stringify(documentSearchParams)]);

    const getDocuments = () => {
        getAPI('ticket_uploads', {
            ...documentSearchParams,
            tickets: props.continuations.map(ticket => {
                return {
                    ticket_id: ticket.id,
                    ticket_type: ticket.data.ticket_type
                }
            }),
        }, (response: any) => {
            const documentData: TicketUploadCollectionResponse = response.data;
            setDocumentsData(documentData);
        }, setIsDocumentsLoading);
    }
    
    return (
        <>
            <section>
                <h2>Documents</h2>
                <DocumentSearchHeader
                    resourcePrefix="ticket"
                    showUpload={() => setShowUpload(true)}
                />                
                <TicketDocumentsList  
                    isLoading={isDocumentsLoading}
                    documents={documentsData}
                    getDocuments={getDocuments}
                />
            </section>
            
            <UploadTicketDocuments 
                ticketID={props.ticketID}
                ticketType={props.ticketType}
                show={showUpload} 
                hideFunc={() => setShowUpload(false)}
                getDocuments={getDocuments}
            /> 
        </>
    )
}

export default TicketDocuments;