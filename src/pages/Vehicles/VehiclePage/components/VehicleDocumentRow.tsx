import ActionMenu, { ActionItem } from "../../../../components/form/ActionMenu/ActionMenu";
import { VehicleDocumentsResponseData } from "../../../../types/vehicleDocuments.types";
import formatDate from "../../../../utils/formatDate";
import VehicleDocumentLabel from "./VehicleDocumentLabel";
import VehicleDocumentLink from "./VehicleDocumentLink";

const VehicleDocumentRow = (props: {
    document: VehicleDocumentsResponseData,
    actions: Array<ActionItem>
}) => {
    return (
        <tr>
            <td className="text-left" style={{ width: '100%' }}>
                <VehicleDocumentLink
                    documentName={props.document.data.name}
                    fileName={props.document.data.file_name}
                    inactive={!props.document.data.is_active}
                />
            </td>
            <td><VehicleDocumentLabel type={props.document.data.type}/></td>
            <td>{formatDate(props.document.data.created_at)}</td>
            <td><ActionMenu actionItems={props.actions}/></td>
        </tr>
    )
}

export default VehicleDocumentRow