import { Dispatch, SetStateAction, useState } from "react"
import MarkdownEditor from "../../../components/form/MarkdownEditor/MarkdownEditor";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { MethodStatementTemplateResponseData } from "../../../types/methodStatementTemplate.types";
import putAPI from "../../../utils/putAPI";
import TextareaAutosize from 'react-textarea-autosize';
import PermsProtectedComponent from "../../../components/PermsProtectedComponent";

const MethodStatementTemplateAssociatedData = (props: {
    methodStatementTemplateID: number,
    setMethodStatementTemplateData: Dispatch<SetStateAction<MethodStatementTemplateResponseData | undefined>>,
    templateContent: string,
}) => {
    const [showSource, setShowSource] = useState(false);
    const [showEditTemplate, setShowEditTemplate] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const hasTemplate = props.templateContent.length > 0;

    const [template, setTemplate] = useState(props.templateContent);

    const updateMethodStatementTemplateTemplate = () => {
        putAPI(`risk_assessment_templates/${props.methodStatementTemplateID}/update`, {}, {
            content: template,
        }, (response: any) => {
            const methodStatementTemplateData: MethodStatementTemplateResponseData = response.data;
            props.setMethodStatementTemplateData(methodStatementTemplateData)
            setShowEditTemplate(false);
        }, setIsSubmitting)
    }

    return (
        <>
            <PermsProtectedComponent requiredPerms={{ templates: props.templateContent.length > 1 ? 1 : 2 }}>
                <SideBarModule title="Template">
                    {props.templateContent.length > 0 ? 
                        <>
                            <PermsProtectedComponent requiredPerms={{ templates: 2 }}>
                                <SideBarButton 
                                    text='Edit Template' 
                                    iconFont='code' 
                                    color='orange' 
                                    clickEvent={() => setShowEditTemplate(true)}
                                />
                            </PermsProtectedComponent>
                            <SideBarButton 
                                text='View Source' 
                                iconFont='find_in_page' 
                                clickEvent={() => setShowSource(true)}
                            />                        
                        </> :
                        <SideBarButton 
                            text='Add Template'
                            iconFont="code"
                            color="light-green"
                            clickEvent={() => setShowEditTemplate(true)}
                        />
                    }
                </SideBarModule>
            </PermsProtectedComponent>


            <WindowOverlay 
                title={"Risk Assessment Template Source"} 
                maxWidth={800} 
                hideFunc={() => setShowSource(false)} 
                show={showSource} 
            >
                <TextareaAutosize 
                    onFocus={(event) => event.target.blur()}
                    readOnly
                >
                    {props.templateContent}
                </TextareaAutosize>
            </WindowOverlay>

            <WindowOverlay 
                title={`${hasTemplate ? 'Edit' : 'Add'} Risk Assessment Template`} 
                maxWidth={800} 
                hideFunc={() => setShowEditTemplate(false)} 
                show={showEditTemplate} 
                footer={<SubmitButton
                    text={hasTemplate ? 'Save Changes' : 'Add Template'}
                    iconFont={hasTemplate ? 'save' : 'add'}
                    color="light-green"
                    submitting={isSubmitting}
                    submittingText='Reactivating...'
                    clickFunc={updateMethodStatementTemplateTemplate}
                />
            }
            >
                <InfoGrid>
                    <GridItem title='Template'>
                        <MarkdownEditor
                            content={template} 
                            setter={setTemplate}/>
                    </GridItem>
                </InfoGrid>
            </WindowOverlay>
        </>
    )
}

export default MethodStatementTemplateAssociatedData