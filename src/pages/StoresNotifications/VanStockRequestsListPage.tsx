import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer"
import Header from "../../components/ui/Structure/Header/Header"
import { StoresNotificationCollectionResponse } from "../../types/storesNotifications.types"
import getAPI from "../../utils/getAPI"
import VanStockRequestList from "./components/VanStockRequestList"
import VanStockRequestSearchHeader from "./components/VanStockRequestSearchHeader"
import getVanStockRequestSearchParams from "./utils/getVanStockRequestSearchParams"

const VanStockRequestsListPage = () => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isNotificationsLoading, setIsNotificationsLoading] = useState(true);
    const [storesNotificationData, setStoresNotificationData] = useState<StoresNotificationCollectionResponse>();

    const vanStockRequestSearchParams = getVanStockRequestSearchParams(searchParams);

    useEffect(() => {
        searchStoresNotifications();
    }, [JSON.stringify(vanStockRequestSearchParams)])

    const searchStoresNotifications = () => {
        getAPI('stores_notifications', vanStockRequestSearchParams, (response: any) => {
            const storesNotificationData: StoresNotificationCollectionResponse = response.data;
            setStoresNotificationData(storesNotificationData);
        }, setIsNotificationsLoading)
    }
    
    return (
        <>
            <OuterContainer
                title='Van Replenishment Requests'
                maxWidth={1200}
                description="Process engineer Van Replenishment Requests."
                noBorder
            >
                <VanStockRequestSearchHeader/>
                <VanStockRequestList
                    isRequestsLoading={isNotificationsLoading}
                    storesNotificationData={storesNotificationData}
                    perPage={vanStockRequestSearchParams.perPage}
                />
            </OuterContainer>
        </>
    )
}

export default VanStockRequestsListPage