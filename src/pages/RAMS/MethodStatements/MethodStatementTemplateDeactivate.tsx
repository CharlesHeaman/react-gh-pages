import { Dispatch, SetStateAction, useState } from "react";
import DeactivateModule from "../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../components/ui/DeactivateModule/DeactivateOverlay";
import { MethodStatementTemplateResponseData } from "../../../types/methodStatementTemplate.types";
import putAPI from "../../../utils/putAPI";

const MethodStatementTemplateDeactivate = (props: {
    methodStatementTemplateID: number,
    reactivate: boolean,
    setMethodStatementTemplateData: Dispatch<SetStateAction<MethodStatementTemplateResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateMethodStatementTemplate = () => {
        putAPI(`method_statement_templates/${props.methodStatementTemplateID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const templateHeaderData: MethodStatementTemplateResponseData = response.data;
            props.setMethodStatementTemplateData(templateHeaderData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Template'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Template"
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateMethodStatementTemplate}/>
        </>

    )
}

export default MethodStatementTemplateDeactivate