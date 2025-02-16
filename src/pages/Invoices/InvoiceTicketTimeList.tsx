import { useEffect, useState } from "react";
import PaginationNavigation from "../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../components/ui/SearchTable/SearchTable";
import { InvoiceTicketTimeCollectionResponse } from "../../types/invoiceTicketTime.types";
import { UserCollectionResponse, UserResponseData } from "../../types/user.types";
import findUser from "../../utils/findUser";
import getAPI from "../../utils/getAPI";
import InvoiceTicketTimeRow from "./InvoiceTicketTimeRow";
import formatHours from "../../utils/formatHours";
import formatMiles from "../../utils/formatMiles";
import formatMoney from "../../utils/formatMoney";

const InvoiceTicketTimeList = (props: {
    isInvoiceTicketTimeLoading: boolean,
    invoiceTicketTime: InvoiceTicketTimeCollectionResponse | undefined,
    perPage: number,
    totalCount?: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);
    // const [isTicketsLoading, setIsTicketsLoading] = useState(true);
    // const [ticketData, setTicketData] = useState<Array<TicketResponseData>>([]);

    // Resource Constants
    const resourceName = "engineer time";
    const resourceIcon = "timer";

    useEffect(() => {
        setIsUsersLoading(true);
        // setIsTicketsLoading(true);
    }, [props.isInvoiceTicketTimeLoading])

    useEffect(() => {
        if (props.invoiceTicketTime && props.invoiceTicketTime.data.length > 0) {
            getUsers([...new Set(props.invoiceTicketTime.data.map(refrigerantMovement => refrigerantMovement.data.user_id))]);
            // getTickets([...new Set(props.invoiceTicketTime.data.map(refrigerantMovement => {
            //     return {
            //         ticket_id: refrigerantMovement.data.ticket_id,
            //         ticket_type: refrigerantMovement.data.ticket_type
            //     }
            // }))]);
        } else {
            setIsUsersLoading(false);
            // setIsTicketsLoading(false);
        }
    }, [props.invoiceTicketTime])

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

    const isLoading = (
        props.isInvoiceTicketTimeLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Date', 'User', 'Rate', 'Type', 'On-site', 'Travel', 'Mileage', 'Expenses']} 
                skeletonRow={<></>} 
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)} 
                count={props.invoiceTicketTime ? props.invoiceTicketTime.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.invoiceTicketTime)}
                body={props.invoiceTicketTime && props.invoiceTicketTime.data.map((invoiceTicketTime, index) => 
                    <InvoiceTicketTimeRow
                        invoiceTicketTime={invoiceTicketTime}
                        user={findUser(userData, invoiceTicketTime.data.user_id)}
                        key={index}
                    />
                )}
                footer={
                    props.invoiceTicketTime ?
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <th>{formatHours(props.invoiceTicketTime.data.reduce((totalHours, invoiceTime) => totalHours + invoiceTime.data.on_site_time, 0))} hrs</th>
                            <th>{formatHours(props.invoiceTicketTime.data.reduce((totalHours, invoiceTime) => totalHours + invoiceTime.data.travel_time, 0))} hrs</th>
                            <th>{formatMiles(props.invoiceTicketTime.data.reduce((totalMiles, invoiceTime) => totalMiles + invoiceTime.data.mileage, 0))} mi</th>
                            <th>{formatMoney(props.invoiceTicketTime.data.reduce((totalExpenses, invoiceTime) => totalExpenses + invoiceTime.data.expenses, 0))}</th>
                        </tr> :
                        null
                    
                }

            />
            {(!isLoading && props.invoiceTicketTime) && <PaginationNavigation
                data={props.invoiceTicketTime.data}
                totalCount={props.invoiceTicketTime.total_count}
                perPage={props.invoiceTicketTime.pages.per_page}
                resourceName={resourceName}
                prefix="invoice_ticket_time"
            />}
        </div>
    )
}

export default InvoiceTicketTimeList