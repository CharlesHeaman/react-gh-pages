import { useState, useEffect } from "react";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { CustomerResponseData, CustomerCollectionResponse } from "../../../types/customers.types";
import { SiteCollectionResponse, SiteResponseData } from "../../../types/sites.types";
import { TicketInvoiceRequestCollectionResponse, TicketInvoiceRequestResponseData } from "../../../types/TicketInvoiceRequest.types";
import { TicketCollectionResponse } from "../../../types/tickets.types"
import findCustomer from "../../../utils/findCustomer";
import findSite from "../../../utils/findSite";
import findTicketInvoiceRequest from "../../../utils/findTicketInvoiceRequest";
import getAPI from "../../../utils/getAPI";
import TicketRow from "./TicketRow"
import TicketRowSkeleton from "./TicketRowSkeleton"
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";
import findDepartment from "../../../utils/findDepartment";
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";

const TicketList = (props: {
    isTicketsLoading: boolean,
    tickets: TicketCollectionResponse | undefined,
    hideVisitDate?: boolean,
}) => {
    // Data States
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomerData] = useState<Array<CustomerResponseData>>([]);
    const [isSitesLoading, setIsSiteLoading] = useState(false);
    const [sitesData, setSitesData] = useState<Array<SiteResponseData>>([]);
    const [isInvoiceRequestsLoading, setIsInvoiceRequestsLoading] = useState(false);
    const [invoiceRequests, setInvoiceRequests] = useState<Array<TicketInvoiceRequestResponseData>>([]);

    // Resource Constants
    const resourceName = "tickets";
    const resourceIcon = "local_activity";

    useEffect(() => {
        setIsDepartmentsLoading(true);
        setIsCustomersLoading(true);
        setIsSiteLoading(true);
        setIsInvoiceRequestsLoading(true);
    }, [props.isTicketsLoading])

    useEffect(() => {
        if (props.tickets && props.tickets.data.length > 0) {
            getDepartments([...new Set(props.tickets.data.map(ticket => ticket.data.department_id))]);
            getCustomers([...new Set(props.tickets.data.map(ticket => ticket.data.customer_id))]);
            getSites([...new Set(props.tickets.data.map(ticket => ticket.data.site_id))]);
            getInvoiceRequests([...new Set(props.tickets.data.map(ticket => {
                return {
                    ticket_number: ticket.data.number,
                    department_id: ticket.data.department_id
                }
            }))]);
        } else {
            setIsDepartmentsLoading(false);
            setIsCustomersLoading(false);
            setIsSiteLoading(false);
            setIsInvoiceRequestsLoading(false);
        }
    }, [props.tickets]);

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

    const getSites = (siteIDs: Array<number>) => {
        getAPI(`sites`, {
            ids: siteIDs,
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSitesData(siteData.data);
        }, setIsSiteLoading);
    }

    const getInvoiceRequests = (tickets: Array<any>) => {
        getAPI(`ticket_invoice_requests`, {
            tickets: tickets
        }, (response: any) => {
            const invoiceRequestData: TicketInvoiceRequestCollectionResponse = response.data;
            setInvoiceRequests(invoiceRequestData.data);
        }, setIsInvoiceRequestsLoading);
    }

    const isLoading = (
        props.isTicketsLoading || 
        isCustomersLoading || 
        isSitesLoading || 
        isInvoiceRequestsLoading || 
        isDepartmentsLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Number', 'Customer', 'Site', 'Job Description', 'Estimated Time', 'Visit Date', 'Status'];
        if (props.hideVisitDate) {
            var headerIndex = tableHeader.indexOf('Visit Date');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        return tableHeader
    }

    return (
        <>
            <SearchTable
                headers={getTableHeader()}
                isLoading={!(!isLoading && props.tickets)}
                skeletonRow={<TicketRowSkeleton hideVisitDate={props.hideVisitDate}/>}
                skeletonCount={10}
                count={props.tickets ? props.tickets.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.tickets && props.tickets.data.map((ticket, index) => 
                    <TicketRow
                        ticket={ticket}
                        department={findDepartment(departmentData, ticket.data.department_id)}
                        customer={findCustomer(customerData, ticket.data.customer_id)}
                        site={ticket.data.site_id ? findSite(sitesData, ticket.data.site_id) : undefined}
                        invoiceRequest={findTicketInvoiceRequest(invoiceRequests, ticket.data.number, ticket.data.department_id)}
                        hideVisitDate={props.hideVisitDate}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.tickets) && <PaginationNavigation
                data={props.tickets.data}
                totalCount={props.tickets.total_count}
                perPage={props.tickets.pages.per_page}
                resourceName={resourceName}
                prefix="tickets"    
            />}

        </>
    )
}

export default TicketList