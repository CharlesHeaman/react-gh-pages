import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { CustomerResponseData } from "../../../types/customers.types";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";
import { EquipmentCollectionResponse } from "../../../types/equipment.types";
import { SiteListNoteCollectionResponse } from "../../../types/siteListNotes.types";
import { SiteResponseData } from "../../../types/sites.types";
import { TicketCollectionResponse, TicketResponseData } from "../../../types/tickets.types";
import getAPI from "../../../utils/getAPI";
import SiteListNotes from "./SiteListNotes";

const TicketSiteListNotesPage = () => {
    const { departmentName, ticketNumber, ticketSuffix } = useParams();

    // Data States
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isTicketLoading, setIsTicketLoading] = useState(true);
    const [ticketData, setTicketData] = useState<TicketResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isSiteLoading, setIsSiteLoading] = useState(true);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentCollectionResponse>();
    const [isSiteListNotesLoading, setIsSiteListNotesLoading] = useState(false);
    const [siteListNotesData, setSiteListNotesData] = useState<SiteListNoteCollectionResponse>();
    

    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    useEffect(() => {
        getTicket();
    }, [departmentData, ticketNumber, ticketSuffix]);

    useEffect(() => {
        if (ticketData === undefined) return;
    }, [ticketData?.data.engineers]);

    const getDepartment = () => {
        getAPI('departments', {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
        const currentDepartment = departmentData.data[0];
            setDepartmentData(currentDepartment);
        }, setIsDepartmentLoading);
    }

    const getTicket = () => {
        if (!departmentData) return;
        getAPI('tickets', {
            department_ids: [departmentData.id],
            numbers: [ticketNumber],
            suffixes: [ticketSuffix]
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            const currentTicket = ticketData.data[0];
            setTicketData(currentTicket);
            getCustomer(currentTicket.data.customer_id);
            getSite(currentTicket.data.site_id);
            getSiteListNotes(currentTicket.id);
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
            getEquipment(sitesData.id);
            setSiteData(sitesData);
        }, setIsSiteLoading);
    }

    const getEquipment = (siteID: number) => {
        getAPI('equipment', {
            site_ids: [siteID],
            is_active: true
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData);
        }, setIsEquipmentLoading);
    }

    const getSiteListNotes = (ticketID: number) => {
        getAPI(`site_list_notes`, {
            ticket_ids: [ticketID],
        }, (response: any) => {
            const siteListNotesData: SiteListNoteCollectionResponse = response.data;
            setSiteListNotesData(siteListNotesData);
        }, setIsSiteListNotesLoading)    
    } 

    const isLoading = (
        isDepartmentLoading ||
        isTicketLoading || 
        isCustomerLoading || 
        isSiteLoading || 
        isEquipmentLoading ||
        isSiteListNotesLoading
    )

    return (
        <>
            <OuterContainer
                title='Ticket Site List Notes'
                id={`${ticketNumber}${parseInt(ticketSuffix as string) > 0 ? `/${ticketSuffix}` : ''}`}
                maxWidth={800}
                bigID
            >
                {!isLoading && siteListNotesData && equipmentData && departmentData ?
                    <SiteListNotes
                        siteListNotes={siteListNotesData}
                        equipment={equipmentData.data}
                        department={departmentData}
                    />
                : null}
            </OuterContainer>
        </>
    )
}

export default TicketSiteListNotesPage