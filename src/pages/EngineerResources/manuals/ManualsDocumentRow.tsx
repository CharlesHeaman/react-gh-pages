import ActionMenu, { ActionItem } from "../../../components/form/ActionMenu/ActionMenu"
import { ManualResponseData } from "../../../types/manuals.types"
import formatDate from "../../../utils/formatDate"
import ManualsDocumentLink from "./ManualsDocumentLink"

const ManualsDocumentRow = (props: {
    document: ManualResponseData,
    actions: Array<ActionItem>
}) => {
    return (
        <tr>
            <td className="text-left">
                <ManualsDocumentLink
                    documentName={props.document.data.name}
                    fileName={props.document.data.upload_url}
                    inactive={!props.document.data.is_active}
                />
            </td>
            <td className="text-left">{formatDate(props.document.data.created_at)}</td>
            <td><ActionMenu actionItems={props.actions}/></td>
        </tr>
    )
}

export default ManualsDocumentRow