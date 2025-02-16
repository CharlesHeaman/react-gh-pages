import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import TicketQuickCost from "./TicketQuickCost";

const TicketAccounts = (props: {
    tickets: Array<any>,
    ticketNumber: number,
    departmentID: number,
}) => {
    const [showQuickCost, setShowQuickCost] = useState(false);

    return (
        <>
            <SideBarModule title="Accounts">
                <SideBarButton
                    text="Quick Cost"
                    iconFont="calculate"
                    clickEvent={() => setShowQuickCost(true)}
                />
            </SideBarModule>

            <TicketQuickCost
                tickets={props.tickets}
                ticketNumber={props.ticketNumber}
                departmentID={props.departmentID}
                show={showQuickCost}
                hideFunc={() => setShowQuickCost(false)}
            />
        </>
    )
}

export default TicketAccounts