import { useEffect, useState } from "react";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketCollectionResponse } from "../../../../../../../types/tickets.types";
import getAPI from "../../../../../../../utils/getAPI";
import TicketList from "../../../../../../Tickets/components/TicketList";
import TicketSearchHeader from "../../../../../../Tickets/components/TicketSearchHeader";

const EquipmentOpenTickets = (props: {
    equipmentID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isTicketsLoading, setIsTicketsLoading] = useState(true);
    const [ticketData, setTicketData] = useState<TicketCollectionResponse>();
    
    useEffect(() => {
        getTickets();
    }, [props.equipmentID])

    const getTickets = () => {
        getAPI(`tickets`, {
            equipment_id: props.equipmentID,
            is_invoice_requested: false,
            suffixes: [0],
            perPage: 1
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData);
        }, setIsTicketsLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Equipment Open Service Tickets'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={800}
            >
                <TicketSearchHeader
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    equipmentID={props.equipmentID}
                />
                <TicketList 
                    isTicketsLoading={isTicketsLoading} 
                    tickets={ticketData} 
                />
            </WindowOverlay>
        </>
    )
}

export default EquipmentOpenTickets