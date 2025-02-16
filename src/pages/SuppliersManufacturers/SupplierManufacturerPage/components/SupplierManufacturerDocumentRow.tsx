import ActionMenu, { ActionItem } from "../../../../components/form/ActionMenu/ActionMenu";
import ExpiryDateLabel from "../../../../components/ui/ExpiryDateLabel/ExpiryDateLabel";
import SupplierManufacturerDocumentLink from "../../../../components/ui/SupplierManufacturerDocumentLink/SupplierManufacturerDocumentLink";
import { SupplierManufacturerDocumentsResponseData } from "../../../../types/supplierManufacturerDocuments.types";
import SupplierManufacturerDocumentLabel from "../../components/SupplierManufacturerDocumentLabel";

const SupplierManufacturerDocumentRow = (props: {
    document: SupplierManufacturerDocumentsResponseData,
    actions: Array<ActionItem>
}) => {
    return (
        <tr>
            <td className="text-left" style={{ width: '100%' }}>
                <SupplierManufacturerDocumentLink
                    documentName={props.document.data.name}
                    fileName={props.document.data.file_name}
                    inactive={!props.document.data.is_active}
                />
            </td>
            <td><SupplierManufacturerDocumentLabel type={props.document.data.type}/></td>
            <td><ExpiryDateLabel date={props.document.data.valid_to}/></td>
            <td><ActionMenu actionItems={props.actions}/></td>
        </tr>
    )
}

export default SupplierManufacturerDocumentRow