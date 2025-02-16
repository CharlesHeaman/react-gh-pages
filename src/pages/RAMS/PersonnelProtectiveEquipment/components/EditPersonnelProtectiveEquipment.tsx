import { Dispatch, SetStateAction, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { PersonnelProtectiveEquipmentResponseData } from "../../../../types/personnelProtectiveEquipment.types";
import putAPI from "../../../../utils/putAPI";

const EditPersonnelProtectiveEquipment = (props: {
    name: string,
    description: string,
    personnelProtectiveEquipmentID: number,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    setPersonnelProtectiveEquipmentData: Dispatch<SetStateAction<PersonnelProtectiveEquipmentResponseData | undefined>>,
}) => {
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const updatePersonnelProtectiveEquipment = () => {
        putAPI(`personnel_protective_equipment/${props.personnelProtectiveEquipmentID}/update`, {}, {
            name: name,
            description: description
        }, (response: any) => {
            const ppeData: PersonnelProtectiveEquipmentResponseData = response.data;
            props.setPersonnelProtectiveEquipmentData(ppeData)
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
                    clickFunc={updatePersonnelProtectiveEquipment}
                    submitting={isSubmitting}
                    submittingText='Saving Changes...'
                />
            </ContainerFooter>
        </>
    )
}

export default EditPersonnelProtectiveEquipment