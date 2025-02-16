import { useState } from "react";
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { CustomerResponseData } from "../../../../../../../../types/customers.types";
import CustomerRefrigerant from "./components/CustomerRefrigerant";
import CustomerEquipmentReport from "./components/CustomerEquipmentReport";

const CustomerReports = (props: {
    customer: CustomerResponseData
}) => {
    const [showRefrigerant, setShowRefrigerant] = useState(false);
    const [showEquipment, setShowEquipment] = useState(false);
    return (
        <>
            <SideBarModule title="Reports">
                <SideBarButton 
                    text="Equipment Report" 
                    iconFont="local_laundry_service" 
                    clickEvent={() => setShowEquipment(true)}
                />
                <SideBarButton 
                    text="Refrigerant Holding" 
                    iconFont="propane_tank" 
                    clickEvent={() => setShowRefrigerant(true)}
                />
            </SideBarModule>

            <CustomerRefrigerant
                customer={props.customer}
                show={showRefrigerant}
                hideFunc={() => setShowRefrigerant(false)}
            />

            <CustomerEquipmentReport
                customer={props.customer}
                show={showEquipment}
                hideFunc={() => setShowEquipment(false)}
            />

        </>
    )
}

export default CustomerReports