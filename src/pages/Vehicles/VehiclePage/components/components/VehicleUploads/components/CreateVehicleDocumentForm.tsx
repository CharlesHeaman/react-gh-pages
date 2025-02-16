import { ChangeEvent, Dispatch, SetStateAction } from "react"
import TextInput from "../../../../../../../components/form/TextInput/TextInput"
import ImageUpload from "../../../../../../../components/form/Upload/ImageUpload"
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CreateVehicleDocumentAttributes } from "../../../../../../../types/vehicleDocuments.types"
import VehicleDocumentTypeSelect from "./VehicleDocumentTypeSelect"

const CreateVehicleDocumentForm = (props: {
    documentAttributes: CreateVehicleDocumentAttributes,
    setUploadData: Dispatch<SetStateAction<FileList | undefined>>,
    documentType: number,
    setDocumentType: Dispatch<SetStateAction<number>>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
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
                            value={props.documentAttributes.name}
                            label="Document name"
                            updateFunc={props.updateParams}
                            hasSubmitted={props.showErrors}
                            required
                        />
                    </GridItem>
                    <GridItem title='Type'>
                        <VehicleDocumentTypeSelect
                            selectedType={props.documentType}
                            setSelectedType={props.setDocumentType}
                        />
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default CreateVehicleDocumentForm