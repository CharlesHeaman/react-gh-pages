import { useEffect, useState } from "react"
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import { EngineerEquipmentDetailsCollectionResponse } from "../../../../types/engineerEquipmentDetails.types"
import { TicketCollectionResponse, TicketResponseData } from "../../../../types/tickets.types"
import { UserCollectionResponse, UserResponseData } from "../../../../types/user.types"
import findTicket from "../../../../utils/findTicket"
import findUser from "../../../../utils/findUser"
import getAPI from "../../../../utils/getAPI"
import EngineerEquipmentDetailsRow from "./EngineerEquipmentDetailsRow"
import EngineerEquipmentDetailsRowSkeleton from "./EngineerEquipmentDetailsRowSkeleton"
import { CustomerCollectionResponse, CustomerResponseData } from "../../../../types/customers.types"
import findCustomer from "../../../../utils/findCustomer"

const EngineerEquipmentDetailsList = (props: {
    isEngineerEquipmentDetailsLoading: boolean,
    engineerEquipmentDetails: EngineerEquipmentDetailsCollectionResponse | undefined,
    departmentName: string | undefined,
    perPage: number,
    totalCount?: number,
    hideTicket?: boolean
    hideCustomer?: boolean,
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
    }, [props.isEngineerEquipmentDetailsLoading])

    useEffect(() => {
        if (props.engineerEquipmentDetails && props.engineerEquipmentDetails.data.length > 0) {
            getUsers([...new Set(props.engineerEquipmentDetails.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
            !props.hideTicket && getTickets([...new Set(props.engineerEquipmentDetails.data.map(refrigerantMovement => {
                return {
                    ticket_id: refrigerantMovement.data.ticket_id,
                    ticket_type: refrigerantMovement.data.ticket_type
                }
            }))]);
        } else {
            setIsUsersLoading(false);
            !props.hideTicket && setIsTicketsLoading(false);
        }
    }, [props.engineerEquipmentDetails])

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
        props.isEngineerEquipmentDetailsLoading ||
        isUsersLoading ||
        isTicketsLoading || 
        isCustomersLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Details ID', 'Ticket', 'Customer', 'Recorded By', 'Date', 'Status'];
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
                skeletonRow={<EngineerEquipmentDetailsRowSkeleton hideTicket={props.hideTicket}/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)} 
                count={props.engineerEquipmentDetails ? props.engineerEquipmentDetails.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.engineerEquipmentDetails)}
                body={props.engineerEquipmentDetails && props.engineerEquipmentDetails.data.map((engineerEquipmentDetails, index) => 
                    <EngineerEquipmentDetailsRow
                        engineerEquipmentDetails={engineerEquipmentDetails}
                        user={findUser(userData, engineerEquipmentDetails.data.created_by_id)}
                        customers={customerData}
                        departmentName={props.departmentName}
                        ticket={findTicket(ticketData, engineerEquipmentDetails.data.ticket_id, engineerEquipmentDetails.data.ticket_type)}
                        hideTicket={props.hideTicket}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.engineerEquipmentDetails) && <PaginationNavigation
                data={props.engineerEquipmentDetails.data}
                totalCount={props.engineerEquipmentDetails.total_count}
                perPage={props.engineerEquipmentDetails.pages.per_page}
                resourceName={resourceName}
                prefix="engineer_equipment_details"
            />}
        </div>
    )
}

export default EngineerEquipmentDetailsList