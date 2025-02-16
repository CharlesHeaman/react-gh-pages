import { useState } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import EquipmentOpenQuotes from "./components/EquipmentOpenQuotes";
import EquipmentOpenTickets from "./components/EquipmentOpenTickets";

const EquipmentQuotesTickets = (props: {
    equipmentID: number,
    ticketCount: number,
    quotesCount: number
}) => {
    const [showTickets, setShowTickets] = useState(false);
    const [showQuotes, setShowQuotes] = useState(false);

    return (
        <>
            <SideBarModule title='Open Quotes/Tickets'>
                <SideBarButton
                    text={`Service Tickets (${props.ticketCount})`}
                    iconFont="local_activity"
                    clickEvent={() => setShowTickets(true)}
                />
                <SideBarButton
                    text={`Quotes (${props.quotesCount})`}
                    iconFont="request_quote"
                    clickEvent={() => setShowQuotes(true)}
                />
            </SideBarModule>

            <EquipmentOpenTickets
                equipmentID={props.equipmentID}
                totalCount={props.ticketCount}
                show={showTickets}
                hideFunc={() => setShowTickets(false)}
            />
            
            <EquipmentOpenQuotes
                equipmentID={props.equipmentID}
                totalCount={props.quotesCount}
                show={showQuotes}
                hideFunc={() => setShowQuotes(false)}
            />
        </>
    )
}

export default EquipmentQuotesTickets