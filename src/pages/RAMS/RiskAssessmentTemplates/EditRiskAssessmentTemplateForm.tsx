import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import TextInput from "../../../components/form/TextInput/TextInput";
import ContainerFooter from "../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import { RiskAssessmentTemplateResponseData } from "../../../types/riskAssessmentTemplate.types";
import putAPI from "../../../utils/putAPI";

const EditRiskAssessmentTemplateForm = (props: {
    template: RiskAssessmentTemplateResponseData,
    setRiskAssessmentTemplateData: Dispatch<SetStateAction<RiskAssessmentTemplateResponseData | undefined>>
    disabledEdit: () => void
}) => {  
    // Form States
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [name, setName] = useState(props.template.data.name);
    const [description, setDescription] = useState(props.template.data.description ? props.template.data.description : '');

    const formComplete = (
        name.length > 0
    )

    const updateRiskAssessmentTemplate = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`risk_assessment_templates/${props.template.id}/update`, {}, {
            name: name,
            description: description,
        }, (response: any) => {
            const templateData = response.data;
            props.setRiskAssessmentTemplateData(templateData);
            props.disabledEdit();
        }, setIsUpdating);
    }

    return (
        <section>
            <h2>Risk Assessment Template Details</h2>
            <InfoGrid>
                <GridItem title='Name'>
                    <TextInput 
                        name={"name"} 
                        label="Name"                   
                        value={name} 
                        hasSubmitted={hasSubmitted}
                        updateFunc={(event) => setName(event.target.value)} 
                        required
                    />
                </GridItem>
                <GridItem title='Description'>
                    <TextInput 
                        name={"description"} 
                        label="Description"                   
                        value={description} 
                        hasSubmitted={hasSubmitted}
                        updateFunc={(event) => setDescription(event.target.value)} 
                        required
                    />
                </GridItem>
                {/* <GridItem title='Alignment'>
                    <FilterSelect
                        selections={alignmentOptions}
                        selectionSetter={setAlignmentOptions}
                    />
                </GridItem> */}
            </InfoGrid>
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateRiskAssessmentTemplate}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </section>
    )
}

export default EditRiskAssessmentTemplateForm