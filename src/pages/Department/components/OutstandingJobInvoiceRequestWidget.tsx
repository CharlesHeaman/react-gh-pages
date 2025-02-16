import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import getAPI from "../../../utils/getAPI";
import { JobInvoiceRequestCollectionResponse } from "../../../types/JobInvoiceRequest";

const OutstandingJobInvoiceRequestWidget = () => {
    // Data States
    const [isInvoiceRequestsLoading, setIsInvoiceRequestsLoading] = useState(false);
    const [invoiceRequestData, setInvoiceRequestsData] = useState<JobInvoiceRequestCollectionResponse>();

    useEffect(() => {
        getEngineers();
    }, []);

    const getEngineers = () => {
        getAPI('job_invoice_requests', {
            is_processed: false,
            is_approved: true,
            perPage: 1
        }, (response: any) => {
            const invoiceRequestData: JobInvoiceRequestCollectionResponse = response.data;
            setInvoiceRequestsData(invoiceRequestData);
        }, setIsInvoiceRequestsLoading);
    }

    return (
        <DashboardWidget 
            title="Job Invoice Requests"
            count={invoiceRequestData?.total_count}
            text="Invoice requests that have not been processed." 
            iconFont={"dataset_linked"}
            to={"../job_invoice_requests"}
        />
    )
}

export default OutstandingJobInvoiceRequestWidget;