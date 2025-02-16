import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import TextInput from "../../../components/form/TextInput/TextInput";
import ContainerFooter from "../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import FilterSelect, { FilterSelection } from "../../../components/ui/FilterSelect/FilterSelect";
import { TemplateFooterResponseData } from "../../../types/templateFooter.types";
import putAPI from "../../../utils/putAPI";
import getAlignmentIcon from "../utils/getAlignmentIcon";
import getAlignmentTitle from "../utils/getAlignmentTitle";

const EditTemplateFooterForm = (props: {
    templateFooter: TemplateFooterResponseData,
    setTemplateFooterData: Dispatch<SetStateAction<TemplateFooterResponseData | undefined>>
    disabledEdit: () => void
}) => {  
    // Form States
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [name, setName] = useState(props.templateFooter.data.name);
    const [description, setDescription] = useState(props.templateFooter.data.description ? props.templateFooter.data.description : '');
    const [alignmentOptions, setAlignmentOptions] = useState<Array<FilterSelection>>([
        {
            text: getAlignmentTitle(-1),
            value: -1,
            iconFont: getAlignmentIcon(-1),
            selected: props.templateFooter.data.alignment === -1
        },
        {
            text: getAlignmentTitle(0),
            value: 0,
            iconFont: getAlignmentIcon(0),
            selected: props.templateFooter.data.alignment === 0
        },
        {
            text: getAlignmentTitle(1),
            value: 1,
            iconFont: getAlignmentIcon(1),
            selected: props.templateFooter.data.alignment === 1
        }
    ])
   
    const formComplete = (
        name.length > 0
    )

    const updateTemplateFooter = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`template_footers/${props.templateFooter.id}/update`, {}, {
            name: name,
            description: description,
            alignment: alignmentOptions.find(selection => selection.selected)?.value
        }, (response: any) => {
            const templateFooterData = response.data;
            props.setTemplateFooterData(templateFooterData);
            props.disabledEdit();
        }, setIsUpdating);
    }

    return (
        <section>
            <h2>Template Footer Details</h2>
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
                    clickFunc={updateTemplateFooter}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </section>
    )
}

export default EditTemplateFooterForm