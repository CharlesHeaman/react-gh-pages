import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { ContactCollectionResponse } from "../../../../../../types/contact.types";
import { ContractResponseData } from "../../../../../../types/contract.types";
import { CustomerResponseData } from "../../../../../../types/customers.types";
import { EquipmentCollectionResponse } from "../../../../../../types/equipment.types";
import { QuoteCollectionResponse } from "../../../../../../types/quote.types";
import { SiteActivityCollectionResponse } from "../../../../../../types/siteActivity.types";
import { SiteResponseData } from "../../../../../../types/sites.types";
import { TicketCollectionResponse } from "../../../../../../types/tickets.types";
import getAPI from "../../../../../../utils/getAPI";
import SiteActions from "./components/SiteActions/SiteActions";
import SiteAssociatedData from "./components/SiteAssociatedData/SiteAssociatedData";
import SiteDeactivate from "./components/SiteDeactivate/SiteDeactivate";
import SiteQuotesTickets from "./components/SiteQuotesTickets/SiteQuotesTickets";
import SiteReports from "./components/SiteReports/SiteReports";
import SiteQuoteTicketHistory from "./components/SiteTicketHistory/SiteQuoteTicketHistory";
import SiteSideBarSkeleton from "./SiteSideBarSkeleton";
import SiteMaps from "./components/SiteMaps/SiteMaps";
import ExportResource from "../../../../Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource";
import PermsProtectedComponent from "../../../../../../components/PermsProtectedComponent";

const SiteSideBar = (props: {
    site: SiteResponseData | undefined,
    customerID: number | undefined,
    customer: CustomerResponseData | undefined,
    contract: ContractResponseData | undefined,
    setSiteData: Dispatch<SetStateAction<SiteResponseData | undefined>>,
    isActive: boolean | undefined,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
}) => {
    // Data States
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(true);
    const [equipmentData, setEquipmentData] = useState<EquipmentCollectionResponse>();
    const [isContactsLoading, setIsContactsLoading] = useState(false);
    const [contactsData, setContactsData] = useState<ContactCollectionResponse>();
    const [isServiceLoading, setIsServiceLoading] = useState(false);
    const [serviceData, setServiceData] = useState<TicketCollectionResponse>();
    const [isMaintenanceLoading, setIsMaintenanceLoading] = useState(true);
    const [maintenanceData, setMaintenanceData] = useState<TicketCollectionResponse>();
    const [isOpenServiceTicketsLoading, setIsOpenServiceTicketsLoading] = useState(true);
    const [openServiceTicketData, setOpenServiceTicketData] = useState<TicketCollectionResponse>();
    const [isOpenMaintenanceTicketsLoading, setIsOpenMaintenanceTicketsLoading] = useState(true);
    const [openMaintenanceTicketData, setOpenMaintenanceTicketData] = useState<TicketCollectionResponse>();
    const [isQuotesLoading, setIsQuotesLoading] = useState(false);
    const [quoteData, setQuoteData] = useState<QuoteCollectionResponse>();
    const [isOpenQuotesLoading, setIsOpenQuotesLoading] = useState(false);
    const [openQuoteData, setOpenQuoteData] = useState<QuoteCollectionResponse>();
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<SiteActivityCollectionResponse>();

    useEffect(() => {
        if (props.site?.id === undefined) return;
        getEquipment(props.site.id);
        getContacts(props.site.id);
        getServiceHistory(props.site.id);
        getMaintenanceHistory(props.site.id);
        getServiceTickets(props.site.id);
        getMaintenanceTickets(props.site.id);
        getQuotes(props.site.id);
        getOpenQuotes(props.site.id);
    }, [props.site?.id, props.isActive]);

    useEffect(() => {
        if (props.site?.id === undefined) return;
        getActivity(props.site.id);
    }, [JSON.stringify(props.site)]);

    const getEquipment = (siteID: number) => {
        getAPI(`equipment`, {
            site_ids: [siteID],
            is_active: true,
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData);
        }, setIsEquipmentLoading)    
    } 

    const getContacts = (siteID: number) => {
        getAPI(`contacts`, {
            site_id: siteID,
            is_active: true,
        }, (response: any) => {
            const contactData: ContactCollectionResponse = response.data;
            setContactsData(contactData);
        }, setIsContactsLoading)    
    } 

    const getServiceHistory = (siteID: number) => {
        getAPI(`tickets`, {
            site_id: siteID,
            ticket_type: 0
        }, (response: any) => {
            const serviceTicketData: TicketCollectionResponse = response.data;
            setServiceData(serviceTicketData);
        }, setIsServiceLoading)    
    } 

    const getMaintenanceHistory = (siteID: number) => {
        getAPI(`tickets`, {
            site_id: siteID,
            ticket_type: 1
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setMaintenanceData(ticketData);
        }, setIsMaintenanceLoading)    
    } 

    const getServiceTickets = (siteID: number) => {
        getAPI(`tickets`, {
            site_id: siteID,
            is_invoice_requested: false,
            suffixes: [0],
            ticket_type: 0,
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setOpenServiceTicketData(ticketData);
        }, setIsOpenServiceTicketsLoading)    
    } 

    const getMaintenanceTickets = (siteID: number) => {
        getAPI(`tickets`, {
            site_id: siteID,
            is_invoice_requested: false,
            suffixes: [0],
            ticket_type: 1,
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setOpenMaintenanceTicketData(ticketData);
        }, setIsOpenMaintenanceTicketsLoading)    
    } 

    const getOpenQuotes = (siteID: number) => {
        getAPI(`quotes`, {
            site_id: siteID,
            statuses: [0, 2],
            perPage: 1
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            setOpenQuoteData(quoteData);
        }, setIsOpenQuotesLoading)    
    } 

    const getQuotes = (siteID: number) => {
        getAPI(`quotes`, {
            site_id: siteID,
            perPage: 1
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            setQuoteData(quoteData);
        }, setIsQuotesLoading)    
    } 

    const getActivity = (siteID: number) => {
        getAPI(`site_activity`, {
            site_id: siteID,
            perPage: 1
        }, (response: any) => {
            const siteActivityData: SiteActivityCollectionResponse = response.data;
            setActivityData(siteActivityData);
        }, setIsActivityLoading)    
    } 

    const isSideBarLoading = (
        isEquipmentLoading ||
        isContactsLoading ||
        isMaintenanceLoading ||
        isServiceLoading || 
        isOpenServiceTicketsLoading || 
        isOpenMaintenanceTicketsLoading ||
        isQuotesLoading || 
        isOpenQuotesLoading ||
        isActivityLoading 
    )

    return (
        !isSideBarLoading && props.site && props.customer && equipmentData && contactsData && serviceData && maintenanceData && openServiceTicketData && openMaintenanceTicketData && openQuoteData && quoteData && activityData ? 
            !props.isEditMode ? <>
                {props.isActive ? 
                    <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                        <SiteActions
                            site={props.site}
                            customer={props.customer}
                            contract={props.contract}
                            getEquipment={getEquipment}
                            getContacts={getContacts}
                            setSiteData={props.setSiteData}
                            setIsEditMode={() => props.setIsEditMode(true)}  
                            equipment={equipmentData}
                        />
                    </PermsProtectedComponent> 
                : null}
                <SiteAssociatedData
                    siteID={props.site.id}
                    equipmentCount={equipmentData.total_count}
                    contactCount={contactsData.total_count}
                    activityCount={activityData.total_count}
                />
                <SiteMaps 
                    site={props.site}
                    setSiteData={props.setSiteData}
                />
                <SiteQuotesTickets
                    siteID={props.site.id}
                    serviceCount={openServiceTicketData.total_count}
                    maintenanceCount={openMaintenanceTicketData.total_count}
                    quotesCount={openQuoteData.total_count}
                />
                <SiteQuoteTicketHistory
                    siteID={props.site.id}
                    serviceCount={serviceData.total_count}
                    maintenanceCount={maintenanceData.total_count}
                    quotesCount={quoteData.total_count}
                />
                <SiteReports
                    siteID={props.site.id}
                    site={props.site}
                    customer={props.customer}
                />
                <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                    <SiteDeactivate 
                        siteID={props.site.id} 
                        equipmentIDs={equipmentData.data.map(equipment => equipment.id)}
                        setSiteData={props.setSiteData}
                        reactivate={!props.isActive} 
                        ticketCount={openServiceTicketData.total_count + openMaintenanceTicketData.total_count}
                        quotesCount={openQuoteData.total_count}
                    />
                </PermsProtectedComponent>
                <ExportResource
                    resourceName='site'
                    resourceData={props.site}
                />
            </>
            :
            // Edit Mode
            <SideBarModule title='Actions'>
                <SideBarButton 
                    text='Abandon Edit'
                    color="grey"
                    iconFont='cancel'
                    clickEvent={() => props.setIsEditMode(false)}
                />
            </SideBarModule>
        : 
        // Skeleton 
        <SiteSideBarSkeleton/>
    )
}

export default SiteSideBar