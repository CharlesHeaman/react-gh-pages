import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import Skeleton from "../../components/ui/General/Skeleton/Skeleton";
import { CustomerResponseData } from "../../types/customers.types";
import { DepartmentResponseData } from "../../types/department.types";
import { EngineerEquipmentDetailsResponseData } from "../../types/engineerEquipmentDetails.types";
import { SiteResponseData } from "../../types/sites.types";
import { TicketResponseData } from "../../types/tickets.types";
import { TicketUploadCollectionResponse } from "../../types/ticketUploads.types";
import { UserCollectionResponse, UserResponseData } from "../../types/user.types";
import getAPI from "../../utils/getAPI";
import EngineerEquipmentDetailsInformation from "./components/EngineerEquipmentDetailsInformation";
import EngineerEquipmentDetailsInformationSkeleton from "./components/EngineerEquipmentDetailsInformationSkeleton";
import EngineerEquipmentDetailsSideBar from "./components/EngineerEquipmentDetailsSideBar";
import EngineerEquipmentDetailsStatus from "./components/EngineerEquipmentDetailsStatus";
import { EngineerEquipmentDetailsActivity, EngineerEquipmentDetailsActivityCollectionResponse, EngineerEquipmentDetailsActivityResponseData } from "../../types/engineerEquipmentDetailsActivity.types";

const EngineerEquipmentDetailsPage = () => {
    const { engineerEquipmentDetailsID } = useParams();

    // Data States
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isSiteLoading, setIsSiteLoading] = useState(true);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isEngineerEquipmentDetailsLoading, setIsEngineerEquipmentDetailsLoading] = useState(true);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [isTicketLoading, setIsTicketLoading] = useState(true);
    const [isUploadsLoading, setIsUploadsLoading] = useState(true);
    const [isUploadUserDataLoading, setIsUploadUserDataLoading] = useState(true);
    const [uploadUserData, setUploadUserData] = useState<Array<UserResponseData>>([]);
    const [engineerEquipmentDetails, setEngineerEquipmentDetails] = useState<EngineerEquipmentDetailsResponseData>();
    const [userData, setUserData] = useState<UserResponseData>();
    const [ticketData, setTicketData] = useState<TicketResponseData>();
    const [uploadData, setUploadData] = useState<TicketUploadCollectionResponse>();
    const [isProcessedActivityLoading, setIsProcessedActivityLoading] = useState(false);
    const [processedActivityData, setProcessedActivityData] = useState<EngineerEquipmentDetailsActivityResponseData>();

    useEffect(() => {
        getEngineerEquipmentDetailsData();
    }, [engineerEquipmentDetailsID]);

    useEffect(() => {
        if (engineerEquipmentDetails === undefined) return;
        if (engineerEquipmentDetails.data.is_processed) getProcessedActivity(engineerEquipmentDetails.id);
    }, [engineerEquipmentDetails?.data.is_processed]);

    const getEngineerEquipmentDetailsData = () => {
        getAPI(`engineer_equipment_details/${engineerEquipmentDetailsID}`, {}, (response: any) => {
            const engineerEquipmentDetailsData: EngineerEquipmentDetailsResponseData = response.data;
            setEngineerEquipmentDetails(engineerEquipmentDetailsData);
            getUserData(engineerEquipmentDetailsData.data.created_by_id);
            getTicketData(engineerEquipmentDetailsData.data.ticket_type, engineerEquipmentDetailsData.data.ticket_id);
        }, setIsEngineerEquipmentDetailsLoading);
    }

    const getUserData = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setUserData(userData)
        }, setIsUserLoading);
    }

    const getTicketData = (ticketType: number, ticketID: number) => {
        getAPI(`tickets/${ticketType}/${ticketID}`, {}, (response: any) => {
            const ticketData: TicketResponseData = response.data;
            setTicketData(ticketData)
            getTicketUploads(ticketData.data.ticket_type, ticketData.id);
            getDepartment(ticketData.data.department_id);
            getCustomer(ticketData.data.customer_id);
            getSite(ticketData.data.site_id);
        }, setIsTicketLoading);
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

    const getTicketUploads = (ticketType: number, ticketID: number) => {
        getAPI(`ticket_uploads`, {
            tickets: [{
                ticket_id: ticketID,
                ticket_type: ticketType
            }]
        }, (response: any) => {
            const uploadData: TicketUploadCollectionResponse = response.data;
            setUploadData(uploadData);
            getUploadUserData([...new Set(uploadData.data.map((upload) => upload.data.uploaded_by_id))]);
        }, setIsUploadsLoading);
    }
    
    const getUploadUserData = (userIDs: Array<number>) => {
        getAPI(`users`, {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUploadUserData(userData.data)
        }, setIsUploadUserDataLoading);
    }

    const getProcessedActivity = (engineerEquipmentDetailsActivityID: number) => {
        getAPI(`engineer_equipment_details_activity`, {
            engineer_equipment_details_id: engineerEquipmentDetailsActivityID,
            type: 1,
            perPage: 1
        }, (response: any) => {
            const engineerEquipmentDetailsActivityData: EngineerEquipmentDetailsActivityCollectionResponse = response.data;
            setProcessedActivityData(engineerEquipmentDetailsActivityData.data[0]);
        }, setIsProcessedActivityLoading)    
    }
    
    const isLoading = (
        isEngineerEquipmentDetailsLoading || 
        isUploadsLoading || 
        isUploadUserDataLoading || 
        isTicketLoading || 
        isUserLoading ||
        isDepartmentLoading || 
        isCustomerLoading || 
        isSiteLoading || 
        isProcessedActivityLoading
    )

    const isHeaderLoading = () => {
        return isEngineerEquipmentDetailsLoading
    }
    
    return (
        <>
            <OuterContainer 
                title='Engineer Equipment Details' 
                id={engineerEquipmentDetailsID as string}
                maxWidth={900}
                headerContent={!isHeaderLoading() && engineerEquipmentDetails ? 
                    <EngineerEquipmentDetailsStatus isProcessed={engineerEquipmentDetails.data.is_processed}/> : 
                    <Skeleton type='label'/>
                }

            >
                <div className={'page-grid'}>
                    <div className="page-main">
                        {!isLoading && engineerEquipmentDetails && ticketData && uploadData && departmentData && userData && customerData && siteData ? 
                            <EngineerEquipmentDetailsInformation
                                engineerEquipmentDetails={engineerEquipmentDetails}
                                ticket={ticketData}
                                customer={customerData}
                                site={siteData}
                                department={departmentData}
                                uploads={uploadData}
                                lastProcess={processedActivityData?.data.created_at}
                            /> 
                            :
                            <EngineerEquipmentDetailsInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <EngineerEquipmentDetailsSideBar
                            engineerEquipmentDetails={engineerEquipmentDetails}
                            ticket={ticketData}
                            setEngineerEquipmentDetails={setEngineerEquipmentDetails}
                        />
                    </div>
                </div>
            </OuterContainer>             
        </>
    )
}

export default EngineerEquipmentDetailsPage