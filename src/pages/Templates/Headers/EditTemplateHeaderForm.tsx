import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import TextInput from "../../../components/form/TextInput/TextInput";
import ContainerFooter from "../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import FilterSelect, { FilterSelection } from "../../../components/ui/FilterSelect/FilterSelect";
import { TemplateHeaderResponseData } from "../../../types/templateHeader.types";
import putAPI from "../../../utils/putAPI";
import getAlignmentIcon from "../utils/getAlignmentIcon";
import getAlignmentTitle from "../utils/getAlignmentTitle";

const EditTemplateHeaderForm = (props: {
    templateHeader: TemplateHeaderResponseData,
    setTemplateHeaderData: Dispatch<SetStateAction<TemplateHeaderResponseData | undefined>>
    disabledEdit: () => void
}) => {  
    // Form States
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [name, setName] = useState(props.templateHeader.data.name);
    const [description, setDescription] = useState(props.templateHeader.data.description ? props.templateHeader.data.description : '');
    const [alignmentOptions, setAlignmentOptions] = useState<Array<FilterSelection>>([
        {
            text: getAlignmentTitle(-1),
            value: -1,
            iconFont: getAlignmentIcon(-1),
            selected: props.templateHeader.data.alignment === -1
        },
        {
            text: getAlignmentTitle(0),
            value: 0,
            iconFont: getAlignmentIcon(0),
            selected: props.templateHeader.data.alignment === 0
        },
        {
            text: getAlignmentTitle(1),
            value: 1,
            iconFont: getAlignmentIcon(1),
            selected: props.templateHeader.data.alignment === 1
        }
    ])
   
    const formComplete = (
        name.length > 0
    )

    const updateTemplateHeader = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`template_headers/${props.templateHeader.id}/update`, {}, {
            name: name,
            description: description,
            alignment: alignmentOptions.find(selection => selection.selected)?.value
        }, (response: any) => {
            const templateHeaderData = response.data;
            props.setTemplateHeaderData(templateHeaderData);
            props.disabledEdit();
        }, setIsUpdating);
    }

    return (
        <section>
            <h2>Template Header Details</h2>
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
                <GridItem title='Alignment'>
                    <FilterSelect
                        selections={alignmentOptions}
                        selectionSetter={setAlignmentOptions}
                    />
                </GridItem>
            </InfoGrid>
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateTemplateHeader}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </section>
    )
}

export default EditTemplateHeaderForm