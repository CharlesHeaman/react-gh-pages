import { Dispatch, SetStateAction } from "react"
import TextInput from "../../../../../../../../components/form/TextInput/TextInput"
import ImageUpload from "../../../../../../../../components/form/Upload/ImageUpload"
import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"

const CreateDocumentForm = (props: {
    name: string,
    setName: Dispatch<SetStateAction<string>>,
    setUploadData: Dispatch<SetStateAction<FileList | undefined>>,
    showErrors: boolean
}) => {
    return (
        <>
            <section>
                <InfoGrid>
                    <GridItem title='File'>
                        <ImageUpload
                            setter={props.setUploadData}
                        />
                    </GridItem>
                    <GridItem title='Document Name'>
                        <TextInput
                            name="name"
                            value={props.name}
                            label="Document name"
                            updateFunc={(event) => props.setName(event.target.value)}
                            hasSubmitted={props.showErrors}
                            autoFocus
                            required
                        />
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default CreateDocumentForm