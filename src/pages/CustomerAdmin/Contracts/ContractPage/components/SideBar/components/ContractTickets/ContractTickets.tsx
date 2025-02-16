import { useState } from "react";
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import ContractServiceTickets from "./components/ContractServiceTickets";
import ContractMaintenanceTickets from "./components/ContractMaintenanceTickets";

const ContractTickets = (props: {
    contractID: number,
    serviceCount: number,
    maintenanceCount: number,
}) => {
    const [showServiceTickets, setShowServiceTickets] = useState(false);
    const [showMaintenanceTickets, setShowMaintenanceTickets] = useState(false);

    return (
        <>
            <SideBarModule title='Tickets'>
                <SideBarButton
                    text={`Service Tickets (${props.serviceCount})`}
                    iconFont="local_activity"
                    clickEvent={() => setShowServiceTickets(true)}
                />
                <SideBarButton
                    text={`Maintenance Tickets (${props.maintenanceCount})`}
                    iconFont="confirmation_number"
                    clickEvent={() => setShowMaintenanceTickets(true)}
                />
            </SideBarModule>

            <ContractServiceTickets
                contractID={props.contractID}
                totalCount={props.serviceCount}
                show={showServiceTickets}
                hideFunc={() => setShowServiceTickets(false)}
            />

            <ContractMaintenanceTickets
                contractID={props.contractID}
                totalCount={props.maintenanceCount}
                show={showMaintenanceTickets}
                hideFunc={() => setShowMaintenanceTickets(false)}
            />
        </>
    )
}

export default ContractTickets