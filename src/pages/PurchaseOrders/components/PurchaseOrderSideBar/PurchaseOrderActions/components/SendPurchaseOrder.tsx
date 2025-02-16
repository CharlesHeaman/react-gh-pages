import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../components/form/SubmitButton/SubmitButton";
import SupplierContactSelect from "../../../../../../components/form/SupplierContactSelect/SupplierContactSelect";
import GridItem from "../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { PurchaseOrderResponseData } from "../../../../../../types/purchaseOrder.types";
import { PurchaseOrderAttachmentResponseData } from "../../../../../../types/purchaseOrderAttachments.types";
import { SupplierContactResponseData } from "../../../../../../types/supplierContact.types";
import putAPI from "../../../../../../utils/putAPI";
import PurchaseOrderAttachmentList from "../../../PurchaseOrderAttachmentsList";
import { SupplierManufacturerResponseData } from "../../../../../../types/supplierManufacturer.types";
import postAPI from "../../../../../../utils/postAPI";

const SendPurchaseOrder = (props: {
    purchaseOrderID: number,
    supplier: SupplierManufacturerResponseData,
    attachments: Array<PurchaseOrderAttachmentResponseData>,
    setPurchaseOrderData: Dispatch<SetStateAction<PurchaseOrderResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {

    const [isUpdating, setIsUpdating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [selectedContact, setSelectedContact] = useState<SupplierContactResponseData | undefined>();
    
    const sendPurchaseOrder = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        postAPI(`purchase_orders/${props.purchaseOrderID}/send`, {}, {
            supplier_contact_id: selectedContact.id,
        }, (response: any) => {
            const purchaseOrderData: PurchaseOrderResponseData = response.data;
            props.setPurchaseOrderData(purchaseOrderData);
            props.hideFunc();
        }, setIsUpdating)
    }
    
    const formComplete = selectedContact?.id !== undefined;
    
    return (
        <WindowOverlay
            title='Send Purchase Order'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={400}
            footer={<SubmitButton
                text="Send Purchase Order"
                iconFont="email"
                clickFunc={sendPurchaseOrder}
                disabled={hasSubmitted && !formComplete} 
                submitting={isUpdating}
                submittingText="Sending..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select supplier contact to send this purchase order.</p>
                </GridItem>
                {props.attachments.length > 0 && <GridItem>
                    <p>All attachments will be send with be included with the email</p>
                </GridItem>}
                <GridItem title='Supplier Contact'>
                    <SupplierContactSelect 
                        supplier_id={props.supplier.id}
                        selectedSupplierContact={selectedContact} 
                        setSelectedSupplierContact={setSelectedContact} 
                        hasSubmitted={hasSubmitted}
                        required
                    />
                </GridItem>
                <GridItem title='Attachments'>
                    <PurchaseOrderAttachmentList  
                        attachments={props.attachments}
                        noEdit
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default SendPurchaseOrder