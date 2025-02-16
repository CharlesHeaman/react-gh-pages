import { useEffect, useState } from "react"
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchTable from "../../../components/ui/SearchTable/SearchTable"
import { CustomerCollectionResponse, CustomerResponseData } from "../../../types/customers.types"
import { QuoteCollectionResponse } from "../../../types/quote.types"
import { TicketCollectionResponse, TicketResponseData } from "../../../types/tickets.types"
import { UserCollectionResponse, UserResponseData } from "../../../types/user.types"
import findCustomer from "../../../utils/findCustomer"
import findTicket from "../../../utils/findTicket"
import findUser from "../../../utils/findUser"
import getAPI from "../../../utils/getAPI"
import QuoteRow from "../components/QuoteRow"
import QuoteRowSkeleton from "./QuoteRowSkeleton"
import { JobInvoiceRequestCollectionResponse, JobInvoiceRequestResponseData } from "../../../types/JobInvoiceRequest"
import findJobInvoiceRequest from "../../../utils/findJobInvoiceRequest"
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types"
import findDepartment from "../../../utils/findDepartment"

const QuoteList = (props: {
    isQuotesLoading: boolean,
    quotes: QuoteCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    showAdvancedSearch?: () => void,
    hideCustomer?: boolean,
    isJobs?: boolean
}) => {
    // Data States
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [usersData, setUsersData] = useState<Array<UserResponseData>>([]);
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomerData] = useState<Array<CustomerResponseData>>([]);
    // const [isTicketsLoading, setIsTicketsLoading] = useState(false);
    // const [ticketData, setTicketData] = useState<Array<TicketResponseData>>([]);
    const [isInvoiceRequestsLoading, setIsInvoiceRequestsLoading] = useState(false);
    const [invoiceRequests, setInvoiceRequests] = useState<Array<JobInvoiceRequestResponseData>>([]);

    // Resource Constants
    const resourceName = "quotes";
    const resourceIcon = "request_quote";

    useEffect(() => {
        setIsDepartmentsLoading(true);
        setIsUsersLoading(true);
        !props.hideCustomer && setIsCustomersLoading(true);
        // setIsTicketsLoading(true);
        props.isJobs && setIsInvoiceRequestsLoading(true);
    }, [props.isQuotesLoading])

    useEffect(() => {
        if (props.quotes && props.quotes.data.length > 0) {
            getDepartments([...new Set(props.quotes.data.map(quote => quote.data.department_id))]);
            getUsers([...new Set(props.quotes.data.map(quote => quote.data.created_by_id))]);
            !props.hideCustomer && getCustomers([...new Set(props.quotes.data.map(quote => quote.data.customer_id))]);
            // getTickets([...new Set(props.quotes.data.map(quote => {
            //     return {
            //         ticket_id: quote.data.ticket_id,
            //         ticket_type: quote.data.ticket_type
            //     }
            // }))]);
            props.isJobs && getInvoiceRequests([...new Set(props.quotes.data.map(quote => {
                return {
                    job_number: quote.data.number,
                    department_id: quote.data.department_id
                }
            }))]);
        } else {
            setIsDepartmentsLoading(false);
            setIsUsersLoading(false);
            !props.hideCustomer && setIsCustomersLoading(false);
            // setIsTicketsLoading(false);
            props.isJobs && setIsInvoiceRequestsLoading(false);
        }
    }, [props.quotes, props.hideCustomer, props.isJobs]);

    const getDepartments = (departmentIDs: Array<number>) => {
        getAPI('departments', {
            ids: departmentIDs
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData.data);
        }, setIsDepartmentsLoading);
    }

    const getUsers = (userIDs: Array<number>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUsersData(userData.data)
        }, setIsUsersLoading)
    }

    const getCustomers = (customerIDs: Array<number>) => {
        getAPI('customers', {
            ids: customerIDs
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomerData(customerData.data)
        }, setIsCustomersLoading)
    }

    // const getTickets = (tickets: any) => {
    //     getAPI(`tickets`, {
    //         tickets: tickets
    //     }, (response: any) => {
    //         const ticketData: TicketCollectionResponse = response.data;
    //         setTicketData(ticketData.data)
    //     }, setIsTicketsLoading)   
    // }

    const getInvoiceRequests = (jobs: Array<any>) => {
        getAPI(`job_invoice_requests`, {
            jobs: jobs
        }, (response: any) => {
            const invoiceRequestData: JobInvoiceRequestCollectionResponse = response.data;
            setInvoiceRequests(invoiceRequestData.data);
        }, setIsInvoiceRequestsLoading);
    }

    const isLoading = (
        props.isQuotesLoading || 
        isUsersLoading || 
        isCustomersLoading || 
        // isTicketsLoading || 
        isInvoiceRequestsLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Number', 'Type', 'Originator', 'Customer', 'Description', 'Value', 'Created Date', 'Status'];
        if (props.hideCustomer) {
            var headerIndex = tableHeader.indexOf('Customer');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (props.isJobs) {
            var headerIndex = tableHeader.indexOf('Type');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
            var headerIndex = tableHeader.indexOf('Originator');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
            // var headerIndex = tableHeader.indexOf('Ticket');
            // if (headerIndex !== -1) {
            //     tableHeader.splice(headerIndex, 1);
            // }
        }
        return tableHeader
    }

    return (
        <div>
            <SearchTable
                headers={getTableHeader()}
                isLoading={!(!isLoading && props.quotes)}
                skeletonRow={<QuoteRowSkeleton hideCustomer={props.hideCustomer} isJobs={props.isJobs}/>}
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                count={props.quotes ? props.quotes.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.quotes && props.quotes.data.map((quote, index) => 
                    <QuoteRow
                        quote={quote}
                        department={findDepartment(departmentData, quote.data.department_id)}
                        customer={quote.data.customer_id ? findCustomer(customerData, quote.data.customer_id) : undefined}
                        user={findUser(usersData, quote.data.created_by_id)}
                        // ticket={(quote.data.ticket_id && quote.data.ticket_type) ? findTicket(ticketData, quote.data.ticket_id, quote.data.ticket_type) : undefined}
                        invoiceRequest={findJobInvoiceRequest(invoiceRequests, parseInt(quote.data.number), quote.data.department_id)}
                        hideCustomer={props.hideCustomer}
                        isJobs={props.isJobs}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.quotes) && <PaginationNavigation
                data={props.quotes.data}
                totalCount={props.quotes.total_count}
                perPage={props.quotes.pages.per_page}
                resourceName={resourceName}
                prefix="quotes"    
            />}
        </div>
    )
}

export default QuoteList