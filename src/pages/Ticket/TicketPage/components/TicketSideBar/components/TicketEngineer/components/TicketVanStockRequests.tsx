import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { StoresNotificationCollectionResponse } from "../../../../../../../../types/storesNotifications.types";
import getAPI from "../../../../../../../../utils/getAPI";
import VanStockRequestList from "../../../../../../../StoresNotifications/components/VanStockRequestList";
import getVanStockRequestSearchParams from "../../../../../../../StoresNotifications/utils/getVanStockRequestSearchParams";

const TicketVanStockRequests = (props: {
    tickets: Array<any>,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isNotificationsLoading, setIsNotificationsLoading] = useState(true);
    const [storesNotificationData, setStoresNotificationData] = useState<StoresNotificationCollectionResponse>();

    const vanStockRequestSearchParams = getVanStockRequestSearchParams(searchParams);

    useEffect(() => {
        searchStoresNotifications();
    }, [JSON.stringify(vanStockRequestSearchParams)])

    const searchStoresNotifications = () => {
        getAPI('stores_notifications', {
            ...vanStockRequestSearchParams,
            tickets: props.tickets,
        }, (response: any) => {
            const storesNotificationData: StoresNotificationCollectionResponse = response.data;
            setStoresNotificationData(storesNotificationData);
        }, setIsNotificationsLoading)
    }

    return (
        <WindowOverlay 
            title={"Van Replenishment Requests"} 
            maxWidth={500} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <VanStockRequestList
                isRequestsLoading={isNotificationsLoading}
                storesNotificationData={storesNotificationData}
                perPage={vanStockRequestSearchParams.perPage}
                hideTicket
            />
        </WindowOverlay>
    )
}

export default TicketVanStockRequests