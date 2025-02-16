import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize';
import DepartmentSelect from "../../../components/form/DepartmentSelect/DepartmentSelect";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import TextInput from "../../../components/form/TextInput/TextInput";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { DepartmentResponseData } from "../../../types/department.types";
import { DescriptionOfWorksResponseData } from "../../../types/descriptionOfWorks.types";
import postAPI from "../../../utils/postAPI";

const CreateDescriptionOfWorks = (props: {
    show: boolean,
    hideFunc: () => void,
}) => {
    const navigate = useNavigate();

    // Form States
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();

    const createDescriptionOfWorks = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        postAPI('description_of_works/create', {}, {
            department_id: departmentData?.id,
            name: name,
            description: description
        }, (response: any) => {
            const descriptionOfWorksData: DescriptionOfWorksResponseData = response.data;
            navigate(`${descriptionOfWorksData.id}`, { relative: 'path' })
        }, setIsSubmitting)
    }

    const formComplete = (
        name.length > 0
    )

    return (
        <WindowOverlay 
            title={"Create Description of Works"} 
            maxWidth={300} 
            show={props.show} 
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Create Description of Works"
                iconFont="add"
                color="dark-blue"
                clickFunc={createDescriptionOfWorks}
                submitting={isSubmitting}
                submittingText="Creating..."
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <InfoGrid>
                <GridItem title='Name'>
                    <TextInput
                        name='text'
                        value={name}
                        label="Name" 
                        updateFunc={(event) => setName(event.target.value)}
                        hasSubmitted={hasSubmitted}
                        required                    
                        autoFocus 
                    />
                </GridItem>
                <GridItem title='Description' secondaryTitle="(optional)">
                    <TextareaAutosize
                        minRows={2}
                        placeholder='Description...'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </GridItem>
                <GridItem title='Department'>
                    <DepartmentSelect
                        selectedDepartment={departmentData}
                        setSelectedDepartment={setDepartmentData}
                        hasSubmitted={hasSubmitted}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
           
    )
}

export default CreateDescriptionOfWorks