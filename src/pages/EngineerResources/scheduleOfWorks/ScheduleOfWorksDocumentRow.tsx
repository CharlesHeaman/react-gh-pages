import ActionMenu, { ActionItem } from "../../../components/form/ActionMenu/ActionMenu"
import { ScheduleOfWorksResponseData } from "../../../types/scheduleOfWorks.types"
import formatDate from "../../../utils/formatDate"
import ScheduleOfWorksDocumentLink from "./ScheduleOfWorksDocumentLink"

const ScheduleOfWorksDocumentRow = (props: {
    document: ScheduleOfWorksResponseData,
    actions: Array<ActionItem>
}) => {
    return (
        <tr>
            <td className="text-left">
                <ScheduleOfWorksDocumentLink
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

export default ScheduleOfWorksDocumentRow