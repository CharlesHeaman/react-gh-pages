import { useEffect, useState } from "react";
import PaginationNavigation from "../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../components/ui/SearchTable/SearchTable";
import { GasBottleActivityCollectionResponse } from "../../types/gasBottleActivity";
import { UserCollectionResponse, UserResponseData } from "../../types/user.types";
import findUser from "../../utils/findUser";
import getAPI from "../../utils/getAPI";
import RefrigerantMovementRowSkeleton from "../RefrigerantMovements/components/RefrigerantMovementList/RefrigerantMovementRowSkeleton";
import GasBottleActivityRow from "./components/GasBottleActivityRow";


const GasBottleActivityList = (props: {
    isGasBottleActivityLoading: boolean,
    gasBottleActivity: GasBottleActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number,
    isConsumable?: boolean,
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);
    // const [isTicketsLoading, setIsTicketsLoading] = useState(true);
    // const [ticketData, setTicketData] = useState<Array<TicketResponseData>>([]);

    // Resource Constants
    const resourceName = "bottle history";
    const resourceIcon = "propane_tank";

    useEffect(() => {
        setIsUsersLoading(true);
        // setIsTicketsLoading(true);
    }, [props.isGasBottleActivityLoading])

    useEffect(() => {
        if (props.gasBottleActivity && props.gasBottleActivity.data.length > 0) {
            getUsers([...new Set(props.gasBottleActivity.data.map(refrigerantMovement => [refrigerantMovement.data.performed_by_id, refrigerantMovement.data.assigned_to_id]).flat(1))]);
            
            // getTickets([...new Set(props.gasBottleActivity.data.map(refrigerantMovement => {
            //     return {
            //         ticket_id: refrigerantMovement.data.ticket_id,
            //         ticket_type: refrigerantMovement.data.ticket_type
            //     }
            // }))]);
        } else {
            setIsUsersLoading(false);
            // setIsTicketsLoading(false);
        }
    }, [props.gasBottleActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    // const getTickets = (tickets: any) => {
    //     getAPI(`tickets`, {
    //         tickets: tickets
    //     }, (response: any) => {
    //         const ticketData: TicketCollectionResponse = response.data;
    //         setTicketData(ticketData.data)
    //     }, setIsTicketsLoading)   
    // }

    const getTableHeader = () => {
        var tableHeader = ['Action', 'Performed By', 'Refrigerant Weight', 'Assigned To', 'Date'];
        if (props.isConsumable) {
            var headerIndex = tableHeader.indexOf('Refrigerant Weight');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        return tableHeader
    }

    const isLoading = (
        props.isGasBottleActivityLoading
    )

    return (
        <div>
            <SearchTable 
                headers={getTableHeader()} 
                skeletonRow={<RefrigerantMovementRowSkeleton isConsumable={props.isConsumable}/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.gasBottleActivity ? props.gasBottleActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.gasBottleActivity)}
                body={props.gasBottleActivity && props.gasBottleActivity.data.map((gasBottleActivity, index) => 
                    <GasBottleActivityRow
                        gasBottleActivity={gasBottleActivity}
                        user={findUser(userData, gasBottleActivity.data.performed_by_id)}
                        engineer={findUser(userData, gasBottleActivity.data.assigned_to_id)}
                        isConsumable={props.isConsumable}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.gasBottleActivity) && <PaginationNavigation
                data={props.gasBottleActivity.data}
                totalCount={props.gasBottleActivity.total_count}
                perPage={props.gasBottleActivity.pages.per_page}
                resourceName={resourceName}
                prefix="bottle_history"
            />}
        </div>
    )
}

export default GasBottleActivityList