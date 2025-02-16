import { useState } from "react";
import SearchTable from "../../../../components/ui/SearchTable/SearchTable";
import { QuoteDocumentsCollectionResponse, QuoteDocumentsResponseData } from "../../../../types/quoteDocuments.types";
import DocumentRowSkeleton from "../../../Vehicles/VehiclePage/components/DocumentRowSkeleton";
import DeactivateQuoteDocument from "./DeactivateQuoteDocument";
import QuoteDocumentRow from "./QuoteDocumentRow";
import RenameQuoteDocument from "./RenameQuoteDocument";

const QuoteDocumentsList = (props: {
    isLoading?: boolean,
    documents: QuoteDocumentsCollectionResponse | undefined,
    getDocuments: () => void,
}) => {
    
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [currentDeactivateDocument, setCurrentDeactivateDocument] = useState<QuoteDocumentsResponseData>();
    const [currentRenameDocument, setCurrentRenameDocument] = useState<QuoteDocumentsResponseData>();

    return (
        <>
            <SearchTable
                headers={['Document Name', 'Date', '']}
                isLoading={props.isLoading}
                skeletonRow={<DocumentRowSkeleton/>}
                skeletonCount={5}
                count={props.documents ? props.documents.data.length : 0}
                resourceName="documents"
                resourceIconFont="description"
                smallNoneFound
                body={props.documents && props.documents.data.map((document, index) => 
                    <QuoteDocumentRow
                        document={document}
                        actions={[
                            {
                                iconFont: 'edit',
                                text: 'Rename',
                                clickFunc: () => {
                                    setShowRename(true);
                                    setCurrentRenameDocument(document);
                                }
                            },
                            {
                                iconFont: 'highlight_off',
                                text: 'Deactivate',
                                clickFunc: () => {
                                    setShowDeactivate(true)
                                    setCurrentDeactivateDocument(document);
                                }
                            }
                        ]}
                        key={index}
                    />
                )}
            />

            <RenameQuoteDocument
                document={currentRenameDocument}
                getDocuments={props.getDocuments}
                show={showRename}
                hideFunc={() => setShowRename(false)}
            />

            <DeactivateQuoteDocument
                document={currentDeactivateDocument}
                getDocuments={props.getDocuments}
                show={showDeactivate}
                hideFunc={() => setShowDeactivate(false)}
            />
        </>
    )
}

export default QuoteDocumentsList