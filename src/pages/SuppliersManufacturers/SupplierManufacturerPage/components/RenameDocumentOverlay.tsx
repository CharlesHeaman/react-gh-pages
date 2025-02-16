import { Dispatch, SetStateAction } from "react"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import TextInput from "../../../../components/form/TextInput/TextInput"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay"

const RenameDocumentOverlay = (props: {
    show: boolean,
    documentName: string,
    setDocumentName: Dispatch<SetStateAction<string>>,
    formComplete: boolean
    hideFunc: () => void,
    isSubmitting: boolean,
    hasSubmitted: boolean,
    submitFunc: () => void,
    isAttachment?: boolean
}) => {
    return (
        <WindowOverlay
            title={`Rename ${!props.isAttachment ? 'Document' : 'Attachment'}`}
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text={`Rename ${!props.isAttachment ? 'Document' : 'Attachment'}`}
                iconFont="edit"
                clickFunc={props.submitFunc}
                submitting={props.isSubmitting}
                submittingText="Saving..."
                disabled={props.hasSubmitted && !props.formComplete} 
            />}
        >
            <InfoGrid>
                <GridItem title={`${!props.isAttachment ? 'Document' : 'Attachment'} Name`}>
                    <TextInput
                        name="documentName"
                        value={props.documentName}
                        label={`${!props.isAttachment ? 'Document' : 'Attachment'} name`}
                        updateFunc={(event) => props.setDocumentName(event.target.value)}
                        required
                        hasSubmitted
                        autoFocus
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default RenameDocumentOverlay