import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketInvoiceRequestActivityCollectionResponse } from "../../../../../../../types/ticketInvoiceRequestActivity.types";
import getAPI from "../../../../../../../utils/getAPI";
import getPaginationParams from "../../../../../../../utils/getPaginationParams";
import TicketInvoiceRequestActivityList from "./TicketInvoiceRequestList";

const TicketInvoiceRequestHistory = (props: {
    ticketInvoiceRequestID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<TicketInvoiceRequestActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'ticket_invoice_request_activity');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.ticketInvoiceRequestID])

    const getActivity = () => {
        getAPI(`ticket_invoice_request_activity`, {
            ...paginationParams,
            ticket_invoice_request_id: props.ticketInvoiceRequestID
        }, (response: any) => {
            const ticketInvoiceRequestActivityData: TicketInvoiceRequestActivityCollectionResponse = response.data;
            setActivityData(ticketInvoiceRequestActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Ticket Invoice Request History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <TicketInvoiceRequestActivityList
                isTicketInvoiceRequestActivityLoading={isActivityLoading}
                ticketInvoiceRequestActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default TicketInvoiceRequestHistory