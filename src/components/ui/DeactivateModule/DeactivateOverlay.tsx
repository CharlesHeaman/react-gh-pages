import { ReactNode } from "react"
import SubmitButton from "../../form/SubmitButton/SubmitButton"
import WindowOverlay from "../Containers/WindowOverlay/WindowOverlay"

const DeactivateOverlay = (props: {
    resourceName: string,
    reactivate?: boolean,
    show: boolean,
    additionalText?: ReactNode
    hideFunc: () => void,
    isSubmitting: boolean,
    submitFunc: () => void,
    actionName?: string,
    presentParticiple?: string,
}) => {

    const actionName = !props.actionName ?
        props.reactivate ? "Reactivate" : "Deactivate"
        :
        props.actionName;

    const actionParticipleName = !props.presentParticiple ?
        props.reactivate ? "Reactivating" : "Deactivating"
        :
        props.presentParticiple

    return (
        <WindowOverlay 
            title={`${actionName} ${props.resourceName}`} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc} 
            footer={<SubmitButton 
                text={`${actionName} ${props.resourceName}`} 
                color={props.reactivate ? "light-green" : "red"}
                iconFont={props.reactivate ? "check_circle" : "highlight_off"}
                submitting={props.isSubmitting}
                submittingText={`${actionParticipleName}...`}
                clickFunc={props.submitFunc}            
            />}
        >
            <p>{`Are you sure you want to ${actionName.toLocaleLowerCase()} this ${props.resourceName.toLocaleLowerCase()}?`}</p>
            {props.additionalText ? 
                props.additionalText
                : null
            }
        </WindowOverlay>
    )
}

export default DeactivateOverlay