import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { JobInvoiceRequestActivityCollectionResponse } from "../../../../../../../types/jobInvoiceRequestActivity.types";
import getAPI from "../../../../../../../utils/getAPI";
import getPaginationParams from "../../../../../../../utils/getPaginationParams";
import JobInvoiceRequestActivityList from "./JobInvoiceRequestList";

const JobInvoiceRequestHistory = (props: {
    jobInvoiceRequestID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<JobInvoiceRequestActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'job_invoice_request_activity');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.jobInvoiceRequestID])

    const getActivity = () => {
        getAPI(`job_invoice_request_activity`, {
            ...paginationParams,
            job_invoice_request_id: props.jobInvoiceRequestID
        }, (response: any) => {
            const jobInvoiceRequestActivityData: JobInvoiceRequestActivityCollectionResponse = response.data;
            setActivityData(jobInvoiceRequestActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Job Invoice Request History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <JobInvoiceRequestActivityList
                isJobInvoiceRequestActivityLoading={isActivityLoading}
                jobInvoiceRequestActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default JobInvoiceRequestHistory