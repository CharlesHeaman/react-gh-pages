import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import UploadPlantEquipmentDocuments from "./components/UploadPlantEquipmentDocuments";

const PlantEquipmentUploads = (props: {
    plantEquipmentID: number,
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

            <UploadPlantEquipmentDocuments 
                plantEquipmentID={props.plantEquipmentID}
                show={showDocuments} 
                hideFunc={() => setShowDocuments(false)}
                getDocuments={props.getDocuments}
            /> 
        </>
    )
}

export default PlantEquipmentUploads