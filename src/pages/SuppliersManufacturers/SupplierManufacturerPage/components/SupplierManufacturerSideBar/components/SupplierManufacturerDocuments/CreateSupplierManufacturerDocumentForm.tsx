import { ChangeEvent, Dispatch, SetStateAction } from "react"
import DateInput from "../../../../../../../components/form/DateInput/DateInput"
import TextInput from "../../../../../../../components/form/TextInput/TextInput"
import ImageUpload from "../../../../../../../components/form/Upload/ImageUpload"
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CreateSupplierManufacturerDocumentAttributes } from "../../../../../../../types/supplierManufacturerDocuments.types"
import SupplierManufacturerDocumentTypeSelect from "./SupplierManufacturerDocumentTypeSelect"

const CreateSupplierManufacturerDocumentForm = (props: {
    documentAttributes: CreateSupplierManufacturerDocumentAttributes,
    setUploadData: Dispatch<SetStateAction<FileList | undefined>>,
    documentType: number,
    setDocumentType: Dispatch<SetStateAction<number>>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateDateParams: (date: Date, name: string) => void,
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
                            autoFocus
                            required
                        />
                    </GridItem>
                    <GridItem title='Type' span={3}>
                        <SupplierManufacturerDocumentTypeSelect
                            selectedType={props.documentType}
                            setSelectedType={props.setDocumentType}
                        />
                    </GridItem>
                    <GridItem title='Valid From' span={3}>
                        <DateInput
                            name="valid_from"
                            value={props.documentAttributes.valid_from}
                            label="Valid from"
                            updateFunc={props.updateDateParams}
                            hasSubmitted={props.showErrors}
                            required
                        />
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default CreateSupplierManufacturerDocumentForm