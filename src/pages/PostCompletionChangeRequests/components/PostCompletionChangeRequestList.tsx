import { useEffect, useState } from "react"
import { PostCompletionChangeRequestCollectionResponse } from "../../../types/postCompletionChangeRequets.types";
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { TicketResponseData, TicketCollectionResponse } from "../../../types/tickets.types";
import { UserResponseData, UserCollectionResponse } from "../../../types/user.types";
import findTicket from "../../../utils/findTicket";
import findUser from "../../../utils/findUser";
import getAPI from "../../../utils/getAPI";
import PostCompletionChangeRequestsRowSkeleton from "./PostCompletionChangeRequestRowSkeleton";
import PostCompletionChangeRequestRow from "./PostCompletionChangeRequestRow";
import { CustomerCollectionResponse, CustomerResponseData } from "../../../types/customers.types";

const PostCompletionChangeRequestList = (props: {
    isPostCompletionChangeRequestsLoading: boolean,
    postCompletionChangeRequests: PostCompletionChangeRequestCollectionResponse | undefined,
    departmentName: string | undefined,
    perPage: number,
    totalCount?: number,
    hideTicket?: boolean
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);
    const [isTicketsLoading, setIsTicketsLoading] = useState(false);
    const [ticketData, setTicketData] = useState<Array<TicketResponseData>>([]);
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomersData] = useState<Array<CustomerResponseData>>([]);

    // Resource Constants
    const resourceName = "engineer equipment details";
    const resourceIcon = "local_laundry_service";

    useEffect(() => {
        setIsUsersLoading(true);
        !props.hideTicket && setIsTicketsLoading(true);
    }, [props.isPostCompletionChangeRequestsLoading])

    useEffect(() => {
        if (props.postCompletionChangeRequests && props.postCompletionChangeRequests.data.length > 0) {
            getUsers([...new Set(props.postCompletionChangeRequests.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
            !props.hideTicket && getTickets([...new Set(props.postCompletionChangeRequests.data.map(refrigerantMovement => {
                return {
                    ticket_id: refrigerantMovement.data.ticket_id,
                    ticket_type: refrigerantMovement.data.ticket_type
                }
            }))]);
        } else {
            setIsUsersLoading(false);
            !props.hideTicket && setIsTicketsLoading(false);
        }
    }, [props.postCompletionChangeRequests])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const getTickets = (tickets: any) => {
        getAPI(`tickets`, {
            tickets: tickets
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData.data);
            getCustomers([...new Set(ticketData.data.map(ticket => ticket.data.customer_id))]);
        }, setIsTicketsLoading); 
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
        props.isPostCompletionChangeRequestsLoading ||
        isUsersLoading ||
        isTicketsLoading || 
        isCustomersLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Request ID', 'Ticket', 'Customer', 'Recorded By', 'Date', 'Status'];
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
                skeletonRow={<PostCompletionChangeRequestsRowSkeleton hideTicket={props.hideTicket}/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)} 
                count={props.postCompletionChangeRequests ? props.postCompletionChangeRequests.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.postCompletionChangeRequests)}
                body={props.postCompletionChangeRequests && props.postCompletionChangeRequests.data.map((postCompletionChangeRequest, index) => 
                    <PostCompletionChangeRequestRow
                        postCompletionChangeRequest={postCompletionChangeRequest}
                        user={findUser(userData, postCompletionChangeRequest.data.created_by_id)}
                        customers={customerData}
                        departmentName={props.departmentName}
                        ticket={findTicket(ticketData, postCompletionChangeRequest.data.ticket_id, postCompletionChangeRequest.data.ticket_type)}
                        hideTicket={props.hideTicket}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.postCompletionChangeRequests) && <PaginationNavigation
                data={props.postCompletionChangeRequests.data}
                totalCount={props.postCompletionChangeRequests.total_count}
                perPage={props.postCompletionChangeRequests.pages.per_page}
                resourceName={resourceName}
                prefix="post_completion_change_requests"
            />}
        </div>
    )
}

export default PostCompletionChangeRequestList