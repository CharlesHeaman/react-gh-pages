import { TicketUploadResponseData } from "../../../types/ticketUploads.types"
import formatDate from "../../../utils/formatDate"
import TicketUploadLink from "./TicketUploadLink"

const TicketUploadRow = (props: {
    upload: TicketUploadResponseData,
    // actions: Array<ActionItem>
}) => {
    return (
        <tr>
            <td className="text-left">
                <TicketUploadLink
                    ticketType={props.upload.data.ticket_type}
                    ticketID={props.upload.data.ticket_id}
                    documentName={props.upload.data.name}
                    fileName={props.upload.data.name}
                />
            </td>
            <td>{formatDate(props.upload.data.uploaded_at)}</td>
            {/* <td><ActionMenu actionItems={props.actions}/></td> */}
        </tr>
    )
}

export default TicketUploadRow