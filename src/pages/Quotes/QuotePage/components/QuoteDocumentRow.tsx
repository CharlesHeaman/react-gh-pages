import ActionMenu, { ActionItem } from "../../../../components/form/ActionMenu/ActionMenu"
import { QuoteDocumentsResponseData } from "../../../../types/quoteDocuments.types"
import formatDate from "../../../../utils/formatDate"
import QuoteDocumentLink from "./QuoteDocumentLink"

const QuoteDocumentRow = (props: {
    document: QuoteDocumentsResponseData,
    actions: Array<ActionItem>
}) => {
    return (
        <tr>
            <td className="text-left">
                <QuoteDocumentLink
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

export default QuoteDocumentRow