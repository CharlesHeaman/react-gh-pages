import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketCollectionResponse } from "../../../../../../types/tickets.types";
import getAPI from "../../../../../../utils/getAPI";
import TicketList from "../../../../../Tickets/components/TicketList";

const EquipmentServiceTickets = (props: {
    equipmentID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    // Data States
    const [isServiceHistoryLoading, setIsServiceHistoryLoading] = useState(true);
    const [serviceTicketsData, setServiceTicketsData] = useState<TicketCollectionResponse>();
    
    useEffect(() => {
        getServiceHistory();
    }, [props.equipmentID])

    const getServiceHistory = () => {
        getAPI(`tickets`, {
            equipment_id: props.equipmentID,
            ticket_type: 0
        }, (response: any) => {
            const serviceTicketData: TicketCollectionResponse = response.data;
            setServiceTicketsData(serviceTicketData);
        }, setIsServiceHistoryLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Equipment Service Ticket History'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1600}
            >
                <TicketList 
                    isTicketsLoading={isServiceHistoryLoading} 
                    tickets={serviceTicketsData} 
                />
            </WindowOverlay>
        </>
    )
}

export default EquipmentServiceTickets