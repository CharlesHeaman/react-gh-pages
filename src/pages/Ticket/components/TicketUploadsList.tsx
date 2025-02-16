import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer";
import NoneFound from "../../../components/ui/General/NoneFound/NoneFound";
import { TicketUploadResponseData } from "../../../types/ticketUploads.types";
import CustomerDocumentRow from "../../CustomerAdmin/Customers/CustomerPage/components/CustomerDocumentRow";
import TicketUploadRow from "./TicketUploadRow";

const TicketUploadsList = (props: {
    uploads: Array<TicketUploadResponseData>,
    // getDocuments: () => void,
}) => {
    
    // const [showDeactivate, setShowDeactivate] = useState(false);
    // const [showRename, setShowRename] = useState(false);
    // const [currentDeactivateDocument, setCurrentDeactivateDocument] = useState<CustomerDocumentsResponseData>();
    // const [currentRenameDocument, setCurrentRenameDocument] = useState<CustomerDocumentsResponseData>();

    return (
        <>
            {props.uploads.length > 0 ?
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '100%'}}>Upload Name</th>
                            <th>Date</th>
                            {/* <th style={{ width: '56px'}}></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {props.uploads.map((document, index) => 
                            <TicketUploadRow
                                upload={document}
                                // actions={[
                                //     {
                                //         iconFont: 'edit',
                                //         text: 'Rename',
                                //         clickFunc: () => {
                                //             setShowRename(true);
                                //             setCurrentRenameDocument(document);
                                //         }
                                //     },
                                //     {
                                //         iconFont: 'highlight_off',
                                //         text: 'Deactivate',
                                //         clickFunc: () => {
                                //             setShowDeactivate(true)
                                //             setCurrentDeactivateDocument(document);
                                //         }
                                //     }
                                // ]}
                                key={index}
                            />
                        )}
                    </tbody>
                </table> :
                <InnerContainer>
                    <NoneFound 
                        iconFont={"description"} 
                        text={"No Uploads Found"}             
                        small       
                    />
                </InnerContainer>
            }
            
            {/* <RenameCustomerDocument
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
            /> */}
        </>
    )
}

export default TicketUploadsList