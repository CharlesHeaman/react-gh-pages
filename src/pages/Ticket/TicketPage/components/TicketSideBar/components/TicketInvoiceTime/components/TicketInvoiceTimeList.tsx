import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { InvoiceTicketTimeCollectionResponse } from "../../../../../../../../types/invoiceTicketTime.types";
import getAPI from "../../../../../../../../utils/getAPI";
import InvoiceTicketTimeList from "../../../../../../../Invoices/InvoiceTicketTimeList";
import TicketInvoiceTimeSearchHeader from "./TicketInvoiceTimeSearchHeader";
import getTicketInvoiceTimeSearchParams from "../utils/getTicketInvoiceTimeSearchParams";
import AddTicketTime from "../../TicketRefrigerantMovements/AddTicketTime";

const TicketInvoiceTimeList = (props: {
    tickets: Array<any>,
    totalCount: number,
    ticketID?: number,
    ticketType?: number,
    show: boolean,
    hideFunc: () => void,
    getInvoiceTicketTime?: () => void
}) => {
    const [searchParams] = useSearchParams();

    const [showAddTime, setShowAddTime] = useState(false);

    // Data States
    const [isTicketInvoiceTimeLoading, setIsTicketInvoiceTimeLoading] = useState(true);
    const [ticketInvoiceTimeData, setTicketInvoiceTimeData] = useState<InvoiceTicketTimeCollectionResponse>();

    // Search Parameters 
    const ticketInvoiceTimeSearchParams = getTicketInvoiceTimeSearchParams(searchParams);

    useEffect(() => {
        getInvoiceTicketTime();
    }, [JSON.stringify(ticketInvoiceTimeSearchParams), props.tickets])
    
    const getInvoiceTicketTime = () => {
        getAPI(`invoice_ticket_time`, {
            ...ticketInvoiceTimeSearchParams,
            tickets: props.tickets,
        }, (response: any) => {
            const ticketInvoiceTimeData: InvoiceTicketTimeCollectionResponse = response.data;
            setTicketInvoiceTimeData(ticketInvoiceTimeData);
        }, setIsTicketInvoiceTimeLoading)    
    } 

    return (
        <>
            <WindowOverlay 
                title={"Engineer Time"} 
                maxWidth={1000} 
                show={props.show}
                hideFunc={props.hideFunc} 
            >
                <TicketInvoiceTimeSearchHeader
                    showAdd={() => setShowAddTime(true)}
                />
                <InvoiceTicketTimeList 
                    isInvoiceTicketTimeLoading={isTicketInvoiceTimeLoading} 
                    invoiceTicketTime={ticketInvoiceTimeData} 
                    perPage={ticketInvoiceTimeSearchParams.perPage} 
                    totalCount={props.totalCount}            
                />
            </WindowOverlay>

            {props.ticketID && props.ticketType !== undefined && props.getInvoiceTicketTime ? <AddTicketTime 
                show={showAddTime}
                hideFunc={() => setShowAddTime(false)} 
                ticketID={props.ticketID} 
                ticketType={props.ticketType}            
                getInvoiceTicketTime={props.getInvoiceTicketTime}
            /> : null}
        </>
    )
}

export default TicketInvoiceTimeList