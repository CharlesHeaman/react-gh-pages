import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TicketInvoiceRequestResponseData } from "../../../../types/TicketInvoiceRequest.types"
import TicketInvoiceRequestActions from "../components/TicketInvoiceRequestSideBar/TicketInvoiceRequestActions/TicketInvoiceRequestActions"
import DeleteTicketInvoiceRequest from "./TicketInvoiceRequestSideBar/DeleteTicketInvoiceRequest/DeleteTicketInvoiceRequest"
import TicketInvoiceRequestSideBarSkeleton from "./TicketInvoiceRequestSideBar/TicketInvoiceRequestSideBarSkeleton"
import { TicketInvoiceRequestActivityCollectionResponse } from "../../../../types/ticketInvoiceRequestActivity.types"
import getAPI from "../../../../utils/getAPI"
import TicketInvoiceRequestAssociatedData from "./TicketInvoiceRequestSideBar/TicketInvoiceRequestAssociatedData/TicketInvoiceRequestAssociatedData"
import ExportResource from "../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"

const TicketInvoiceRequestSideBar = (props: {
    invoiceRequest: TicketInvoiceRequestResponseData | undefined,
    setTicketInvoiceRequestData: Dispatch<SetStateAction<TicketInvoiceRequestResponseData | undefined>>
}) => {

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<TicketInvoiceRequestActivityCollectionResponse>();

    useEffect(() => {
        if (props.invoiceRequest?.id === undefined) return;
        getActivity(props.invoiceRequest.id);
    }, [JSON.stringify(props.invoiceRequest)]);

    
    const getActivity = (ticketInvoiceRequestID: number) => {
        getAPI(`ticket_invoice_request_activity`, {
            ticket_invoice_request_id: ticketInvoiceRequestID,
            perPage: 1
        }, (response: any) => {
            const ticketInvoiceRequestActivityData: TicketInvoiceRequestActivityCollectionResponse = response.data;
            setActivityData(ticketInvoiceRequestActivityData);
        }, setIsActivityLoading)    
    } 

    const isLoading = (
        isActivityLoading 
    )

    return (
        !isLoading && props.invoiceRequest && activityData ? <>
            {!props.invoiceRequest.data.is_processed && !props.invoiceRequest.data.holding_for_purchase_order_number ?
                <PermsProtectedComponent requiredPerms={{ accounts: 2 }}>
                    <TicketInvoiceRequestActions
                        ticketInvoiceRequestID={props.invoiceRequest.id}
                        requestedValue={props.invoiceRequest.data.requested_value}
                        setTicketInvoiceRequestData={props.setTicketInvoiceRequestData}
                    />
                </PermsProtectedComponent>
            : null}
            <TicketInvoiceRequestAssociatedData
                ticketInvoiceRequestID={props.invoiceRequest.id}
                activityCount={activityData.total_count}
            />
            <PermsProtectedComponent requiredPerms={{ accounts: 2 }}>
                <DeleteTicketInvoiceRequest
                    ticketInvoiceRequestID={props.invoiceRequest.id}
                />
            </PermsProtectedComponent>

            <ExportResource
                resourceData={props.invoiceRequest}
                resourceName="Ticket Invoice Request"
            />
        </> :
        // Skeleton 
        <TicketInvoiceRequestSideBarSkeleton/>
    )
}

export default TicketInvoiceRequestSideBar