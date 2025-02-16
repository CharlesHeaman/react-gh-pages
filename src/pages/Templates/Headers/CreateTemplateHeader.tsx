import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import TextInput from "../../../components/form/TextInput/TextInput";
import TextareaInput from "../../../components/form/TextareaInput/TextareaInput";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TemplateHeaderResponseData } from "../../../types/templateHeader.types";
import postAPI from "../../../utils/postAPI";

const CreateTemplateHeader = (props: {
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
        postAPI('template_headers/create', {}, {
            name: name,
            description: description,
        }, (response: any) => {
            const templateHeaderData: TemplateHeaderResponseData = response.data;
            navigate(`${templateHeaderData.id}`, { relative: 'path' })
        }, setIsCreating)
    }

    const formComplete = name.length > 0;

    return (
        <WindowOverlay 
            title={"Create Template Header"} 
            maxWidth={300} 
            show={props.show} 
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Create Template Header"
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

export default CreateTemplateHeader