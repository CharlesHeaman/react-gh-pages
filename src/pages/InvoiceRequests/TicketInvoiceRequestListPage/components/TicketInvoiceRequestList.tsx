import { useEffect, useState } from "react"
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import { CustomerCollectionResponse, CustomerResponseData } from "../../../../types/customers.types"
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../../types/department.types"
import { TicketInvoiceRequestCollectionResponse } from "../../../../types/TicketInvoiceRequest.types"
import { TicketCollectionResponse, TicketResponseData } from "../../../../types/tickets.types"
import { UserCollectionResponse, UserResponseData } from "../../../../types/user.types"
import findDepartment from "../../../../utils/findDepartment"
import findNumberTicket from "../../../../utils/findNumberTicket"
import findUser from "../../../../utils/findUser"
import getAPI from "../../../../utils/getAPI"
import TicketInvoiceRequestRow from "./TicketInvoiceRequestRow"
import InvoiceRequestRowSkeleton from "./TicketInvoiceRequestRowSkeleton"

const TicketInvoiceRequestList = (props: {
    isTicketInvoiceRequestsLoading: boolean,
    ticketInvoiceRequests: TicketInvoiceRequestCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    showAdvancedSearch?: () => void
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [usersData, setUsersData] = useState<Array<UserResponseData>>([]);
    const [isTicketLoading, setIsTicketLoading] = useState(false);
    const [ticketData, setTicketData] = useState<Array<TicketResponseData>>([]);
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomerData] = useState<Array<CustomerResponseData>>([]);

    // Resource Constants
    const resourceName = "ticket invoice requests";
    const resourceIcon = "credit_card";


    useEffect(() => {
        setIsUsersLoading(true);
        setIsTicketLoading(true);
        setIsDepartmentsLoading(true);
        setIsCustomersLoading(true);
    }, [props.isTicketInvoiceRequestsLoading])

    useEffect(() => {
        if (props.ticketInvoiceRequests && props.ticketInvoiceRequests.data.length > 0) {
            getUsers([...new Set(props.ticketInvoiceRequests.data.map(ticketInvoiceRequest => ticketInvoiceRequest.data.created_by_id))]);
            getDepartments([...new Set(props.ticketInvoiceRequests.data.map(ticketInvoiceRequest => ticketInvoiceRequest.data.department_id))]);
            getTickets([...new Set(props.ticketInvoiceRequests.data.map(ticketInvoiceRequest => {
                return {
                    ticket_number: ticketInvoiceRequest.data.ticket_number,
                    ticket_type: ticketInvoiceRequest.data.ticket_type,
                    department_id: ticketInvoiceRequest.data.department_id
                }
            }))]);
    } else {
            setIsUsersLoading(false);
            setIsTicketLoading(false);
            setIsDepartmentsLoading(false);
            setIsCustomersLoading(false);
        }
    }, [props.ticketInvoiceRequests])

    const getUsers = (userIDs: Array<number>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUsersData(userData.data)
        }, setIsUsersLoading)
    }

    const getTickets = (tickets: any) => {
        getAPI(`tickets`, {
            number_tickets: tickets
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData.data)
            if (ticketData.data.length > 0) {
                getCustomers([...new Set(ticketData.data.map(ticket => ticket.data.customer_id))]);
            } else {
                setIsCustomersLoading(false);
            }
        }, setIsTicketLoading)   
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
        props.isTicketInvoiceRequestsLoading || 
        isUsersLoading || 
        isTicketLoading || 
        isCustomersLoading || 
        isDepartmentsLoading
    )

    return (
        <div>
            <SearchTable
                headers={['Request ID', 'Department', 'Ticket', 'Customer', 'Created By', 'Requested Value', 'Requested Date', 'Status']}
                isLoading={!(!isLoading && props.ticketInvoiceRequests)}
                skeletonRow={<InvoiceRequestRowSkeleton/>}
                count={props.ticketInvoiceRequests ? props.ticketInvoiceRequests.data.length : 0}
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.ticketInvoiceRequests && props.ticketInvoiceRequests.data.map((ticketInvoiceRequest, index) => 
                    <TicketInvoiceRequestRow
                        ticketInvoiceRequest={ticketInvoiceRequest}
                        customers={customerData}
                        department={findDepartment(departmentData, ticketInvoiceRequest.data.department_id)}
                        ticket={findNumberTicket(ticketData, ticketInvoiceRequest.data.ticket_number, ticketInvoiceRequest.data.ticket_type, ticketInvoiceRequest.data.department_id)}
                        user={findUser(usersData, ticketInvoiceRequest.data.created_by_id)}
                        key={index} 
                    />
                )}
            />
            {(!isLoading && props.ticketInvoiceRequests) && <PaginationNavigation
                data={props.ticketInvoiceRequests.data}
                totalCount={props.ticketInvoiceRequests.total_count}
                perPage={props.ticketInvoiceRequests.pages.per_page}
                resourceName={resourceName}
                prefix={"ticket_invoice_requests"}
            />}
        </div>
    )
}

export default TicketInvoiceRequestList