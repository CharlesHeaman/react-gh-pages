import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import UploadSupplierManufacturerDocuments from "./UploadSupplierManufacturerDocument";

const SupplierManufacturerDocuments = (props: {
    supplierID: number,
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

            <UploadSupplierManufacturerDocuments 
                supplierID={props.supplierID}
                show={showDocuments} 
                hideFunc={() => setShowDocuments(false)}
                getDocuments={props.getDocuments}
            /> 
        </>
    )
}

export default SupplierManufacturerDocuments