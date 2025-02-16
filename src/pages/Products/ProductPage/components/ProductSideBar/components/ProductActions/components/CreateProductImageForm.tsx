import { Dispatch, SetStateAction } from "react"
import ImageUpload from "../../../../../../../../components/form/Upload/ImageUpload"
import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"

const CreateProductImageForm = (props: {
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
                </InfoGrid>
            </section>
        </>
    )
}

export default CreateProductImageForm