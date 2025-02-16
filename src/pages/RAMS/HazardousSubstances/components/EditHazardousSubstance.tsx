import { Dispatch, SetStateAction, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { HazardousSubstanceResponseData } from "../../../../types/hazardousSubstance.types";
import putAPI from "../../../../utils/putAPI";

const EditHazardousSubstances = (props: {
    name: string,
    description: string,
    hazardousSubstanceID: number,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    setHazardousSubstanceData: Dispatch<SetStateAction<HazardousSubstanceResponseData | undefined>>,
}) => {
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const updateHazardousSubstance = () => {
        putAPI(`hazardous_substances/${props.hazardousSubstanceID}/update`, {}, {
            name: name,
            description: description
        }, (response: any) => {
            const hazardousSubstanceData: HazardousSubstanceResponseData = response.data;
            props.setHazardousSubstanceData(hazardousSubstanceData)
            props.setIsEditMode(false);
        }, setIsSubmitting)
    }

    return (
        <>
            <InfoGrid>
                <GridItem title='Name'>
                    <input
                        type='text'
                        placeholder='Name...'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Description'>
                    <TextareaAutosize
                        minRows={2}
                        placeholder='Description...'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </GridItem>
            </InfoGrid>
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes"
                    clickFunc={updateHazardousSubstance}
                    submitting={isSubmitting}
                    submittingText='Saving Changes...'
                />
            </ContainerFooter>
        </>
    )
}

export default EditHazardousSubstances