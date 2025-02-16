import { useState } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import UploadVehicleDocuments from "./components/UploadVehicleDocuments";

const VehicleUploads = (props: {
    vehicleID: number,
    getDocuments: (supplierID: number) => void
}) => {
    const [showDocuments, setShowDocuments] = useState(false);

    return (
        <>
            <SideBarModule title="Documents">
                <SideBarButton
                    text="Upload Document"
                    iconFont="upload"
                    color="no-color"
                    clickEvent={() => setShowDocuments(true)}
                />
            </SideBarModule>

            <UploadVehicleDocuments 
                vehicleID={props.vehicleID}
                show={showDocuments} 
                hideFunc={() => setShowDocuments(false)}
                getDocuments={props.getDocuments}
            /> 
        </>
    )
}

export default VehicleUploads