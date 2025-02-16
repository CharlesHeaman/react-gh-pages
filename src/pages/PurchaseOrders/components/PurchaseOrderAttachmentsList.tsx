import { useState } from "react";
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer";
import NoneFound from "../../../components/ui/General/NoneFound/NoneFound";
import { PurchaseOrderAttachmentResponseData } from "../../../types/purchaseOrderAttachments.types";
import PurchaseOrderAttachmentRow from "./PurchaseOrderAttachmentRow";
import RenamePurchaseOrderAttachment from "./RenamePurchaseOrderAttachment";
import RemovePurchaseOrderAttachment from "./RemovePurchaseOrderAttachment";

const PurchaseOrderAttachmentList = (props: {
    attachments: Array<PurchaseOrderAttachmentResponseData>,
    getAttachments?: () => void,
    noEdit?: boolean
}) => {
    
    const [showRemove, setShowRemove] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [currentRemoveAttachment, setCurrentRemoveAttachment] = useState<PurchaseOrderAttachmentResponseData>();
    const [currentRenameAttachment, setCurrentRenameAttachment] = useState<PurchaseOrderAttachmentResponseData>();

    return (
        <>
            {props.attachments.length > 0 ?
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '100%'}}>Attachment Name</th>
                            {!props.noEdit && <th style={{ width: '56px'}}></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {props.attachments.map((attachment, index) => 
                            <PurchaseOrderAttachmentRow
                                attachment={attachment}
                                actions={[
                                    {
                                        iconFont: 'edit',
                                        text: 'Rename',
                                        clickFunc: () => {
                                            setShowRename(true);
                                            setCurrentRenameAttachment(attachment);
                                        }
                                    },
                                    {
                                        iconFont: 'remove_circle',
                                        text: 'Remove',
                                        clickFunc: () => {
                                            setShowRemove(true)
                                            setCurrentRemoveAttachment(attachment);
                                        }
                                    }
                                ]}
                                noEdit={props.noEdit}
                                key={index}
                            />
                        )}
                    </tbody>
                </table> :
                <InnerContainer>
                    <NoneFound 
                        iconFont={"description"} 
                        text={"No Attachments Found"}             
                        small       
                    />
                </InnerContainer>
            }
            
            <RenamePurchaseOrderAttachment
                attachment={currentRenameAttachment}
                getAttachments={props.getAttachments ? props.getAttachments : () => null}
                show={showRename}
                hideFunc={() => setShowRename(false)}
            />

            <RemovePurchaseOrderAttachment
                attachment={currentRemoveAttachment}
                getAttachments={props.getAttachments ? props.getAttachments : () => null}
                show={showRemove}
                hideFunc={() => setShowRemove(false)}
            />
        </>
    )
}

export default PurchaseOrderAttachmentList