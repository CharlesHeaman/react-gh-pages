import { TicketInvoiceRequestCollectionResponse } from '../../../types/TicketInvoiceRequest.types';
import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import getAPI from "../../../utils/getAPI";

const OutstandingTicketInvoiceRequestWidget = () => {
    // Data States
    const [isInvoiceRequestsLoading, setIsInvoiceRequestsLoading] = useState(false);
    const [invoiceRequestData, setInvoiceRequestsData] = useState<TicketInvoiceRequestCollectionResponse>();

    useEffect(() => {
        getEngineers();
    }, []);

    const getEngineers = () => {
        getAPI('ticket_invoice_requests', {
            is_processed: false,
            is_approved: true,
            perPage: 1
        }, (response: any) => {
            const invoiceRequestData: TicketInvoiceRequestCollectionResponse = response.data;
            setInvoiceRequestsData(invoiceRequestData);
        }, setIsInvoiceRequestsLoading);
    }

    return (
        <DashboardWidget 
            title="Ticket Invoice Requests"
            count={invoiceRequestData?.total_count}
            text="Invoice requests that have not been processed." 
            iconFont={"credit_card"}
            to={"../ticket_invoice_requests"}
        />
    )
}

export default OutstandingTicketInvoiceRequestWidget;