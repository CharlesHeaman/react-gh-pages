import ActionMenu, { ActionItem } from "../../../components/form/ActionMenu/ActionMenu"
import { TicketUploadResponseData } from "../../../types/ticketUploads.types"
import formatDate from "../../../utils/formatDate"
import TicketDocumentLink from "./TicketDocumentLink"

const TicketDocumentRow = (props: {
    document: TicketUploadResponseData,
    actions: Array<ActionItem>
}) => {
    return (
        <tr>
            <td className="text-left" style={{ width: '100%' }}>
                <TicketDocumentLink
                    documentName={props.document.data.name}
                    fileName={props.document.data.file_name}
                    inactive={!props.document.data.is_active}
                />
            </td>
            <td>{formatDate(props.document.data.created_at)}</td>
            <td><ActionMenu actionItems={props.actions}/></td>
        </tr>
    )
}

export default TicketDocumentRow