import { useState } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import JobTicketsList from "./components/JobTicketsList";
import { QuoteResponseData } from "../../../../../../types/quote.types";

const JobAssociatedData = (props: {
    departmentName: string,
    job: QuoteResponseData,
    ticketCount: number,
}) => {
    const [showTickets, setShowTickets] = useState(false);

    return (
        <>
            <SideBarModule title='Job'>
                <SideBarButton
                    text={`Tickets (${props.ticketCount})`}
                    iconFont="local_activity"
                    clickEvent={() => setShowTickets(true)}
                />
            </SideBarModule>

            <JobTicketsList     
                job={props.job}
                departmentName={props.departmentName}
                totalCount={props.ticketCount} 
                show={showTickets} 
                hideFunc={() => setShowTickets(false)}
            />
        </>
    )
}

export default JobAssociatedData