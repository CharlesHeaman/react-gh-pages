import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer"
import Skeleton from "../../components/ui/General/Skeleton/Skeleton"
import { CustomerResponseData } from "../../types/customers.types"
import { DepartmentResponseData } from "../../types/department.types"
import { PostCompletionChangeRequestResponseData } from "../../types/postCompletionChangeRequets.types"
import { SiteResponseData } from "../../types/sites.types"
import { TicketResponseData } from "../../types/tickets.types"
import { UserResponseData } from "../../types/user.types"
import getAPI from "../../utils/getAPI"
import PostCompletionChangeRequestInformation from "./components/PostCompletionChangeRequestInformation"
import PostCompletionChangeRequestLabel from "./components/PostCompletionChangeRequestLabel/PostCompletionChangeRequestLabel"
import PostCompletionChangeRequestInformationSkeleton from "./components/PostsCompletionChangeRequestSkeleton/PostCompletionChangeRequestInformationSkeleton"
import PostCompletionChangeRequestSideBar from "./PostCompletionChangeRequestSideBar"
import Label from "../../components/ui/General/Label/Label"
import { PostCompletionChangeRequestActivityCollectionResponse, PostCompletionChangeRequestActivityResponseData } from "../../types/postCompletionChangeRequestActivity.types"

const PostCompletionChangeRequestPage = () => {
    const { departmentName, requestID } = useParams();

    // Data States
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isSiteLoading, setIsSiteLoading] = useState(true);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isLoadingRequest, setIsLoadingRequest] = useState(true);
    const [requestData, setRequestData] = useState<PostCompletionChangeRequestResponseData>();
    const [isLoadingCreatedByUser, setIsLoadingCreatedByUser] = useState(true);
    const [createdByUserData, setCreatedByUserData] = useState<UserResponseData>();
    const [isLoadingTicket, setIsLoadingTicket] = useState(true);
    const [ticketData, setTicketData] = useState<TicketResponseData>();
    const [isProcessedActivityLoading, setIsProcessedActivityLoading] = useState(false);
    const [processedActivityData, setProcessedActivityData] = useState<PostCompletionChangeRequestActivityResponseData>();
    
    useEffect(() => {
        getRequestData();
    }, [departmentName, requestID]);

    useEffect(() => {
        if (requestData === undefined) return;
        if (requestData.data.status) getProcessedActivity(requestData.id, requestData.data.status === 1);
    }, [requestData?.data.status]);

    const getRequestData = () => {
        getAPI(`post_completion_change_requests/${requestID}`, {}, (response: any) => {
            const requestData: PostCompletionChangeRequestResponseData = response.data;
            setRequestData(requestData);
            getCreatedByUser(requestData.data.created_by_id);
            getTicketData(requestData.data.ticket_id, requestData.data.ticket_type, requestData.data.created_by_id);    
        }, setIsLoadingRequest)
    }

    const getCreatedByUser = (engineerID: number) => {
        getAPI(`users/${engineerID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setCreatedByUserData(userData);
        }, setIsLoadingCreatedByUser)
    }

    const getTicketData = (ticketID: number, ticketType: number, engID: number) => {
        getAPI(`tickets/${ticketType}/${ticketID}`, {}, (response: any) => {
            const ticketData: TicketResponseData = response.data;
            setTicketData(ticketData);
            getDepartment(ticketData.data.department_id);
            getCustomer(ticketData.data.customer_id);
            getSite(ticketData.data.site_id);
        }, setIsLoadingTicket);
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

    const getProcessedActivity = (postCompletionChangeRequestID: number, accepted: boolean) => {
        getAPI(`post_completion_change_request_activity`, {
            post_completion_change_request_id: postCompletionChangeRequestID,
            type: accepted ? 1 : 2,
            perPage: 1
        }, (response: any) => {
            const engineerEquipmentDetailsActivityData: PostCompletionChangeRequestActivityCollectionResponse = response.data;
            setProcessedActivityData(engineerEquipmentDetailsActivityData.data[0]);
        }, setIsProcessedActivityLoading)    
    }

    const isHeaderLoading = (
        isLoadingRequest 
    )

    const isLoading = (
        isLoadingRequest || 
        isLoadingCreatedByUser || 
        isLoadingTicket || 
        isCustomerLoading || 
        isDepartmentLoading || 
        isSiteLoading || 
        isProcessedActivityLoading
    )

    return (
        <>
            <OuterContainer 
                title='Post-completion Change Request' 
                id={requestID as string}
                headerContent={!isHeaderLoading && ticketData && requestData ? 
                    <div className="flex">
                        {ticketData.data.is_invoice_requested && requestData.data.status === 0 && <Label
                            text="Invoice Requested"
                            color="red"
                            iconFont="credit_card"
                        />}
                        <PostCompletionChangeRequestLabel status={requestData.data.status}/> 
                    </div> :
                    <Skeleton type='label'/> 
                }
                maxWidth={900}
            >
                <div className='page-grid'>
                    <div className='page-main'>
                        {!isLoading && requestData && createdByUserData && ticketData && customerData && siteData && departmentData ? 
                            <PostCompletionChangeRequestInformation 
                                postCompletionChangeRequest={requestData}
                                ticket={ticketData}
                                createdByUser={createdByUserData}
                                customer={customerData}
                                site={siteData}
                                department={departmentData}
                                lastProcess={processedActivityData?.data.created_at}
                            /> 
                            : 
                            <PostCompletionChangeRequestInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <PostCompletionChangeRequestSideBar
                            postCompletionChangeRequest={requestData}
                            setRequestData={setRequestData}
                            ticket={ticketData}
                        />
                    </div>                               
                </div> 
            </OuterContainer>
        </>
    )
}

export default PostCompletionChangeRequestPage