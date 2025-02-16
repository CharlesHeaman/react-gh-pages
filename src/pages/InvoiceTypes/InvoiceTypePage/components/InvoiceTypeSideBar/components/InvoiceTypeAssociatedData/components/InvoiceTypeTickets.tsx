import { useEffect, useState } from "react";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketCollectionResponse } from "../../../../../../../../types/tickets.types";
import getAPI from "../../../../../../../../utils/getAPI";
import TicketList from "../../../../../../../Tickets/components/TicketList";

const InvoiceTypeTickets = (props: {
    invoiceTypeID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    // Data States
    const [isTicketsLoading, setIsTicketsLoading] = useState(false);
    const [ticketData, setTicketData] = useState<TicketCollectionResponse>();
    
    useEffect(() => {
        getServiceHistory();
    }, [props.invoiceTypeID])

    const getServiceHistory = () => {
        getAPI(`tickets`, {
            invoice_type_ids: [props.invoiceTypeID],
            suffixes: [0],
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData);
        }, setIsTicketsLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Invoice Type Tickets'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1200}
                top
            >
                <TicketList 
                    isTicketsLoading={isTicketsLoading} 
                    tickets={ticketData} 
                />
            </WindowOverlay>
        </>
    )
}

export default InvoiceTypeTickets