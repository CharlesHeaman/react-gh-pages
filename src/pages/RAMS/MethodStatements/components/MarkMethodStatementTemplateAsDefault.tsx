import { Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { MethodStatementTemplateResponseData } from "../../../../types/methodStatementTemplate.types"
import putAPI from "../../../../utils/putAPI"

const MarkMethodStatementTemplateAsDefault = (props: {
    methodStatementTemplateID: number,
    setMethodStatementTemplateData: Dispatch<SetStateAction<MethodStatementTemplateResponseData | undefined>>
    show: boolean,
    hideFunc: () => void
}) => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const markAsDefault = () => {
        putAPI(`method_statement_templates/${props.methodStatementTemplateID}/mark_as_default`, {}, {
            is_default: true
        }, (response: any) => {
            props.setMethodStatementTemplateData(response.data);
            props.hideFunc();
        }, setIsSubmitting)
    }

    return (
        <WindowOverlay 
            title={"Mark as Default"} 
            maxWidth={300} 
            hideFunc={props.hideFunc} 
            show={props.show} 
            footer={<SubmitButton
                text="Mark as Default"
                color="dark-blue"
                iconFont="star"
                submitting={isSubmitting}
                submittingText='Updating...'
                clickFunc={markAsDefault}
            />}
        >
            <p>This will mark this method statement template as the new default template.</p>
        </WindowOverlay>

    )
}

export default MarkMethodStatementTemplateAsDefault