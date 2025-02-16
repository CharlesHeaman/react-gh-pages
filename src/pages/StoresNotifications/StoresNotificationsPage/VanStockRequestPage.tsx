import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer"
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"
import { CustomerResponseData } from "../../../types/customers.types"
import { DepartmentResponseData } from "../../../types/department.types"
import { SiteResponseData } from "../../../types/sites.types"
import { StoresNotificationResponseData } from "../../../types/storesNotifications.types"
import { TicketResponseData } from "../../../types/tickets.types"
import { UserResponseData } from "../../../types/user.types"
import getAPI from "../../../utils/getAPI"
import StoresNotificationLabel from "../../TimeGrids/TimieGridReview/components/StoresNotificationLabel"
import StoresNotificationInformation from "./components/StoresNotificationInformation"
import StoresNotificationInformationSkeleton from "./components/StoresNotificationInformationSkeleton"
import VanStockRequestSideBar from "./components/VanStockRequestSideBar"
import { VehicleCollectionResponse, VehicleResponseData } from "../../../types/vehicles.types"

const VanStockRequestPage = () => {
    const { vanStockRequestID } = useParams();

    // Data States
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isSiteLoading, setIsSiteLoading] = useState(true);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isNotificationsLoading, setIsNotificationsLoading] = useState(true);
    const [storesNotificationData, setStoresNotificationData] = useState<StoresNotificationResponseData>();
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<UserResponseData>();
    const [isTicketLoading, setIsTicketLoading] = useState(true);
    const [ticketData, setTicketData] = useState<TicketResponseData>();
    const [isVehicleLoading, setIsVehicleLoading] = useState(true);
    const [vehicleData, setVehicleData] = useState<VehicleResponseData>();


    useEffect(() => {
        getStoresNotificationData();
    }, [])

    const getStoresNotificationData = () => {
        getAPI(`stores_notifications/${vanStockRequestID}`, {}, (response: any) => {
            const storesNotificationData: StoresNotificationResponseData = response.data;
            setStoresNotificationData(storesNotificationData);
            getRequestedUser(storesNotificationData.data.created_by_id);
            getRequestedTicket(storesNotificationData.data.ticket_id, storesNotificationData.data.ticket_type)
        }, setIsNotificationsLoading)
    }

    const getRequestedUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setUserData(userData);
            getVehicle(userData.id);
        }, setIsUsersLoading)   
    }

    const getVehicle = (userID: number) => {
        getAPI('vehicles', {
            user_ids: [userID]
        }, (response: any) => {
            const vehicleData: VehicleCollectionResponse = response.data;
            setVehicleData(vehicleData.data[0]);
        }, setIsVehicleLoading)   
    }

    const getRequestedTicket = (ticketID: number, ticketType: number) => {
        getAPI(`tickets/${ticketType}/${ticketID}`, {}, (response: any) => {
            const ticketData: TicketResponseData = response.data;
            setTicketData(ticketData);
            getDepartment(ticketData.data.department_id);
            getCustomer(ticketData.data.customer_id);
            getSite(ticketData.data.site_id);
        }, setIsTicketLoading)   
    }

    const getCustomer = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const getSite = (siteID: number) => {
        getAPI(`sites/${siteID}`, {}, (response: any) => {
            const sitesData: SiteResponseData = response.data;
            setSiteData(sitesData);
        }, setIsSiteLoading);
    }

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
    }

    const isHeaderLoading = (
        isNotificationsLoading
    )

    const isLoading = (
        isNotificationsLoading ||
        isUsersLoading || 
        isTicketLoading || 
        isCustomerLoading || 
        isDepartmentLoading || 
        isSiteLoading ||
        isVehicleLoading
    )

    return (
        <>
            <OuterContainer
                title='Van Replenishment Request'
                id={vanStockRequestID}
                headerContent={!isHeaderLoading && storesNotificationData ?
                    <StoresNotificationLabel status={storesNotificationData.data.status}/> :
                    <Skeleton type="label"/>
                }
                maxWidth={800}
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && storesNotificationData && userData && ticketData && customerData && siteData && departmentData ?
                            <StoresNotificationInformation
                                storesNotification={storesNotificationData}
                                user={userData}
                                ticket={ticketData}
                                customer={customerData}
                                site={siteData}
                                department={departmentData}
                                vehicle={vehicleData}
                            /> :
                            <StoresNotificationInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <VanStockRequestSideBar
                            storesNotification={storesNotificationData}                        
                            setVanStockRequestData={setStoresNotificationData}
                            vehicleID={vehicleData?.id}
                        />
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default VanStockRequestPage