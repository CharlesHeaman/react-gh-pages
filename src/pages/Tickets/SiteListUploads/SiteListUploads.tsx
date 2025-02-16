import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListItem from "../../../components/ui/Containers/ListItem/ListItem";
import ListWrapper from "../../../components/ui/Containers/ListWrapper/ListWrapper";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import NoneFound from "../../../components/ui/General/NoneFound/NoneFound";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import MainWrapper from "../../../components/ui/Structure/MainWrapper/MainWrapper";
import handleError from "../../../utils/handleError";
import { get } from "../../../utils/Requests";
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer";
import { ReactComponent as UploadImg } from './../../../assets/images/file_upload_black_24dp.svg';
import formatDate from "../../../utils/formatDate";
import Header from "../../../components/ui/Structure/Header/Header";
import EquipmentLink from "../../../components/ui/Links/EquipmentLink";
import { DepartmentCollectionResponse } from "../../../types/department.types";
import { TicketCollectionResponse, TicketResponseData } from "../../../types/tickets.types";
import getAPI from "../../../utils/getAPI";
import TicketLink from "../../../components/ui/Links/TicketLink";
import { EquipmentResponseData } from "../../../types/equipment.types";

const SiteListUploads = () => {
    const {departmentName, ticketNumber, ticketSuffix, equipmentID} = useParams();
    const [isUploadsLoading, setIsUploadsLoading] = useState(true);
    const [isTicketLoading, setIsTicketLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentResponseData>();
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(true);
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [uploadData, setUploadData] = useState([]);
    const [ticketData, setTicketData] = useState<TicketResponseData>();

    useEffect(() => {
        getDepartment();
        getEquipmentData();
    }, [departmentName, ticketNumber, ticketSuffix]);

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartmentData = departmentData.data[0];
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
            getSiteListUploads(currentTicketData.id, currentTicketData.data.ticket_type)
        }, setIsTicketLoading);
    }

    const getEquipmentData = () => {
        getAPI(`equipment/${equipmentID}`, {}, (response: any) => {
            const equipmentData: EquipmentResponseData = response.data;
            setEquipmentData(equipmentData);
            // getTicketUploads(currentTicketData.id, currentTicketData.data.ticket_type);
        }, setIsEquipmentLoading);
    }

    function getSiteListUploads(ticketID: number, ticketType: number) {
        get(`/api/oldTickets/${ticketID}/${ticketType}/siteListNotes/${equipmentID}/uploads`, {}, getSiteListUploadsResponse, (error) => handleError(error, props.addNotification));
    }

    function getSiteListUploadsResponse(response: any) {
        setIsUploadsLoading(false);
        setUploadData(response.data.uploads);
    }

    const isHeaderLoading = () => {
        return (
            isTicketLoading ||
            isEquipmentLoading
        )
    }

    const isLoading = () => {
        return isUploadsLoading
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
                    to: `uploads`,
                    text: `Uploads`
                }
            ]}
        />
            <OuterContainer
                title='Site List Notes Equipment Uploads'
                headerContent={
                    (!isHeaderLoading() && ticketData && equipmentData) ? <p>Uploads on ticket <TicketLink
                        id={ticketData.id} 
                        ticketType={ticketData.data.ticket_type} 
                        parentID={ticketData.data.parent_ticket_id} 
                        deptID={ticketData.data.department_id} 
                        number={ticketData.data.number} 
                        suffix={ticketData.data.suffix}
                    /> for equipment <EquipmentLink 
                        code={equipmentData.data.code} 
                        customerID={0} 
                        siteID={equipmentData.data.site_id} 
                        equipmentID={equipmentData.id}
                    />.</p> : <Skeleton type='text' width={375}/>
                }
                stickyHeaderContent={(!isHeaderLoading() && ticketData && equipmentData) && <p style={{ fontSize: '0.85em' }}>Uploads on ticket <TicketLink 
                    id={ticketData.id} 
                    ticketType={ticketData.data.ticket_type} 
                    parentID={ticketData.data.parent_ticket_id} 
                    deptID={ticketData.data.department_id} 
                    number={ticketData.data.number} 
                    suffix={ticketData.data.suffix}
                /> for equipment <EquipmentLink 
                code={equipmentData.data.code} 
                customerID={0} 
                siteID={equipmentData.data.site_id} 
                equipmentID={equipmentData.id}
            />.</p>}
                maxWidth={500}
                noBorder
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        {!isLoading() ? 
                            uploadData.length > 0 ?
                                <ListWrapper>
                                    {uploadData.map((item, index) => 
                                        <ListItem clickFunc={() => { window.open(`${process.env.REACT_APP_API_URL}/${item.path}/${item.name}`, '_blank', 'noopener,noreferrer')}} flex key={index}>
                                            <h3>{item.name}</h3>
                                            <h4 className="flex-grow">{item.user.fullName}</h4>
                                            <h4>{formatDate(item.date)}</h4>
                                        </ListItem>
                                    )}
                                </ListWrapper> :
                                <NoneFound text='No uploads found' icon={<UploadImg/>}/> :
                            <ListWrapper>
                                {[...Array(5)].map((_, index) => 
                                    <ListItem key={index}>
                                        <Skeleton type={'small-title'} width={125}/>
                                        <Skeleton type={'text'} width={80} marginRight={'auto'}/>
                                        <Skeleton type={'text'} width={65}/>
                                    </ListItem>
                                )}
                            </ListWrapper>
                        }       
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default SiteListUploads