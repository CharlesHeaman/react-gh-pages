import { useState } from "react"
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import EquipmentServiceTickets from "../../../../../../Equipment/components/EquipmentSideBar/components/EquipmentTicketHistory/EquipmentServiceTickets";
import EquipmentMaintenanceHistory from "../../../../../../Equipment/components/EquipmentSideBar/components/EquipmentTicketHistory/components/EquipmentMaintenanceHistory";
import EquipmentRefrigerantMovementsList from "../../../../../../Equipment/components/EquipmentSideBar/components/EquipmentRefrigerant/EquipmentRefrigerantMovements";

const TicketEquipmentHistory = (props: {
    equipmentID: number,
    ticketNumbers: Array<number>,
    serviceTotal: number,
    maintenanceTotal: number,
    movementCount: number

}) => {
    const [showService, setShowService] = useState(false);
    const [showMaintenance, setShowMaintenance] = useState(false);
    const [showMovements, setShowMovements] = useState(false);

    return (
        <>
            <SideBarModule title='Equipment History'>
                <SideBarButton 
                    text={`Refrigerant Movements (${props.movementCount})`}
                    iconFont='propane'
                    clickEvent={() => setShowMovements(true)}
                />
                <SideBarButton 
                    text={`Service (${props.serviceTotal})`}
                    iconFont='local_activity'
                    clickEvent={() => setShowService(true)}
                />
                <SideBarButton 
                    text={`Planned Maintenance (${props.maintenanceTotal})`}
                    iconFont='confirmation_number'
                    clickEvent={() => setShowMaintenance(true)}
                />
            </SideBarModule>

            <EquipmentServiceTickets 
                equipmentID={props.equipmentID} 
                totalCount={props.serviceTotal} 
                show={showService} 
                hideFunc={() => setShowService(false)}
            />

            <EquipmentMaintenanceHistory
                equipmentID={props.equipmentID} 
                totalCount={props.serviceTotal} 
                show={showMaintenance} 
                hideFunc={() => setShowMaintenance(false)}
            />

            <EquipmentRefrigerantMovementsList 
                ticketNumbers={props.ticketNumbers} 
                totalCount={props.movementCount} 
                show={showMovements} 
                hideFunc={() => setShowMovements(false)}
            />

        </>
    )
}

export default TicketEquipmentHistory