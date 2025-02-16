import { useState } from "react";
import SearchTable from "../../../../components/ui/SearchTable/SearchTable";
import { SupplierManufacturerDocumentsCollectionResponse, SupplierManufacturerDocumentsResponseData } from "../../../../types/supplierManufacturerDocuments.types";
import DocumentRowSkeleton from "../../../Vehicles/VehiclePage/components/DocumentRowSkeleton";
import DeactivateSupplierManufacturerDocument from "./DeactivateSupplierManufacturerDocument";
import RenameSupplierManufacturerDocument from "./RenameSupplierManufacturerDocument";
import SupplierManufacturerDocumentRow from "./SupplierManufacturerDocumentRow";

const SupplierManufacturerDocumentsList = (props: {
    isLoading: boolean,
    documents: SupplierManufacturerDocumentsCollectionResponse | undefined,
    getDocuments: () => void,
}) => {
    
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [currentDeactivateDocument, setCurrentDeactivateDocument] = useState<SupplierManufacturerDocumentsResponseData>();
    const [currentRenameDocument, setCurrentRenameDocument] = useState<SupplierManufacturerDocumentsResponseData>();

    return (
        <>
            <SearchTable
                headers={['Document Name', 'Type', 'Expires', '']}
                isLoading={props.isLoading}
                skeletonRow={<DocumentRowSkeleton/>}
                skeletonCount={5}
                count={props.documents ? props.documents.data.length : 0}
                resourceName="documents"
                resourceIconFont="description"
                smallNoneFound
                body={props.documents && props.documents.data.map((document, index) => 
                    <SupplierManufacturerDocumentRow
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
            
            <RenameSupplierManufacturerDocument
                document={currentRenameDocument}
                getDocuments={props.getDocuments}
                show={showRename}
                hideFunc={() => setShowRename(false)}
            />

            <DeactivateSupplierManufacturerDocument
                document={currentDeactivateDocument}
                getDocuments={props.getDocuments}
                show={showDeactivate}
                hideFunc={() => setShowDeactivate(false)}
            />
        </>
    )
}

export default SupplierManufacturerDocumentsList