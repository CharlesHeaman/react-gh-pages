import { useState } from "react";
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import UploadPurchaseOrderAttachments from "./components/UploadPurchaseOrderAttachment";

const PurchaseOrderAttachments = (props: {
    purchaseOrderID: number,
    getAttachments: (supplierID: number) => void
}) => {
    const [showAttachments, setShowAttachments] = useState(false);

    return (
        <>
            <SideBarModule title="Attachments">
                <SideBarButton
                    text="Upload Attachment"
                    iconFont="attach_email"
                    color="no-color"
                    clickEvent={() => setShowAttachments(true)}
                />
            </SideBarModule>

            <UploadPurchaseOrderAttachments 
                purchaseOrderID={props.purchaseOrderID}
                show={showAttachments} 
                hideFunc={() => setShowAttachments(false)}
                getAttachments={props.getAttachments}
            /> 
        </>
    )
}

export default PurchaseOrderAttachments