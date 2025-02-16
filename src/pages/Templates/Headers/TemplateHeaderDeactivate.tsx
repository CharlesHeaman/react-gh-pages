import { Dispatch, SetStateAction, useState } from "react";
import DeactivateModule from "../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../components/ui/DeactivateModule/DeactivateOverlay";
import { TemplateHeaderResponseData } from "../../../types/templateHeader.types";
import putAPI from "../../../utils/putAPI";

const TemplateHeaderDeactivate = (props: {
    templateHeaderID: number,
    reactivate: boolean,
    setTemplateHeaderData: Dispatch<SetStateAction<TemplateHeaderResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateTemplateHeader = () => {
        putAPI(`template_headers/${props.templateHeaderID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const templateHeaderData: TemplateHeaderResponseData = response.data;
            props.setTemplateHeaderData(templateHeaderData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Template Header'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Template Header"
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateTemplateHeader}/>
        </>

    )
}

export default TemplateHeaderDeactivate