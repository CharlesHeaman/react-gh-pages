import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { TicketResponseData } from "../../../../../../../types/tickets.types";
import AbandonTicket from "./components/AbandonTicket";

const TicketAbandon = (props: {
    ticketID: number,
    ticketType: number,
    setTicketData: Dispatch<SetStateAction<TicketResponseData | undefined>>
}) => {
    const [showAbandon, setShowAbandon] = useState(false);

    return (
        <>
            <SideBarModule title="Abandon">
                <SideBarButton
                    text="Abandon Ticket"
                    iconFont="delete"
                    color="red"
                    clickEvent={() => setShowAbandon(true)}
                />
            </SideBarModule>

            <AbandonTicket
                ticketID={props.ticketID}
                ticketType={props.ticketType}
                setTicketData={props.setTicketData}
                show={showAbandon}
                hideFunc={() => setShowAbandon(false)}
            />
        </>
    )
}

export default TicketAbandon