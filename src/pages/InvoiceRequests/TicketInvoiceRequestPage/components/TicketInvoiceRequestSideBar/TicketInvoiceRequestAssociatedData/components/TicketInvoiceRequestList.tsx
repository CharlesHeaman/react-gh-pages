import { useState, useEffect } from "react";
import PaginationNavigation from "../../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../../components/ui/SearchTable/SearchTable";
import { TicketInvoiceRequestActivityCollectionResponse } from "../../../../../../../types/ticketInvoiceRequestActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../../../types/user.types";
import findUser from "../../../../../../../utils/findUser";
import getAPI from "../../../../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import TicketInvoiceRequestActivityRow from "./TicketInvoiceRequestActivityRow";

const TicketInvoiceRequestActivityList = (props: {
    isTicketInvoiceRequestActivityLoading: boolean,
    ticketInvoiceRequestActivity: TicketInvoiceRequestActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "ticket invoice request history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isTicketInvoiceRequestActivityLoading])

    useEffect(() => {
        if (props.ticketInvoiceRequestActivity && props.ticketInvoiceRequestActivity.data.length > 0) {
            getUsers([...new Set(props.ticketInvoiceRequestActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.ticketInvoiceRequestActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isTicketInvoiceRequestActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.ticketInvoiceRequestActivity ? props.ticketInvoiceRequestActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.ticketInvoiceRequestActivity)}
                body={props.ticketInvoiceRequestActivity && props.ticketInvoiceRequestActivity.data.map((ticketInvoiceRequestActivity, index) => 
                    <TicketInvoiceRequestActivityRow
                        ticketInvoiceRequestActivity={ticketInvoiceRequestActivity}
                        user={findUser(userData, ticketInvoiceRequestActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.ticketInvoiceRequestActivity) && <PaginationNavigation
                data={props.ticketInvoiceRequestActivity.data}
                totalCount={props.ticketInvoiceRequestActivity.total_count}
                perPage={props.ticketInvoiceRequestActivity.pages.per_page}
                resourceName={resourceName}
                prefix="ticket_invoice_request_history"
            />}
        </div>
    )
}

export default TicketInvoiceRequestActivityList