import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import { StoresNotificationCollectionResponse } from "../../../types/storesNotifications.types";
import getAPI from "../../../utils/getAPI";

const OutstandingVanReplenishmentRequestWidget = () => {
    // Data States
    const [isNotificationsLoading, setIsNotificationsLoading] = useState(false);
    const [notificationData, setNotificationsData] = useState<StoresNotificationCollectionResponse>();

    useEffect(() => {
        getEngineers();
    }, []);

    const getEngineers = () => {
        getAPI('stores_notifications', {
            status: 0,
            perPage: 1
        }, (response: any) => {
            const notificationData: StoresNotificationCollectionResponse = response.data;
            setNotificationsData(notificationData);
        }, setIsNotificationsLoading);
    }

    return (
        <DashboardWidget 
            title="Van Replenishment Requests"
            count={notificationData?.total_count}
            text="Outstanding requests."
            iconFont={"minor_crash"} 
            negative
            to={"../van_stock_requests"}                                    
        />
    )
}

export default OutstandingVanReplenishmentRequestWidget;