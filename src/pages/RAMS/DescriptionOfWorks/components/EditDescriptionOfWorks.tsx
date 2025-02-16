import { useState } from "react"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import TextareaAutosize from "react-textarea-autosize"
import putAPI from "../../../../utils/putAPI"
import { DescriptionOfWorksResponseData } from "../../../../types/descriptionOfWorks.types"

const EditDescriptionOfWorks = (props: {
    descriptionOfWorksID: number,
    name: string,
    description: string,
    resFunc: (descriptionOfWorksData: DescriptionOfWorksResponseData) => void
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);

    const isDisabled = !(name.length > 0)

    const updateDescriptionOfWorks = () => {
        putAPI(`description_of_works/${props.descriptionOfWorksID}/update`, {}, {
            name: name,
            description: description
        }, props.resFunc, setIsSubmitting)
    }

    return (
        <>
            <InfoGrid>
                <GridItem title='Name'>
                    <input
                        type='text'
                        value={name}
                        placeholder='Name...'
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Description'>
                    <TextareaAutosize
                        minRows={2}
                        value={description}
                        placeholder='Description...'
                        onChange={(e) => setDescription(e.target.value)}

                    />
                </GridItem>
            </InfoGrid>
            <ContainerFooter>
                <SubmitButton
                    text='Create Description of Works' 
                    submitting={isSubmitting}
                    submittingText='Creating...'
                    disabled={isDisabled}
                    clickFunc={updateDescriptionOfWorks}                            
                />
            </ContainerFooter>
        </>
    )
}

export default EditDescriptionOfWorks