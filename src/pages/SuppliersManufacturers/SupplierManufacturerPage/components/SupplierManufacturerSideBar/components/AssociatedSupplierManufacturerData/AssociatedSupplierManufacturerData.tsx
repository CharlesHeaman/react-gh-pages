import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import SupplierManufacturerContacts from "./components/SupplierManufacturerContacts";
import { useSearchParams } from "react-router-dom";
import SupplierManufacturerHistory from "./components/SupplierManufacturerHistory";

const AssociatedSupplierManufacturerData = (props: {
    supplierID: number,
    contactsCount: number,
    activityCount: number,
}) => {
    const [searchParams] = useSearchParams();
    const [showContacts, setShowContacts] = useState(searchParams.get("showContacts") === "true");
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title="Supplier/Manufacturer">
                <SideBarButton
                    text={`Contacts (${props.contactsCount})`}
                    iconFont="contact_phone"
                    clickEvent={() => setShowContacts(true)}
                />
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <SupplierManufacturerContacts
                supplierID={props.supplierID} 
                totalCount={props.contactsCount}            
                show={showContacts}
                hideFunc={() => setShowContacts(false)} 
            />

            <SupplierManufacturerHistory
                supplierManufacturerID={props.supplierID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            />
        </>
    )
}

export default AssociatedSupplierManufacturerData