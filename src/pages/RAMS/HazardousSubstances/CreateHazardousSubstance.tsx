import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import Header from "../../../components/ui/Structure/Header/Header";
import { HazardousSubstanceResponseData } from "../../../types/hazardousSubstance.types";
import postAPI from "../../../utils/postAPI";
import TextareaAutosize from 'react-textarea-autosize';


const CreateHazardousSubstance = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const createHazardousSubstance = () => {
        postAPI('hazardous_substances/create', {}, {
            name: name,
            description: description
        }, (response: any) => {
            const hazardousSubstance: HazardousSubstanceResponseData = response.data;
            navigate(`../${hazardousSubstance.id}`)
        }, setIsSubmitting)
    }

    const headerText = 'Create a hazardous substance.'

    const isDisabled = !(name.length > 0)

    return (
        <>
            <Header
                links={[
                    {
                        to: 'rams',
                        text: 'RAMS'
                    },
                    {
                        to: 'hazardous_substances',
                        text: 'Hazardous Substances'
                    },
                    {
                        to: 'create',
                        text: 'Create'
                    }
                ]}
            />
            <OuterContainer
                title='Create Hazardous Substance'
                headerContent={headerText}
                stickyHeaderContent={<p style={{ fontSize: '0.85em' }}>{headerText}</p>}
                maxWidth={600}
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <InfoGrid>
                            <GridItem title='Name'>
                                <input
                                    type='text'
                                    placeholder='Name...'
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                />
                            </GridItem>
                            <GridItem title='Description'>
                                <TextareaAutosize
                                    minRows={2}
                                    placeholder='Description...'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </GridItem>
                        </InfoGrid>
                        <ContainerFooter>
                            <SubmitButton
                                text='Create Hazardous Substance' 
                                submitting={isSubmitting}
                                submittingText='Creating...'
                                disabled={isDisabled}
                                clickFunc={createHazardousSubstance}                            
                            />
                        </ContainerFooter>
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default CreateHazardousSubstance