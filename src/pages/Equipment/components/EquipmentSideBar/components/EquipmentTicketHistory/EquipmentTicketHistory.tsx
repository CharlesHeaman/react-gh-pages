import { useState } from "react"
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import EquipmentServiceTickets from "./EquipmentServiceTickets"
import EquipmentMaintenanceHistory from "./components/EquipmentMaintenanceHistory"
import EquipmentQuoteHistory from "./components/EquipmentQuotes"

const EquipmentTicketHistory = (props: {
    equipmentID: number,
    serviceTotal: number,
    maintenanceTotal: number,
    quotesCount: number,
}) => {
    const [showService, setShowService] = useState(false);
    const [showMaintenance, setShowMaintenance] = useState(false);
    const [showQuotes, setShowQuotes] = useState(false);

    return (
        <>
            <SideBarModule title='Ticket/Quote History'>
                <SideBarButton 
                    text={`Service Tickets (${props.serviceTotal})`}
                    iconFont='local_activity'
                    clickEvent={() => setShowService(true)}
                />
                <SideBarButton 
                    text={`Maintenance Tickets (${props.maintenanceTotal})`}
                    iconFont='confirmation_number'
                    clickEvent={() => setShowMaintenance(true)}
                />
                <SideBarButton
                    text={`Quotes (${props.quotesCount})`}
                    iconFont="request_quote"
                    clickEvent={() => setShowQuotes(true)}
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

            <EquipmentQuoteHistory
                equipmentID={props.equipmentID} 
                totalCount={props.serviceTotal} 
                show={showQuotes} 
                hideFunc={() => setShowQuotes(false)}
            />
        </>
    )
}

export default EquipmentTicketHistory