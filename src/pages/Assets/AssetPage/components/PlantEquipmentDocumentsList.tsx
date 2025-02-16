import { useState } from "react";
import SearchTable from "../../../../components/ui/SearchTable/SearchTable";
import { PlantEquipmentDocumentsCollectionResponse, PlantEquipmentDocumentsResponseData } from "../../../../types/plantEquipmentDocument.types";
import DocumentRowSkeleton from "../../../Vehicles/VehiclePage/components/DocumentRowSkeleton";
import DeactivatePlantEquipmentDocument from "./AssetSideBar/components/PlantEquipmentUploads/components/DeactivatePlantEquipmentDocuments";
import RenamePlantEquipmentDocument from "./AssetSideBar/components/PlantEquipmentUploads/components/RenamePlantEquipmentDocuments";
import PlantEquipmentDocumentRow from "./PlantEquipmentDocumentRow";

const PlantEquipmentDocumentsList = (props: {
    isLoading: boolean,
    documents: PlantEquipmentDocumentsCollectionResponse | undefined,
    getDocuments: () => void,
}) => {
    
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [currentDeactivateDocument, setCurrentDeactivateDocument] = useState<PlantEquipmentDocumentsResponseData>();
    const [currentRenameDocument, setCurrentRenameDocument] = useState<PlantEquipmentDocumentsResponseData>();

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
                    <PlantEquipmentDocumentRow
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
            
            <RenamePlantEquipmentDocument
                document={currentRenameDocument}
                getDocuments={props.getDocuments}
                show={showRename}
                hideFunc={() => setShowRename(false)}
            />

            <DeactivatePlantEquipmentDocument
                document={currentDeactivateDocument}
                getDocuments={props.getDocuments}
                show={showDeactivate}
                hideFunc={() => setShowDeactivate(false)}
            />
        </>
    )
}

export default PlantEquipmentDocumentsList