import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import SupplierManufacturerContactHistory from "./components/SupplierManufacturerContactHistory";

const SupplierContactAssociatedResources = (props: {
    contactID: number,
    activityCount: number,
}) => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <> 
            <SideBarModule title="Supplier/Manufacturer Contact">
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <SupplierManufacturerContactHistory
                contactID={props.contactID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            />
        </>
    )
}

export default SupplierContactAssociatedResources