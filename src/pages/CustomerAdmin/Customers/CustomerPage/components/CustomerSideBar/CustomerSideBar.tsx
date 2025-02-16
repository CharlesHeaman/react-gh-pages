import { Dispatch, SetStateAction, useEffect, useState } from "react"
import PermsProtectedComponent from "../../../../../../components/PermsProtectedComponent"
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { ContactCollectionResponse } from "../../../../../../types/contact.types"
import { ContractCollectionResponse } from "../../../../../../types/contract.types"
import { CustomerActivityCollectionResponse } from "../../../../../../types/customerActivity.types"
import { CustomerResponseData } from "../../../../../../types/customers.types"
import { EquipmentCollectionResponse } from "../../../../../../types/equipment.types"
import { QuoteCollectionResponse } from "../../../../../../types/quote.types"
import { SiteCollectionResponse } from "../../../../../../types/sites.types"
import { TicketCollectionResponse } from "../../../../../../types/tickets.types"
import getAPI from "../../../../../../utils/getAPI"
import ExportResource from "../../../../Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import CustomerSideBarSkeleton from "../CustomerSideBarSkeleton"
import CustomerAssociatedData from "./CustomerAssociatedData/CustomerAssociatedData"
import CustomerQuotesTickets from "./CustomerQuotesTickets/CustomerQuotesTickets"
import CustomerUploads from "./CustomerUploads/CustomerUploads"
import CustomerAccounts from "./components/CustomerAccounts/CustomerAccounts"
import CustomerActions from "./components/CustomerActions/CustomerActions"
import CustomerDeactivate from "./components/CustomerDeactivate/CustomerDeactivate"
import CustomerReports from "./components/CustomerReports/CustomerReports"
import CustomerTicketHistory from "./components/CustomerTicketHistory/CustomerTicketHistory"

const CustomerSideBar = (props: {
    customer: CustomerResponseData | undefined,
    setCustomerData: Dispatch<SetStateAction<CustomerResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
}) => {
    const [isSitesLoading, setIsSiteLoading] = useState(true);
    const [sitesData, setSitesData] = useState<SiteCollectionResponse>();
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentCollectionResponse>();
    const [isContractsLoading, setIsContractsLoading] = useState(false);
    const [contractsData, setContractsData] = useState<ContractCollectionResponse>();
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
    const [activityData, setActivityData] = useState<CustomerActivityCollectionResponse>();

    useEffect(() => {
        if (props.customer?.id === undefined) return;
        getSites(props.customer.id);
        getContracts(props.customer.id);
        getContacts(props.customer.id);
        getQuotes(props.customer.id);
        getOpenQuotes(props.customer.id);
        getServiceTickets(props.customer.id);
        getMaintenanceTickets(props.customer.id);
        getServiceHistory(props.customer.id);
        getMaintenanceHistory(props.customer.id);
    }, [props.customer?.id, props.customer?.data.is_active]);

    useEffect(() => {
        if (props.customer?.id === undefined) return;
        getActivity(props.customer.id);
    }, [JSON.stringify(props.customer)]);


    const getSites = (customerID: number) => {
        getAPI(`sites`, {
            customer_ids: [customerID],
            is_active: true,
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSitesData(siteData);
            if (siteData.data.length > 0) {
                getEquipment([...new Set(siteData.data.map(site => site.id))]);
            } else {
                getEquipment([-1])
            }
        }, setIsSiteLoading);
    }

    const getEquipment = (siteIDs: Array<number>) => {
        getAPI(`equipment`, {
            site_ids: siteIDs,
            is_active: true,
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData);
        }, setIsEquipmentLoading)    
    } 

    const getContracts = (customerID: number) => {
        getAPI(`contracts`, {
            customer_ids: [customerID],
            is_active: true,
        }, (response: any) => {
            const contractData: ContractCollectionResponse = response.data;
            setContractsData(contractData);
        }, setIsContractsLoading)    
    } 

    const getContacts = (customerID: number) => {
        getAPI(`contacts`, {
            customer_ids: [customerID],
            is_active: true,
        }, (response: any) => {
            const contactData: ContactCollectionResponse = response.data;
            setContactsData(contactData);
        }, setIsContactsLoading)    
    } 

    const getServiceTickets = (customerID: number) => {
        getAPI(`tickets`, {
            customer_ids: [customerID],
            is_invoice_requested: false,
            suffixes: [0],
            ticket_type: 0,
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setOpenServiceTicketData(ticketData);
        }, setIsOpenServiceTicketsLoading)    
    } 

    const getMaintenanceTickets = (customerID: number) => {
        getAPI(`tickets`, {
            customer_ids: [customerID],
            is_invoice_requested: false,
            suffixes: [0],
            ticket_type: 1,
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setOpenMaintenanceTicketData(ticketData);
        }, setIsOpenMaintenanceTicketsLoading)    
    } 

    const getQuotes = (customerID: number) => {
        getAPI(`quotes`, {
            customer_id: customerID,
            perPage: 1
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            setQuoteData(quoteData);
        }, setIsQuotesLoading)    
    } 

    const getOpenQuotes = (customerID: number) => {
        getAPI(`quotes`, {
            customer_id: customerID,
            statuses: [0, 2],
            perPage: 1
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            setOpenQuoteData(quoteData);
        }, setIsOpenQuotesLoading)    
    }

    const getServiceHistory = (customerID: number) => {
        getAPI(`tickets`, {
            customer_ids: [customerID],
            ticket_type: 0,
            suffixes: [0],
        }, (response: any) => {
            const serviceTicketData: TicketCollectionResponse = response.data;
            setServiceData(serviceTicketData);
        }, setIsServiceLoading)    
    } 

    const getMaintenanceHistory = (customerID: number) => {
        getAPI(`tickets`, {
            customer_ids: [customerID],
            ticket_type: 1,
            suffixes: [0],
        }, (response: any) => {
            const maintenanceTicketData: TicketCollectionResponse = response.data;
            setMaintenanceData(maintenanceTicketData);
        }, setIsMaintenanceLoading)    
    } 

    const getActivity = (customerID: number) => {
        getAPI(`customer_activity`, {
            customer_id: customerID,
            perPage: 1
        }, (response: any) => {
            const customerActivityData: CustomerActivityCollectionResponse = response.data;
            setActivityData(customerActivityData);
        }, setIsActivityLoading)    
    } 

    const isSideBarLoading = (
        isSitesLoading || 
        isEquipmentLoading || 
        isContractsLoading || 
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
        !isSideBarLoading && props.customer && sitesData && openServiceTicketData && openMaintenanceTicketData && equipmentData && contractsData && contactsData && quoteData && serviceData && maintenanceData && openQuoteData && activityData ? 
            !props.isEditMode ? <>
                {props.customer.data.is_active ? <>
                    <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                        <CustomerActions
                            customer={props.customer}
                            setCustomerData={props.setCustomerData}
                            setIsEditMode={() => props.setIsEditMode(true)}  
                        /> 
                    </PermsProtectedComponent>
                    <PermsProtectedComponent requiredPerms={{ accounts: 2 }}>
                        <CustomerAccounts
                            customer={props.customer}
                            setCustomerData={props.setCustomerData}
                        /> 
                    </PermsProtectedComponent>
                </> : null}
                <CustomerAssociatedData
                    customerID={props.customer.id}
                    siteIDs={[...new Set(sitesData.data.map(site => site.id))]}
                    siteCount={sitesData.total_count}
                    equipmentCount={equipmentData.total_count}
                    contractCount={contractsData.total_count}
                    contactCount={contactsData.total_count}
                    activityCount={activityData.total_count}
                />
                <CustomerQuotesTickets 
                    customerID={props.customer.id} 
                    serviceCount={openServiceTicketData.total_count}
                    maintenanceCount={openMaintenanceTicketData.total_count}
                    quotesCount={openQuoteData.total_count}                  
                />
                <CustomerTicketHistory
                    customerID={props.customer.id}
                    serviceCount={serviceData.total_count}
                    maintenanceCount={maintenanceData.total_count}
                    quotesCount={quoteData.total_count}
                />
                <CustomerReports
                    customer={props.customer}
                />
                <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                    <CustomerDeactivate
                        customerID={props.customer.id}
                        siteIDs={sitesData.data.map(site => site.id)}
                        equipmentIDs={equipmentData.data.map(equipment => equipment.id)}
                        contractIDs={contractsData.data.map(contract => contract.id)}
                        contactIDs={contactsData.data.map(contact => contact.id)}
                        ticketCount={openServiceTicketData.total_count + openMaintenanceTicketData.total_count} 
                        quotesCount={openQuoteData.total_count}                    
                        setCustomerData={props.setCustomerData}
                        reactivate={!props.customer.data.is_active}
                    />
                </PermsProtectedComponent>
                
                <ExportResource
                    resourceData={props.customer}
                    resourceName='Customer'
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
        <CustomerSideBarSkeleton/>
    )
}

export default CustomerSideBar