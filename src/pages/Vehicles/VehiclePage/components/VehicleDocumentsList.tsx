import { useState } from "react";
import SearchTable from "../../../../components/ui/SearchTable/SearchTable";
import { VehicleDocumentsCollectionResponse, VehicleDocumentsResponseData } from "../../../../types/vehicleDocuments.types";
import DeactivateVehicleDocument from "./DeactivateVehicleDocument";
import DocumentRowSkeleton from "./DocumentRowSkeleton";
import RenameVehicleDocument from "./RenameVehicleDocument";
import VehicleDocumentRow from "./VehicleDocumentRow";

const VehicleDocumentsList = (props: {
    isLoading: boolean,
    documents: VehicleDocumentsCollectionResponse | undefined,
    getDocuments: () => void,
}) => {
    
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [currentDeactivateDocument, setCurrentDeactivateDocument] = useState<VehicleDocumentsResponseData>();
    const [currentRenameDocument, setCurrentRenameDocument] = useState<VehicleDocumentsResponseData>();

    return (
        <>
            <SearchTable
                headers={['Document Name', 'Type', 'Date', '']}
                isLoading={props.isLoading}
                skeletonRow={<DocumentRowSkeleton/>}
                skeletonCount={5}
                count={props.documents ? props.documents.data.length : 0}
                resourceName="documents"
                resourceIconFont="description"
                smallNoneFound
                body={props.documents && props.documents.data.map((document, index) => 
                    <VehicleDocumentRow
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
            
            <RenameVehicleDocument
                document={currentRenameDocument}
                getDocuments={props.getDocuments}
                show={showRename}
                hideFunc={() => setShowRename(false)}
            />

            <DeactivateVehicleDocument
                document={currentDeactivateDocument}
                getDocuments={props.getDocuments}
                show={showDeactivate}
                hideFunc={() => setShowDeactivate(false)}
            />
        </>
    )
}

export default VehicleDocumentsList