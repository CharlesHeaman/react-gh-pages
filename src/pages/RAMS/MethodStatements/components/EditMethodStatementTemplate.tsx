import { Dispatch, SetStateAction, useState } from "react";
import MarkdownEditor from "../../../../components/form/MarkdownEditor/MarkdownEditor"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { MethodStatementTemplateResponseData } from "../../../../types/methodStatementTemplate.types";
import putAPI from "../../../../utils/putAPI";

const EditMethodStatementTemplate = (props: {
    content: string,
    methodStatementTemplateID: number,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    setMethodStatementTemplateData: Dispatch<SetStateAction<MethodStatementTemplateResponseData | undefined>>,
}) => {
    const [markdown, setMarkdown] = useState(props.content);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const updateMethodStatementTemplate = () => {
        putAPI(`method_statement_templates/${props.methodStatementTemplateID}/update`, {}, {
            content: markdown,
        }, (response: any) => {
            const methodStatementTemplateData: MethodStatementTemplateResponseData = response.data;
            props.setMethodStatementTemplateData(methodStatementTemplateData)
            props.setIsEditMode(false);
        }, setIsSubmitting)
    }
    return (
        <>
            <MarkdownEditor 
                content={markdown} 
                setter={setMarkdown}
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes"
                    clickFunc={updateMethodStatementTemplate}
                    submitting={isSubmitting}
                    submittingText='Saving Changes...'
                />
            </ContainerFooter>
        </>
    )
}

export default EditMethodStatementTemplate