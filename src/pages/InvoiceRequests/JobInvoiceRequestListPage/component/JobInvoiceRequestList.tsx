import { useEffect, useState } from "react"
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../../types/department.types"
import { JobInvoiceRequestCollectionResponse } from "../../../../types/JobInvoiceRequest"
import { UserCollectionResponse, UserResponseData } from "../../../../types/user.types"
import findDepartment from "../../../../utils/findDepartment"
import findUser from "../../../../utils/findUser"
import getAPI from "../../../../utils/getAPI"
import InvoiceRequestRowSkeleton from "../../TicketInvoiceRequestListPage/components/TicketInvoiceRequestRowSkeleton"
import JobInvoiceRequestRow from "./JobInvoiceRequestRow"
import { CustomerCollectionResponse, CustomerResponseData } from "../../../../types/customers.types"
import { QuoteCollectionResponse, QuoteResponseData } from "../../../../types/quote.types"
import { TicketCollectionResponse } from "../../../../types/tickets.types"
import findQuote from "../../../../utils/findQuote"


const JobInvoiceRequestList = (props: {
    isJobInvoiceRequestsLoading: boolean,
    jobInvoiceRequests: JobInvoiceRequestCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    showAdvancedSearch?: () => void
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [usersData, setUsersData] = useState<Array<UserResponseData>>([]);
    const [isJobLoading, setIsJobLoading] = useState(false);
    const [jobData, setJobData] = useState<Array<QuoteResponseData>>([]);
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomerData] = useState<Array<CustomerResponseData>>([]);

    // Resource Constants
    const resourceName = "job invoice requests";
    const resourceIcon = "credit_card";


    useEffect(() => {
        setIsUsersLoading(true);
        setIsJobLoading(true);
        setIsDepartmentsLoading(true);
        setIsCustomersLoading(true);
    }, [props.isJobInvoiceRequestsLoading])

    useEffect(() => {
        if (props.jobInvoiceRequests && props.jobInvoiceRequests.data.length > 0) {
            getUsers([...new Set(props.jobInvoiceRequests.data.map(jobInvoiceRequest => jobInvoiceRequest.data.created_by_id))]);
            getDepartments([...new Set(props.jobInvoiceRequests.data.map(jobInvoiceRequest => jobInvoiceRequest.data.department_id))]);
            getJobs([...new Set(props.jobInvoiceRequests.data.map(jobInvoiceRequest => {
                return {
                    job_number: jobInvoiceRequest.data.job_number,
                    department_id: jobInvoiceRequest.data.department_id
                }
            }))]);
    } else {
            setIsUsersLoading(false);
            setIsJobLoading(false);
            setIsDepartmentsLoading(false);
            setIsCustomersLoading(false);
        }
    }, [props.jobInvoiceRequests])

    const getUsers = (userIDs: Array<number>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUsersData(userData.data)
        }, setIsUsersLoading)
    }

    const getJobs = (jobs: any) => {
        getAPI(`quotes`, {
            number_jobs: jobs
        }, (response: any) => {
            const jobData: QuoteCollectionResponse = response.data;
            setJobData(jobData.data)
            if (jobData.data.length > 0) {
                getCustomers([...new Set(jobData.data.map(job => job.data.customer_id))]);
            } else {
                setIsCustomersLoading(false);
            }
        }, setIsJobLoading)   
    }

    const getDepartments = (departmentIDs: Array<number>) => {
        getAPI('departments', {
            ids: departmentIDs
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData.data);
        }, setIsDepartmentsLoading);
    }

    const getCustomers = (customerIDs: Array<number>) => {
        getAPI('customers', {
            ids: customerIDs
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomerData(customerData.data)
        }, setIsCustomersLoading)
    }

    const isLoading = (
        props.isJobInvoiceRequestsLoading || 
        isUsersLoading || 
        isDepartmentsLoading || 
        isCustomersLoading || 
        isJobLoading
    )

    return (
        <div>
            <SearchTable
                headers={['Request ID', 'Department', 'Job', 'Customer', 'Created By', 'Requested Value', 'Requested Date', 'Status']}
                isLoading={!(!isLoading && props.jobInvoiceRequests)}
                skeletonRow={<InvoiceRequestRowSkeleton/>}
                count={props.jobInvoiceRequests ? props.jobInvoiceRequests.data.length : 0}
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.jobInvoiceRequests && props.jobInvoiceRequests.data.map((jobInvoiceRequest, index) => 
                    <JobInvoiceRequestRow
                        jobInvoiceRequest={jobInvoiceRequest}
                        customers={customerData}
                        job={findQuote(jobData, jobInvoiceRequest.data.job_number, jobInvoiceRequest.data.department_id)}
                        department={findDepartment(departmentData, jobInvoiceRequest.data.department_id)}
                        user={findUser(usersData, jobInvoiceRequest.data.created_by_id)}
                        key={index} 
                    />
                )}
            />
            {(!isLoading && props.jobInvoiceRequests) && <PaginationNavigation
                data={props.jobInvoiceRequests.data}
                totalCount={props.jobInvoiceRequests.total_count}
                perPage={props.jobInvoiceRequests.pages.per_page}
                resourceName={resourceName}
                prefix={"job_invoice_requests"}
            />}
        </div>
    )
}

export default JobInvoiceRequestList