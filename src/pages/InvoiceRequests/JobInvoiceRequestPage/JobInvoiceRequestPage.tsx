import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import { JobInvoiceRequestResponseData } from "../../../types/JobInvoiceRequest";
import { CustomerResponseData } from "../../../types/customers.types";
import { DepartmentResponseData } from "../../../types/department.types";
import { QuoteCollectionResponse, QuoteResponseData } from "../../../types/quote.types";
import { UserResponseData } from "../../../types/user.types";
import getAPI from "../../../utils/getAPI";
import TicketInvoiceRequestInformationSkeleton from "../TicketInvoiceRequestPage/components/TicketInvoiceRequestInformationSkeleton";
import InvoiceRequestNavigation from "../components/InvoiceRequestNavigation";
import InvoiceRequestStatusLabel from "../components/InvoiceRequestStatusLabel";
import JobInvoiceRequestInformation from "./components/JobInvoiceRequestInformation";
import JobInvoiceRequestSideBar from "./components/JobInvoiceRequestSideBar/JobInvoiceRequestSideBar";

const JobInvoiceRequestPage = () => {
    const { jobInvoiceRequestID } = useParams();

    // Data States
    const [isInvoiceRequestLoading, setIsInvoiceRequestLoading] = useState(true);
    const [invoiceRequestData, setInvoiceRequestData] = useState<JobInvoiceRequestResponseData>();
    const [isJobLoading, setIsJobLoading] = useState(true);
    const [jobData, setJobData] = useState<QuoteResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isCreatedByUserLoading, setIsCreatedByUserLoading] = useState(true);
    const [createdByUserData, setCreatedByUserData] = useState<UserResponseData>();
    const [isProcessedByUserLoading, setIsProcessedByUserLoading] = useState(false);
    const [processedByUserData, setProcessedByUserData] = useState<UserResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>()
    
    useEffect(() => {
        getInvoiceRequest();
    }, [jobInvoiceRequestID]);

    useEffect(() => {
        if (invoiceRequestData === undefined) return;
        if (invoiceRequestData.data.processed_by_id) {
            getProcessedByUser(invoiceRequestData.data.processed_by_id)
        }
    }, [invoiceRequestData?.data.processed_by_id]);

    const getInvoiceRequest = () => {
        getAPI(`job_invoice_requests/${jobInvoiceRequestID}`, {}, (response: any) => {
            const jobInvoiceRequestData: JobInvoiceRequestResponseData = response.data;
            setInvoiceRequestData(jobInvoiceRequestData);
            getJob(jobInvoiceRequestData.data.department_id, jobInvoiceRequestData.data.job_number);
            getCreatedByUser(jobInvoiceRequestData.data.created_by_id);
        }, setIsInvoiceRequestLoading);
    }

    const getJob = (departmentID: number, jobNumber: number) => {
        getAPI('quotes', {
            number_jobs: [{
                department_id: departmentID,
                job_number: jobNumber,
            }]
        }, (response: any) => {
            const ticketData: QuoteCollectionResponse = response.data;
            const currentJob = ticketData.data[0];
            setJobData(currentJob);
            getCustomer(currentJob.data.customer_id);
            getDepartment(currentJob.data.department_id);
        }, setIsJobLoading)
    }

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
    }

    const getCustomer = (customerID: number) => {
        if (customerID === 0) return;
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const getCreatedByUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setCreatedByUserData(userData);
        }, setIsCreatedByUserLoading);
    }

    const getProcessedByUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setProcessedByUserData(userData);
        }, setIsProcessedByUserLoading);
    }

    const isHeaderLoading = (
        isInvoiceRequestLoading
    )

    const isLoading = (
        isInvoiceRequestLoading ||
        isCreatedByUserLoading || 
        isProcessedByUserLoading || 
        isCustomerLoading ||
        isJobLoading ||
        isDepartmentLoading
    )

    return (
        <>
            <InvoiceRequestNavigation location="jobs"/>
            <OuterContainer
                title='Job Invoice Request'
                id={jobInvoiceRequestID}
                headerContent={!isHeaderLoading && invoiceRequestData ? 
                    <InvoiceRequestStatusLabel isProcessed={invoiceRequestData.data.is_processed} isApproved={true} isHolding={false}/> :
                    <Skeleton type="label" width={125}/>
                }
                maxWidth={1200}
                bigID
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && invoiceRequestData && createdByUserData && jobData && departmentData ?
                            <JobInvoiceRequestInformation
                                invoiceRequest={invoiceRequestData}
                                job={jobData}
                                customer={customerData}
                                department={departmentData}
                                createdByUser={createdByUserData}
                                processedByUser={processedByUserData}
                            /> :
                            <TicketInvoiceRequestInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <JobInvoiceRequestSideBar
                            invoiceRequest={invoiceRequestData}
                            setJobInvoiceRequestData={setInvoiceRequestData}
                        />
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default JobInvoiceRequestPage