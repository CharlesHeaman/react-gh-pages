import { useEffect, useState } from "react"
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../../types/department.types"
import { RefrigerantMovementCollectionResponse } from "../../../../types/refrigerantMovement.types"
import { TicketCollectionResponse, TicketResponseData } from "../../../../types/tickets.types"
import { UserCollectionResponse, UserResponseData } from "../../../../types/user.types"
import findTicket from "../../../../utils/findTicket"
import findUser from "../../../../utils/findUser"
import getAPI from "../../../../utils/getAPI"
import RefrigerantMovementRow from "./RefrigerantMovementRow"
import RefrigerantMovementRowSkeleton from "./RefrigerantMovementRowSkeleton"

const RefrigerantMovementList = (props: {
    isRefrigerantMovementsLoading: boolean,
    refrigerantMovements: RefrigerantMovementCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);
    const [isTicketsLoading, setIsTicketsLoading] = useState(true);
    const [ticketData, setTicketData] = useState<Array<TicketResponseData>>([]);
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);

    // Resource Constants
    const resourceName = "refrigerant movements";
    const resourceShortName = "movements"
    const resourceIcon = "propane";

    useEffect(() => {
        setIsUsersLoading(true);
        setIsTicketsLoading(true);
    }, [props.isRefrigerantMovementsLoading])

    useEffect(() => {
        if (props.refrigerantMovements && props.refrigerantMovements.data.length > 0) {
            getUsers([...new Set(props.refrigerantMovements.data.map(refrigerantMovement => refrigerantMovement.data.engineer_id))]);
            getTickets([...new Set(props.refrigerantMovements.data.map(refrigerantMovement => {
                return {
                    ticket_id: refrigerantMovement.data.ticket_id,
                    ticket_type: refrigerantMovement.data.ticket_type
                }
            }))]);
        } else {
            setIsUsersLoading(false);
            setIsTicketsLoading(false);
        }
    }, [props.refrigerantMovements])

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
            if (ticketData.data.length > 0) {
                getDepartments([...new Set(ticketData.data.map(ticket => ticket.data.department_id))]);
            }
        }, setIsTicketsLoading)   
    }

    const getDepartments = (departmentIDs: Array<number>) => {
        getAPI('departments', {
            ids: departmentIDs
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData.data)
        }, setIsDepartmentsLoading)   
    }

    const isLoading = (
        props.isRefrigerantMovementsLoading ||
        isUsersLoading ||
        isTicketsLoading || 
        isDepartmentsLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Direction', 'Ticket', 'Weight', 'Engineer', 'Date']} 
                skeletonRow={<RefrigerantMovementRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.refrigerantMovements ? props.refrigerantMovements.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.refrigerantMovements)}
                body={props.refrigerantMovements && props.refrigerantMovements.data.map((refrigerantMovement, index) => 
                    <RefrigerantMovementRow
                        refrigerantMovement={refrigerantMovement}
                        user={findUser(userData, refrigerantMovement.data.engineer_id)}
                        ticket={findTicket(ticketData, refrigerantMovement.data.ticket_id, refrigerantMovement.data.ticket_type)}
                        departments={departmentData}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.refrigerantMovements) && <PaginationNavigation
                data={props.refrigerantMovements.data}
                totalCount={props.refrigerantMovements.total_count}
                perPage={props.refrigerantMovements.pages.per_page}
                resourceName={resourceShortName}
                prefix="refrigerant_movements"
            />}
        </div>
    )
}

export default RefrigerantMovementList