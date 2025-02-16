import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SendEmail from "../../../components/form/Email/SendEmail";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import LabelContainer from "../../../components/ui/General/LabelContainer/LabelContainer";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import TicketLink from "../../../components/ui/Links/TicketLink";
import Loading from "../../../components/ui/Loading/Loading";
import Header from "../../../components/ui/Structure/Header/Header";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";
import { TicketCollectionResponse, TicketResponseData } from "../../../types/tickets.types";
import { UserResponseData } from "../../../types/user.types";
import { get, post } from "../../../utils/Requests";
import getAPI from "../../../utils/getAPI";
import handleError from "../../../utils/handleError";

const PurchaseOrderRequestPDF = () => {
    const {departmentName, ticketNumber, ticketSuffix} = useParams();
    const [isTicketLoading, setIsTicketLoading] = useState(false);
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [ticketData, setTicketData] = useState<TicketResponseData>();

    const [isContactsLoading, setIsContactsLoading] = useState(true);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [contactData, setContactData] = useState([]);
    const [userData, setUserData] = useState<UserResponseData>();

    // useEffect(() => {
    //     getTicketData();
    //     getUserData();
    // }, [ticketID, ticketType])

    useEffect(() => {
        getDepartment();
        getUserData();
    }, [departmentName, ticketNumber, ticketSuffix]);

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartmentData = departmentData.data[0];
            setDepartmentData(currentDepartmentData);
            getTicketData(currentDepartmentData.id);
        }, setIsDepartmentLoading)
    }

    const getTicketData = (departmentID: number) => {
        getAPI(`tickets`, {
            numbers: [ticketNumber],
            suffixes: [ticketSuffix],
            department_ids: [departmentID]
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            const currentTicketData = ticketData.data[0];
            setTicketData(currentTicketData);
            getContactData(currentTicketData.data.customer_id)
        }, setIsTicketLoading);
    }

    const getUserData = () => {
        getAPI('users/-1', {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setUserData(userData);
        }, setIsUserLoading);
    }

    function getContactData(customerID: number) {
        get(`/api/oldCustomers/${customerID}/getContacts`, {}, getContactDataResponse, (error) => handleError(error, props.addNotification));
    }

    function getContactDataResponse(response: any) {
        setContactData(response.data)
        setIsContactsLoading(false);
    }

    function sendEmail(emailData: any) {
        setIsSending(true);
        sendPurchaseOrderRequest(emailData);
    }

    function sendPurchaseOrderRequest(emailData: any) {
        post(`/api/oldTickets/${ticketData?.id}/${ticketData?.data.ticket_type}/sendPurchaseOrderRequest`, {}, emailData, sendPurchaseOrderRequestResponse, (error) => handleError(error, props.addNotification));
    }

    function sendPurchaseOrderRequestResponse() {
        window.close();
    }

    const getEmailBody = () => {
        var bodyText = '';
        const today = new Date();
        const hours = today.getHours();
        if (hours < 12) {
            bodyText += 'Good morning\n\n'
        } else if (hours < 18) {
            bodyText += 'Good afternoon\n\n'
        } else {
            bodyText += 'Good evening\n\n'
        }
        bodyText += `Further to our recent visit, please find the attached ${departmentData?.data.name} Ticket #${ticketData?.data.number} and the associated Purchase Order Request.\n\n`;
        bodyText += 'Please could you arrange for the issue of a purchase order number at your earliest convenience to enable us to submit an invoice for the completed works.\n\n'
        return bodyText
    }

    const getEmailFooter = () => {
        return userData && <p>{
            `${userData.data.email_footer}\n`}
            <img style={{ maxHeight: '70px'}} src={`${process.env.REACT_APP_API_URL}/signatures/${userData.id}.jpg`}/>
            {`\n${userData.data.first_name} ${userData.data.last_name}${userData.data.job_title ? `\n${userData.data.job_title}` : ''}\n${userData.data.email}`}
        </p>
    }

    const isHeaderLoading = () => {
        return (
            isTicketLoading
        )
    }

    const isLoading = () => {
        return (
            isTicketLoading ||
            isDepartmentLoading || 
            isUserLoading || 
            isContactsLoading
        )
    }

    return (
        <>
            <Header
                links={[
                    {
                        to: departmentName as string,
                        text: (departmentName as string).charAt(0).toUpperCase() + (departmentName as string).slice(1)
                    },
                    {
                        to: `tickets`,
                        text: 'Tickets'
                    },
                    {
                        to: `${ticketNumber as string}/${ticketSuffix as string}`,
                        text: `#${ticketNumber as string}${parseInt(ticketSuffix as string) > 0 ? `/${ticketSuffix}` : ''}`
                    },
                    {
                        to: `purchase_order_request`,
                        text: `Purchase Order Request`
                    }
                ]}
            />
            <OuterContainer
                title='Purchase Order Request'
                headerContent={
                    (!isHeaderLoading() && ticketData) ? <p>Send purchase order request for ticket <TicketLink 
                        id={ticketData.id} 
                        ticketType={ticketData.data.ticket_type} 
                        parentID={ticketData.data.parent_ticket_id} 
                        deptID={ticketData.data.department_id} 
                        number={ticketData.data.number} 
                        suffix={ticketData.data.suffix}
                    />.</p> : <Skeleton type='text' width={325}/>
                }
                stickyHeaderContent={(!isHeaderLoading() && ticketData) && <p style={{ fontSize: '0.85em' }}>Send purchase order request for ticket <TicketLink 
                    id={ticketData.id} 
                    ticketType={ticketData.data.ticket_type} 
                    parentID={ticketData.data.parent_ticket_id} 
                    deptID={ticketData.data.department_id} 
                    number={ticketData.data.number} 
                    suffix={ticketData.data.suffix}
                />.</p>}
                maxWidth={700}
                noBorder
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        {(!isLoading() && ticketData && departmentData) ? 
                            !isSending ? 
                                <SendEmail 
                                    recipients={contactData}
                                    subject={`Purchase Order Request for ${departmentData.data.name} Ticket ${ticketData.data.number}`}
                                    body={getEmailBody()}
                                    footer={getEmailFooter()}
                                    sendFunc={sendEmail}
                                /> :
                                <InnerContainer>
                                    <div style={{ minHeight: '200px' }}>
                                        <Loading text='Sending Email...'/>
                                    </div>
                                </InnerContainer>
                            :
                            <InnerContainer title='Send Email'>
                                <InfoGrid>
                                    {/* Recipients  */}
                                    <GridItem>
                                        <Skeleton type='small-title' width={100}/> 
                                        <LabelContainer>
                                            <Skeleton type='label' width={90}/>
                                            <Skeleton type='label' width={90}/>
                                            <Skeleton type='label' width={90}/>
                                            <Skeleton type='label' width={90}/>
                                            <Skeleton type='label' width={90}/>
                                        </LabelContainer>   
                                    </GridItem>
                                    {/* Subject */}
                                    <GridItem>
                                        <Skeleton type='small-title' width={100}/>    
                                        <Skeleton type='text' width={160}/>
                                    </GridItem>
                                    {/* Body */}
                                    <GridItem>
                                        <Skeleton type='small-title' width={100}/>    
                                        <Skeleton type='text'/>
                                        <Skeleton type='text'/>
                                        <Skeleton type='text' width={160}/>
                                    </GridItem>
                                </InfoGrid>
                            </InnerContainer>
                        }
                    </div>
                </div>
            </OuterContainer>
            {/* <MainWrapper title='Send ' hideNav> */}
                {/* {!isContactsLoading && !isUserLoading ? 
                    !isSending ? 
                        <SendEmail 
                            recipients={contactData}
                            subject={`Purchase Order Request for ${ticketData.deptName} Ticket ${ticketData.number}`}
                            body={getEmailBody(ticketData)}
                            footer={getEmailFooter()}
                            sendFunc={sendEmail}
                        /> :
                        <Loading text='Sending Email...'/>
                    :
                    <OuterContainer maxWidth='700'>
                        <InnerContainer title='Send Email'>
                            <InfoGrid> */}
                                {/* Recipients  */}
                                {/* <GridItem>
                                    <Skeleton type='small-title' width='100'/>     
                                    <LabelContainer>
                                        <Skeleton type='label' width='90'/>
                                        <Skeleton type='label' width='90'/>
                                        <Skeleton type='label' width='90'/>
                                        <Skeleton type='label' width='90'/>
                                        <Skeleton type='label' width='90'/>
                                    </LabelContainer>   
                                </GridItem> */}
                                {/* Subject */}
                                {/* <GridItem>
                                    <Skeleton type='small-title' width='100'/>        
                                    <Skeleton type='text' width='160'/>
                                </GridItem> */}
                                {/* Body */}
                                {/* <GridItem>
                                    <Skeleton type='small-title' width='100'/>        
                                    <Skeleton type='text'/>
                                    <Skeleton type='text'/>
                                    <Skeleton type='text' width='160'/>
                                </GridItem> */}
                            {/* </InfoGrid> */}
                        {/* </InnerContainer> */}
                    {/* </OuterContainer> */}
                {/* } */}
            {/* </MainWrapper> */}
        </>
    )
}

export default PurchaseOrderRequestPDF