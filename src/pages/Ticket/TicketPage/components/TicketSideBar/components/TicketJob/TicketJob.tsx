import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { TicketResponseData } from "../../../../../../../types/tickets.types";
import { QuoteResponseData } from "../../../../../../../types/quote.types";
import LinkTicketToJob from "./LinkTicketToJob";

const TicketJob = (props: {
    ticketID: number,
    ticketType: number,
    job: QuoteResponseData | undefined,
    setTicketData: Dispatch<SetStateAction<TicketResponseData | undefined>>
}) => {
    const [showLink, setShowLink] = useState(false);

    return (
        <>
            <SideBarModule title="Job">
                <SideBarButton
                    text="Link to Job"
                    iconFont="dataset_linked"
                    clickEvent={() => setShowLink(true)}
                />
            </SideBarModule>

            <LinkTicketToJob 
                ticketID={props.ticketID}
                ticketType={props.ticketType}
                show={showLink} 
                hideFunc={() => setShowLink(false)}
                setTicketData={props.setTicketData}
                job={props.job}
            /> 
        </>
    )
}

export default TicketJob