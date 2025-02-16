import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import OpenCustomerTicketList from "./OpenCustomerTicketList";

const OpenCustomerTickets = (props: {
    customerID: number,
    openTicketCount: number,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showTicketList, setShowTicketList] = useState(searchParams.get("showTickets") === "true");

    return (
        <>
            <SideBarButton
                text={`Open Tickets (${props.openTicketCount})`}
                iconFont="local_activity"
                clickEvent={() => setShowTicketList(true)}
            />

            <OpenCustomerTicketList
                showTicketList={showTicketList}
                setShowTicketList={setShowTicketList}
                customerID={props.customerID}
            />
        </>
    )
}

export default OpenCustomerTickets