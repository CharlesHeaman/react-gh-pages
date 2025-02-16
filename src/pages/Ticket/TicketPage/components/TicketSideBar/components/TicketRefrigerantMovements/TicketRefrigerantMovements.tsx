import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import TicketRefrigerantMovementsList from "./components/TicketRefrigerantMovementsList";

const TicketRefrigerantMovements = (props: {
    ticketNumber: number,
    refrigerantMovementCount: number,
}) => {
    const [showMovements, setShowMovements] = useState(false);
    return (
        <>
            <SideBarModule title="Refrigerant Movements">
                <SideBarButton
                    text={`Refrigerant Movements (${props.refrigerantMovementCount})`}
                    iconFont="propane"
                    clickEvent={() => setShowMovements(true)}
                />
            </SideBarModule>

            <TicketRefrigerantMovementsList 
                ticketNumber={props.ticketNumber} 
                totalCount={props.refrigerantMovementCount}
                show={showMovements} 
                hideFunc={() => setShowMovements(false)}
            />
        </>
    )
}

export default TicketRefrigerantMovements