import ActionMenu, { ActionItem } from "../../../components/form/ActionMenu/ActionMenu"
import { PurchaseOrderAttachmentResponseData } from "../../../types/purchaseOrderAttachments.types"
import PurchaseOrderAttachmentLink from "./PurchaseOrderAttachmentLink"


const PurchaseOrderAttachmentRow = (props: {
    attachment: PurchaseOrderAttachmentResponseData,
    actions: Array<ActionItem>,
    noEdit?: boolean
}) => {
    return (
        <tr>
            <td className="text-left">
                <PurchaseOrderAttachmentLink
                    attachmentName={props.attachment.data.name}
                    fileName={props.attachment.data.file_name}
                />
            </td>
            {!props.noEdit && <td><ActionMenu actionItems={props.actions}/></td>}
        </tr>
    )
}

export default PurchaseOrderAttachmentRow