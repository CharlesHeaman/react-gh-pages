import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule"
import { EquipmentCollectionResponse, EquipmentResponseData } from "../../../types/equipment.types"
import { RefrigerantMovementCollectionResponse } from "../../../types/refrigerantMovement.types"
import { TicketCollectionResponse } from "../../../types/tickets.types"
import getAPI from "../../../utils/getAPI"
import EquipmentSideBarSkeleton from "./EquipmentSideBar/EquipmentSideBarSkeleton"
import EquipmentDeactivate from "./EquipmentSideBar/components/EquipmentDeactivate/EquipmentDeactivate"
import EquipmentRefrigerant from "./EquipmentSideBar/components/EquipmentRefrigerant/EquipmentRefrigerant"
import EquipmentTicketHistory from "./EquipmentSideBar/components/EquipmentTicketHistory/EquipmentTicketHistory"
import EquipmentActions from "./EquipmentSideBar/components/EquipmentActions/EquipmentActions"
import EquipmentAssociatedData from "./EquipmentSideBar/components/EquipmentAssociatedData/EquipmentAssociatedData"
import { SiteListNoteCollectionResponse } from "../../../types/siteListNotes.types"
import { QuoteCollectionResponse } from "../../../types/quote.types"
import EquipmentQuotesTickets from "./EquipmentSideBar/components/EquipmentQuotesTickets/EquipmentQuotesTickets"
import { SiteResponseData } from "../../../types/sites.types"
import { EquipmentActivityCollectionResponse } from "../../../types/equipmentActivity.types"
import ExportResource from "../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../components/PermsProtectedComponent"

const EquipmentSideBar = (props: {
    equipment: EquipmentResponseData | undefined,
    site: SiteResponseData | undefined,
    customerID: number | undefined,
    setEquipmentData: Dispatch<SetStateAction<EquipmentResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {
    // Data States
    const [isServiceHistoryLoading, setIsServiceHistoryLoading] = useState(true);
    const [serviceTicketsData, setServiceTicketsData] = useState<TicketCollectionResponse>();
    const [isSiteListNotesLoading, setIsSiteListNotesLoading] = useState(false);
    const [siteListNotesData, setSiteListNotesData] = useState<SiteListNoteCollectionResponse>();
    const [isRefrigerantMovementsLoading, setIsRefrigerantMovementsLoading] = useState(false);
    const [refrigerantMovementData, setRefrigerantMovementData] = useState<RefrigerantMovementCollectionResponse>();
    const [isSlavesLoading, setIsSlavesLoading] = useState(false);
    const [slavesData, setSlavesData] = useState<EquipmentCollectionResponse>();
    const [isOpenTicketsLoading, setIsOpenTicketsLoading] = useState(true);
    const [openTicketData, setOpenTicketData] = useState<TicketCollectionResponse>();
    const [isOpenQuotesLoading, setIsOpenQuotesLoading] = useState(true);
    const [openQuoteData, setOpenQuoteData] = useState<QuoteCollectionResponse>();
    const [isQuotesLoading, setIsQuotesLoading] = useState(true);
    const [quoteData, setQuoteData] = useState<QuoteCollectionResponse>();
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<EquipmentActivityCollectionResponse>();

    useEffect(() => {
        if (props.equipment?.id === undefined) return;
        getServiceHistory(props.equipment.id);
        getSlaves(props.equipment.id);
        getSiteListNotes(props.equipment.id);
        getTickets(props.equipment.id);
        getQuotes(props.equipment.id);
        getOpenQuotes(props.equipment.id);
    }, [props.equipment?.id]);

    useEffect(() => {
        if (props.equipment?.id === undefined) return;
        getActivity(props.equipment.id);
    }, [JSON.stringify(props.equipment)]);

    const getServiceHistory = (equipmentID: number) => {
        getAPI(`tickets`, {
            equipment_id: equipmentID,
            ticket_type: 0
        }, (response: any) => {
            const serviceTicketData: TicketCollectionResponse = response.data;
            setServiceTicketsData(serviceTicketData);
            if (serviceTicketData.data.length > 0) {
                getRefrigerantMovements([...new Set(serviceTicketData.data.map(ticket => ticket.data.number))])
            } else {
                getRefrigerantMovements([-1])
            }
        }, setIsServiceHistoryLoading)    
    } 

    const getSiteListNotes = (equipmentID: number) => {
        getAPI(`site_list_notes`, {
            equipment_ids: [equipmentID],
            perPage: 1
        }, (response: any) => {
            const siteListNotesData: SiteListNoteCollectionResponse = response.data;
            setSiteListNotesData(siteListNotesData);
        }, setIsSiteListNotesLoading)    
    } 

    const getRefrigerantMovements = (ticketNumbers: Array<number>) => {
        getAPI(`refrigerant_movements`, {
            ticket_numbers: ticketNumbers,
            perPage: 1
        }, (response: any) => {
            const refrigerantMovementData: RefrigerantMovementCollectionResponse = response.data;
            setRefrigerantMovementData(refrigerantMovementData);
        }, setIsRefrigerantMovementsLoading)    
    } 

    const getSlaves = (equipmentID: number) => {
        getAPI(`equipment`, {
            master_equipment_id: equipmentID,
            is_active: true,
            perPage: 1
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setSlavesData(equipmentData);
        }, setIsSlavesLoading)    
    } 

    const getTickets = (equipmentID: number) => {
        getAPI(`tickets`, {
            equipment_id: equipmentID,
            is_invoice_requested: false,
            suffixes: [0],
            perPage: 1
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setOpenTicketData(ticketData);
        }, setIsOpenTicketsLoading)    
    } 

    const getQuotes = (equipmentID: number) => {
        getAPI(`quotes`, {
            equipment_id: equipmentID,
            perPage: 1
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            setQuoteData(quoteData);
        }, setIsQuotesLoading)    
    } 

    const getOpenQuotes = (equipmentID: number) => {
        getAPI(`quotes`, {
            equipment_id: equipmentID,
            statuses: [0, 2],
            perPage: 1
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            setOpenQuoteData(quoteData);
        }, setIsOpenQuotesLoading)    
    } 

    const getActivity = (equipmentID: number) => {
        getAPI(`equipment_activity`, {
            equipment_id: equipmentID,
            perPage: 1
        }, (response: any) => {
            const equipmentActivityData: EquipmentActivityCollectionResponse = response.data;
            setActivityData(equipmentActivityData);
        }, setIsActivityLoading)    
    } 

    const isSideBarLoading = (
        isServiceHistoryLoading ||
        isRefrigerantMovementsLoading || 
        isSlavesLoading || 
        isSiteListNotesLoading || 
        isOpenTicketsLoading || 
        isQuotesLoading || 
        isActivityLoading || 
        isOpenQuotesLoading
    )

    return (
        !isSideBarLoading && props.equipment && props.site && props.customerID && serviceTicketsData && refrigerantMovementData && slavesData && siteListNotesData && openTicketData && activityData && quoteData && openQuoteData ? 
            !props.isEditMode ? <>
                {props.equipment.data.is_active ? 
                    <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                        <EquipmentActions 
                            equipmentID={props.equipment.id}
                            site={props.site}
                            customerID={props.customerID}
                            setEquipmentData={props.setEquipmentData}
                            setIsEditMode={() => props.setIsEditMode(true)}
                        />
                    </PermsProtectedComponent>
                : null}
                <EquipmentAssociatedData
                    equipmentID={props.equipment.id}
                    slavesCount={slavesData.total_count}
                    activityCount={activityData.total_count}
                />
                <EquipmentQuotesTickets
                    equipmentID={props.equipment.id}
                    ticketCount={openTicketData.total_count}
                    quotesCount={openQuoteData.total_count}
                />
                <EquipmentTicketHistory
                    equipmentID={props.equipment.id}
                    serviceTotal={serviceTicketsData.total_count}
                    maintenanceTotal={siteListNotesData.total_count}
                    quotesCount={quoteData.total_count}
                />
                <EquipmentRefrigerant
                    ticketNumbers={serviceTicketsData.data.length > 0 ? [...new Set(serviceTicketsData.data.map(ticket => ticket.data.number))] : [-1]}
                    movementCount={refrigerantMovementData.total_count}
                />
                <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                    <EquipmentDeactivate 
                        equipmentID={props.equipment.id} 
                        setEquipmentData={props.setEquipmentData}            
                        reactivate={!props.equipment.data.is_active} 
                        ticketCount={openTicketData.total_count}
                        quotesCount={openQuoteData.total_count}
                    />    
                </PermsProtectedComponent>

                <ExportResource
                    resourceName="equipment"
                    resourceData={props.equipment}
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
        <EquipmentSideBarSkeleton/>
    )
}

export default EquipmentSideBar