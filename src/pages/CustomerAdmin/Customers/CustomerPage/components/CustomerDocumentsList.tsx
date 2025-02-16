import { useState } from "react";
import SearchTable from "../../../../../components/ui/SearchTable/SearchTable";
import { CustomerDocumentsCollectionResponse, CustomerDocumentsResponseData } from "../../../../../types/customerDocuments.types";
import DocumentRowSkeleton from "../../../../Vehicles/VehiclePage/components/DocumentRowSkeleton";
import CustomerDocumentRow from "./CustomerDocumentRow";
import DeactivateCustomerDocument from "./DeactivateCustomerDocument";
import RenameCustomerDocument from "./RenameCustomerDocument";

const CustomerDocumentsList = (props: {
    isLoading: boolean,
    documents: CustomerDocumentsCollectionResponse | undefined,
    getDocuments: () => void,
}) => {
    
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [currentDeactivateDocument, setCurrentDeactivateDocument] = useState<CustomerDocumentsResponseData>();
    const [currentRenameDocument, setCurrentRenameDocument] = useState<CustomerDocumentsResponseData>();

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
                    <CustomerDocumentRow
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
            
            <RenameCustomerDocument
                document={currentRenameDocument}
                getDocuments={props.getDocuments}
                show={showRename}
                hideFunc={() => setShowRename(false)}
            />

            <DeactivateCustomerDocument
                document={currentDeactivateDocument}
                getDocuments={props.getDocuments}
                show={showDeactivate}
                hideFunc={() => setShowDeactivate(false)}
            />
        </>
    )
}

export default CustomerDocumentsList