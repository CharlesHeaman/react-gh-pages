import { Dispatch, SetStateAction, useState } from "react";
import DeactivateModule from "../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../components/ui/DeactivateModule/DeactivateOverlay";
import { TemplateFooterResponseData } from "../../../types/templateFooter.types";
import putAPI from "../../../utils/putAPI";

const TemplateFooterDeactivate = (props: {
    templateFooterID: number,
    reactivate: boolean,
    setTemplateFooterData: Dispatch<SetStateAction<TemplateFooterResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateTemplateFooter = () => {
        putAPI(`template_footers/${props.templateFooterID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const templateFooterData: TemplateFooterResponseData = response.data;
            props.setTemplateFooterData(templateFooterData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Template Footer'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Template Footer"
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateTemplateFooter}/>
        </>

    )
}

export default TemplateFooterDeactivate