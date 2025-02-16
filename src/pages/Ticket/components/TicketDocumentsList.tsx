import { useState } from "react";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { TicketUploadCollectionResponse, TicketUploadResponseData } from "../../../types/ticketUploads.types";
import DocumentRowSkeleton from "../../Vehicles/VehiclePage/components/DocumentRowSkeleton";
import DeactivateTicketDocument from "./DeactivateTicketDocument";
import RenameTicketDocument from "./RenameTicketDocument";
import TicketDocumentRow from "./TicketDocumentRow";

const TicketDocumentsList = (props: {
    isLoading: boolean,
    documents: TicketUploadCollectionResponse | undefined,
    getDocuments: () => void,
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [currentDeactivateDocument, setCurrentDeactivateDocument] = useState<TicketUploadResponseData>();
    const [currentRenameDocument, setCurrentRenameDocument] = useState<TicketUploadResponseData>();

    return (
        <>
            <SearchTable
                headers={['Document Name', 'Date', '']}
                isLoading={props.isLoading}
                skeletonRow={<DocumentRowSkeleton hideType/>}
                skeletonCount={5}
                count={props.documents ? props.documents.data.length : 0}
                resourceName="documents"
                resourceIconFont="description"
                smallNoneFound
                body={props.documents && props.documents.data.map((document, index) => 
                    <TicketDocumentRow
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

            <RenameTicketDocument
                document={currentRenameDocument}
                getDocuments={props.getDocuments}
                show={showRename}
                hideFunc={() => setShowRename(false)}
            />

            <DeactivateTicketDocument
                document={currentDeactivateDocument}
                getDocuments={props.getDocuments}
                show={showDeactivate}
                hideFunc={() => setShowDeactivate(false)}
            />
        </>
    )
}

export default TicketDocumentsList