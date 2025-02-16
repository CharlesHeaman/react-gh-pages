import { useEffect, useState } from "react"
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { StoresNotificationCollectionResponse } from "../../../types/storesNotifications.types";
import { TicketResponseData, TicketCollectionResponse } from "../../../types/tickets.types";
import { UserResponseData, UserCollectionResponse } from "../../../types/user.types";
import findTicket from "../../../utils/findTicket";
import findUser from "../../../utils/findUser";
import getAPI from "../../../utils/getAPI";
import StoresNotificationRow from "./StoresNotfificationRow";
import VanStockRequestRowSkeleton from "./StoresNotfificationRowSkeleton";
import { CustomerResponseData, CustomerCollectionResponse } from "../../../types/customers.types";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";


const VanStockRequestList = (props: {
    isRequestsLoading: boolean,
    storesNotificationData: StoresNotificationCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    showAdvancedSearch?: () => void,
    hideTicket?: boolean

}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);
    const [isTicketLoading, setIsTicketLoading] = useState(false);
    const [ticketData, setTicketData] = useState<Array<TicketResponseData>>([]);
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomersData] = useState<Array<CustomerResponseData>>([]);
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);

    // Resource Constants
    const resourceName = "van replenishment requests";
    const resourceIcon = "minor_crash"

    useEffect(() => {
        setIsUsersLoading(true)
        !props.hideTicket && setIsTicketLoading(true)
    }, [props.isRequestsLoading])

    useEffect(() => {
        if (props.storesNotificationData && props.storesNotificationData.data.length > 0) {
            getRequestedUsers([...new Set(props.storesNotificationData.data.map(storesNotification => storesNotification.data.created_by_id))]);
            !props.hideTicket && getRequestedTickets([...new Set(props.storesNotificationData.data.map(storesNotification => {
                return {
                    ticket_id: storesNotification.data.ticket_id,
                    ticket_type: storesNotification.data.ticket_type
                }
            }))]);
    } else {
            setIsUsersLoading(false)
            !props.hideTicket && setIsTicketLoading(false)
        }
    }, [props.storesNotificationData])

    const getRequestedUsers = (userIDs: Array<number>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)   
    }

    const getRequestedTickets = (tickets: any) => {
        getAPI(`tickets`, {
            tickets: tickets
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData.data);
            if (ticketData.data.length > 0) {
                getDepartments([...new Set(ticketData.data.map(ticket => ticket.data.department_id))]);
                getCustomers([...new Set(ticketData.data.map(ticket => ticket.data.customer_id))]);
            }
        }, setIsTicketLoading);
    }

    const getDepartments = (departmentIDs: Array<number>) => {
        getAPI('departments', {
            ids: departmentIDs
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData.data)
        }, setIsDepartmentsLoading)   
    }

    const getCustomers = (customerIDs: Array<number>) => {
        getAPI('customers', {
            ids: customerIDs
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomersData(customerData.data)
        }, setIsCustomersLoading)
    }

    const isLoading = (
        props.isRequestsLoading ||
        isTicketLoading ||
        isUsersLoading || 
        isCustomersLoading ||
        isDepartmentsLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Request ID', 'Ticket', 'Customer', 'Requested By', 'Date', 'Status'];
        if (props.hideTicket) {
            var headerIndex = tableHeader.indexOf('Ticket');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
            headerIndex = tableHeader.indexOf('Customer');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        return tableHeader
    }


    return (
        <div>
            <SearchTable
                headers={getTableHeader()}
                isLoading={!(!isLoading && props.storesNotificationData)}
                skeletonRow={<VanStockRequestRowSkeleton hideTicket={props.hideTicket}/>}
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                count={props.storesNotificationData ? props.storesNotificationData.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.storesNotificationData && props.storesNotificationData.data.map((storesNotification, index) => 
                    <StoresNotificationRow
                        storesNotification={storesNotification}
                        user={findUser(userData, storesNotification.data.created_by_id)}
                        customers={customerData}
                        ticket={findTicket(ticketData, storesNotification.data.ticket_id, storesNotification.data.ticket_type)}
                        departments={departmentData}
                        hideTicket={props.hideTicket}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.storesNotificationData) && <PaginationNavigation
                data={props.storesNotificationData.data}
                totalCount={props.storesNotificationData.total_count}
                perPage={props.storesNotificationData.pages.per_page}
                resourceName={resourceName}
                prefix="stores_notifications"
            />}
        </div>
    )
}

export default VanStockRequestList