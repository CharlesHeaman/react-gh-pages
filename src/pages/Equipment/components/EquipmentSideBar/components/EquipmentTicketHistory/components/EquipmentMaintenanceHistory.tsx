import { useEffect, useState } from "react";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketCollectionResponse } from "../../../../../../../types/tickets.types";
import getAPI from "../../../../../../../utils/getAPI";
import TicketList from "../../../../../../Tickets/components/TicketList";
import { SiteListNoteCollectionResponse } from "../../../../../../../types/siteListNotes.types";

const EquipmentMaintenanceHistory = (props: {
    equipmentID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    // Data States
    const [isSiteListNotesLoading, setIsSiteListNotesLoading] = useState(true);
    const [isMaintenanceHistoryLoading, setIsMaintenanceHistoryLoading] = useState(true);
    const [maintenanceTicketsData, setMaintenanceTicketsData] = useState<TicketCollectionResponse>();
    
    useEffect(() => {
        getSiteListNotes();
    }, [props.equipmentID])

    const getSiteListNotes = () => {
        getAPI(`site_list_notes`, {
            equipment_ids: [props.equipmentID],
        }, (response: any) => {
            console.log(response)
            const siteListNotesData: SiteListNoteCollectionResponse = response.data;
            if (siteListNotesData.data.length > 0) {
                getMaintenanceHistory([...new Set(siteListNotesData.data.map(siteListNote => siteListNote.data.ticket_id))])
            } else {
                getMaintenanceHistory([-1])
            }
        }, setIsSiteListNotesLoading)    
    } 

    const getMaintenanceHistory = (ticketIDs: Array<number>) => {
        getAPI(`tickets`, {
            tickets: ticketIDs.map(ticketID => {
                return {
                    ticket_id: ticketID,
                    ticket_type: 1
                }
            }),
        }, (response: any) => {
            const maintenanceTicketData: TicketCollectionResponse = response.data;
            setMaintenanceTicketsData(maintenanceTicketData);
        }, setIsMaintenanceHistoryLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Equipment Maintenance Ticket History'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1600}
            >
                <TicketList 
                    isTicketsLoading={isSiteListNotesLoading || isMaintenanceHistoryLoading} 
                    tickets={maintenanceTicketsData} 
                />
            </WindowOverlay>
        </>
    )
}

export default EquipmentMaintenanceHistory