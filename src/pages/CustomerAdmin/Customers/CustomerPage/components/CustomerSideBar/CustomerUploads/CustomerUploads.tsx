import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import UploadCustomerDocuments from "./components/UploadCustomerDocument";

const CustomerUploads = (props: {
    customerID: number,
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

            <UploadCustomerDocuments 
                customerID={props.customerID}
                show={showDocuments} 
                hideFunc={() => setShowDocuments(false)}
                getDocuments={props.getDocuments}
            /> 
        </>
    )
}

export default CustomerUploads