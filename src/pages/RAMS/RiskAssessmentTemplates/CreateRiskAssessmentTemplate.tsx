import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import TextInput from "../../../components/form/TextInput/TextInput";
import TextareaInput from "../../../components/form/TextareaInput/TextareaInput";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { RiskAssessmentTemplateResponseData } from "../../../types/riskAssessmentTemplate.types";
import postAPI from "../../../utils/postAPI";

const CreateRiskAssessmentTemplate = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const navigate = useNavigate();

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const createCostCentre = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        postAPI('risk_assessment_templates/create', {}, {
            name: name,
            description: description,
        }, (response: any) => {
            const riskAssessmentTemplateData: RiskAssessmentTemplateResponseData = response.data;
            navigate(`${riskAssessmentTemplateData.id}`, { relative: 'path' })
        }, setIsCreating)
    }

    const formComplete = name.length > 0;

    return (
        <WindowOverlay 
            title={"Create Risk Assessment Template"} 
            maxWidth={300} 
            show={props.show} 
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Create Risk Assessment Template"
                iconFont="add"
                color="dark-blue"
                clickFunc={createCostCentre}
                submitting={isCreating}
                submittingText="Creating..."
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <InfoGrid>
                <GridItem title='Name'>
                    <TextInput 
                        name={"name"} 
                        value={name} 
                        updateFunc={(event) => setName(event.target.value)}
                        label="Name"
                        hasSubmitted={hasSubmitted}
                        autoFocus
                        required
                    />
                </GridItem>
                <GridItem title='Description'>
                    <TextareaInput 
                        name={"description"}
                        value={description} 
                        updateFunc={(event) => setDescription(event.target.value)}/>
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default CreateRiskAssessmentTemplate