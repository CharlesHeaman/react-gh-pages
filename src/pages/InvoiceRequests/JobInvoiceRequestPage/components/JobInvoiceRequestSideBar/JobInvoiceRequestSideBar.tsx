import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { JobInvoiceRequestResponseData } from "../../../../../types/JobInvoiceRequest"
import TicketInvoiceRequestSideBarSkeleton from "../../../TicketInvoiceRequestPage/components/TicketInvoiceRequestSideBar/TicketInvoiceRequestSideBarSkeleton"
import DeleteJobInvoiceRequest from "./components/DeleteJobInvoiceRequest"
import JobInvoiceRequestActions from "./components/JobInvoiceRequestActions"
import getAPI from "../../../../../utils/getAPI"
import JobInvoiceRequestAssociatedData from "./components/JobInvoiceRequestAssociatedData/JobInvoiceRequestAssociatedData"
import { JobInvoiceRequestActivityCollectionResponse } from "../../../../../types/JobInvoiceRequestActivity.types"
import ExportResource from "../../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../../../components/PermsProtectedComponent"

const JobInvoiceRequestSideBar = (props: {
    invoiceRequest: JobInvoiceRequestResponseData | undefined,
    setJobInvoiceRequestData: Dispatch<SetStateAction<JobInvoiceRequestResponseData | undefined>>
}) => {

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<JobInvoiceRequestActivityCollectionResponse>();

    useEffect(() => {
        if (props.invoiceRequest?.id === undefined) return;
        getActivity(props.invoiceRequest.id);
    }, [JSON.stringify(props.invoiceRequest)]);

    
    const getActivity = (jobInvoiceRequestID: number) => {
        getAPI(`job_invoice_request_activity`, {
            job_invoice_request_id: jobInvoiceRequestID,
            perPage: 1
        }, (response: any) => {
            const jobInvoiceRequestActivityData: JobInvoiceRequestActivityCollectionResponse = response.data;
            setActivityData(jobInvoiceRequestActivityData);
        }, setIsActivityLoading)    
    } 

    const isLoading = (
        isActivityLoading 
    )
 
    return (
        !isLoading && props.invoiceRequest && activityData ? <>
            {!props.invoiceRequest.data.is_processed ?
                <PermsProtectedComponent requiredPerms={{ accounts: 2 }}>
                    <JobInvoiceRequestActions
                        jobInvoiceRequestID={props.invoiceRequest.id}
                        requestedValue={props.invoiceRequest.data.requested_value}
                        setJobInvoiceRequestData={props.setJobInvoiceRequestData}
                    />
                </PermsProtectedComponent>
            : null}
            <JobInvoiceRequestAssociatedData
                jobInvoiceRequestID={props.invoiceRequest.id}
                activityCount={activityData.total_count}
            />
            <PermsProtectedComponent requiredPerms={{ accounts: 2 }}>
                <DeleteJobInvoiceRequest
                    jobInvoiceRequestID={props.invoiceRequest.id}
                />
            </PermsProtectedComponent>

            <ExportResource
                resourceData={props.invoiceRequest}
                resourceName="Job Invoice Request"
            />
        </> :
        // Skeleton 
        <TicketInvoiceRequestSideBarSkeleton/>
    )
}

export default JobInvoiceRequestSideBar