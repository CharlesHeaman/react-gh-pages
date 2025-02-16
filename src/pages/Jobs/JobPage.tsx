import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { CustomerResponseData } from "../../types/customers.types";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../types/department.types";
import { InterimInvoiceCollectionResponse } from "../../types/interimInvoice.types";
import { JobInvoiceRequestCollectionResponse, JobInvoiceRequestResponseData } from "../../types/JobInvoiceRequest";
import { QuoteCollectionResponse, QuoteResponseData } from "../../types/quote.types";
import { QuoteDocumentsCollectionResponse, QuoteDocumentsResponseData } from "../../types/quoteDocuments.types";
import { UserResponseData } from "../../types/user.types";
import getAPI from "../../utils/getAPI";
import JobSideBar from "./components/JobSideBar/JobSideBar";
import JobStatuses from "./components/JobStatuses";
import JobInformation from "./JobInformation";
const JobPage = () => {
    const { departmentName, jobNumber } = useParams();

    // Data States
    const [isJobLoading, setIsJobLoading] = useState(true);
    const [jobData, setJobData] = useState<QuoteResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isInterimInvoicesLoading, setIsInterimInvoicesLoading] = useState(true);
    const [interimInvoiceData, setInterimInvoiceData] = useState<InterimInvoiceCollectionResponse>();
    const [isInvoiceRequestLoading, setIsInvoiceRequestLoading] = useState(false);
    const [invoiceRequest, setInvoiceRequest] = useState<JobInvoiceRequestResponseData>();
    const [isInvoiceCreatedByUserLoading, setIsInvoiceCreatedByUserLoading] = useState(false);
    const [invoiceCreatedByUserData, setInvoiceCreatedByUserData] = useState<UserResponseData>();
    const [isInvoiceProcessedByUserLoading, setIsInvoiceProcessedByUserLoading] = useState(false);
    const [invoiceProcessedByUserData, setInvoiceProcessedByUserData] = useState<UserResponseData>();
    
    useEffect(() => {
        getJobData();
    }, [jobNumber]);

    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    useEffect(() => {
        if (departmentData === undefined) return;
        getInterimInvoices(departmentData.id);
    }, [jobNumber, departmentData?.id]);

    const getJobData = () => {
        getAPI(`quotes`, {
            number: jobNumber
        }, (response: any) => {
            const jobData: QuoteCollectionResponse = response.data;
            const currentJob = jobData.data[0];
            setJobData(currentJob);
            getCustomer(currentJob.data.customer_id);
            getInvoiceRequest(parseInt(currentJob.data.number), currentJob.data.department_id);
        }, setIsJobLoading);
    }

    const getDepartment = () => {
        getAPI('departments', {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartment = departmentData.data[0];
            setDepartmentData(currentDepartment);
        }, setIsDepartmentLoading);
    }

    const getCustomer = (customerID: number) => {
        if (customerID === 0) return;
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const getInterimInvoices = (departmentID: number) => {
        getAPI('interim_invoices', {
            jobs: [
                {
                    job_number: jobNumber,
                    department_id: departmentID
                }
            ]
        }, (response: any) => {
            const interimInvoiceData: InterimInvoiceCollectionResponse = response.data;
            setInterimInvoiceData(interimInvoiceData);
        }, setIsInterimInvoicesLoading);
    }

    const getInvoiceRequest = (jobNumber: number, departmentID: number) => {
        getAPI(`job_invoice_requests`, {
            jobs: [{
                job_number: jobNumber,
                department_id: departmentID
            }]
        }, (response: any) => {
            const invoiceRequest: JobInvoiceRequestCollectionResponse = response.data;
            if (invoiceRequest.data.length > 0) {
                const currentInvoiceRequest = invoiceRequest.data[0];
                setInvoiceRequest(currentInvoiceRequest);
                getInvoiceCreatedByUser(currentInvoiceRequest.data.created_by_id);
                currentInvoiceRequest.data.processed_by_id && getInvoiceProcessedByUser(currentInvoiceRequest.data.processed_by_id);
            }
        }, setIsInvoiceRequestLoading);
    }

    const getInvoiceCreatedByUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setInvoiceCreatedByUserData(userData);
        }, setIsInvoiceCreatedByUserLoading);
    }

    const getInvoiceProcessedByUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setInvoiceProcessedByUserData(userData);
        }, setIsInvoiceProcessedByUserLoading);
    }

    const isLoading = (
        isDepartmentLoading ||
        isCustomerLoading || 
        isJobLoading || 
        isInterimInvoicesLoading || 
        isInvoiceRequestLoading || 
        isInvoiceCreatedByUserLoading || 
        isInvoiceProcessedByUserLoading
    )

    const isHeaderLoading = (
        isJobLoading ||
        isInvoiceRequestLoading
    )

    return (
        <>
            <OuterContainer
                title='Job'
                id={jobNumber}
                headerContent={!isHeaderLoading && jobData ?
                    <JobStatuses job={jobData} invoiceRequest={invoiceRequest}/> 
                : null}
                maxWidth={1200}
                bigID
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && departmentData && jobData && interimInvoiceData ?
                            <JobInformation
                                job={jobData}
                                customerData={customerData}
                                departmentData={departmentData}
                                interimInvoices={interimInvoiceData.data}
                                invoiceRequest={invoiceRequest}
                                invoiceCreatedByUser={invoiceCreatedByUserData}
                                invoiceProcessedByUser={invoiceProcessedByUserData}
                            /> :
                            <></>
                        }
                    </div>
                    <div className="page-side">
                        <JobSideBar
                            job={jobData}
                            setJobData={setJobData}
                            department={departmentData}
                            getInterimInvoices={getInterimInvoices}
                        />
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default JobPage