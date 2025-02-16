import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import Header from "../../../components/ui/Structure/Header/Header";
import { JobInvoiceRequestCollectionResponse } from "../../../types/JobInvoiceRequest";
import getAPI from "../../../utils/getAPI";
import InvoiceRequestNavigation from "../components/InvoiceRequestNavigation";
import getJobInvoiceRequestSearchParams from "../utils/getJobInvoiceRequestSearchParams";
import JobInvoiceRequestList from "./component/JobInvoiceRequestList";
import JobInvoiceRequestSearchHeader from "./component/JobInvoiceRequestSearchHeader";
import JobInvoiceRequestAdvancedSearch from "./JobInvoiceRequestAdvancedSearch";



const JobInvoiceRequestListPage = ()  => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isJobInvoiceRequestsLoading, setIsJobInvoiceRequestsLoading] = useState(true);
    const [jobInvoiceRequestsData, setJobInvoiceRequestsData] = useState<JobInvoiceRequestCollectionResponse>();

    // Search Parameters 
    const jobInvoiceRequestSearchParams = getJobInvoiceRequestSearchParams(searchParams);
    
    useEffect(() => {
        searchJobInvoiceRequests();
    }, [JSON.stringify(jobInvoiceRequestSearchParams)])

    const searchJobInvoiceRequests = () => {
        setShowAdvancedSearch(false);
        getAPI('job_invoice_requests', jobInvoiceRequestSearchParams, (response: any) => {
            const jobInvoiceRequestData: JobInvoiceRequestCollectionResponse = response.data;
            setJobInvoiceRequestsData(jobInvoiceRequestData);
        }, setIsJobInvoiceRequestsLoading);
    }

    return (
        <>
            <InvoiceRequestNavigation location="jobs"/>
            <OuterContainer
                title='Job Invoice Requests'
                description="Process invoice requests raised for jobs"
                maxWidth={1600}
                noBorder
            >
                <JobInvoiceRequestSearchHeader
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />
                <JobInvoiceRequestList 
                    isJobInvoiceRequestsLoading={isJobInvoiceRequestsLoading} 
                    jobInvoiceRequests={jobInvoiceRequestsData} 
                    perPage={jobInvoiceRequestSearchParams.perPage}                
                />
            </OuterContainer>

            <JobInvoiceRequestAdvancedSearch
                show={showAdvancedSearch}
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default JobInvoiceRequestListPage