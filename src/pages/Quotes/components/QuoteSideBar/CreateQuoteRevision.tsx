import { useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { QuoteResponseData } from "../../../../types/quote.types";
import postAPI from "../../../../utils/postAPI";
import { useNavigate } from "react-router-dom";

const CreateQuoteRevision = (props: {
    quotedID: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const navigate = useNavigate();

    // Form State
    const [isUpdating, setIsUpdating] = useState(false);

    const updateStatus = () => {
        postAPI(`quotes/${props.quotedID}/create_revision`, {}, {}, (response: any) => {
            props.hideFunc();
            const quoteData: QuoteResponseData = response.data;
            navigate(`../../${quoteData.data.number}/${quoteData.data.revision_number}`, { relative: 'path' })
        }, setIsUpdating);
    }

    return (
        <WindowOverlay
            title='Create Quote Revision'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Create Revision"
                clickFunc={updateStatus}
                iconFont="file_copy"
                submitting={isUpdating}
                submittingText="Creating..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Create a revision for this quote?</p>
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default CreateQuoteRevision