import { useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";
import UploadQuoteDocuments from "./UploadQuoteDocument";

const QuoteUploads = (props: {
    quoteID: number,
    getDocuments: (quoteID: number) => void,
}) => {
    const [showDocuments, setShowDocuments] = useState(false);

    return (
        <>
            <SideBarModule title="Documents">
                <SideBarButton
                    text="Upload Document"
                    iconFont="upload"
                    color="no-color"
                    clickEvent={() => setShowDocuments(true)}
                />
            </SideBarModule>

            <UploadQuoteDocuments 
                quoteID={props.quoteID}
                show={showDocuments} 
                hideFunc={() => setShowDocuments(false)}
                getDocuments={props.getDocuments}
            /> 
        </>
    )
}

export default QuoteUploads