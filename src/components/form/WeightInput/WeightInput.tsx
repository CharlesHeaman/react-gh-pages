import { ChangeEvent, ReactNode } from "react"
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage"
import InputLabelWrap from "../InputLabelWrap/InputLabelWrap"

const WeightInput = (props: {
    name: string,
    value: string,
    label: string,
    updateFunc: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    hasSubmitted: boolean,
    min?: number,
    tooLightText?: string,
    maxWidth?: number,
    max?: number,
    tooHeavyText?: string,
    required?: boolean,
    autoFocus?: boolean,
    secondaryButton?: ReactNode
}) => {

    const numberEntered = props.value.length > 0;

    const sanitizeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        const regex = /^\+1|[^0-9.]+/g;
        event.target.value = event.target.value.replace(regex, '')
        props.updateFunc(event)
    }

    const showToSmall = props.min !== undefined && parseFloat(props.value) < props.min && props.hasSubmitted;
    const showToHeavy = !showToSmall && props.max !== undefined && parseFloat(props.value) > props.max && props.hasSubmitted;
    const showRequired = !showToHeavy && !numberEntered && props.hasSubmitted;
    
    return (
        <>
            <div className="flex" style={{ gap: '12px' }}>
                <InputLabelWrap 
                    suffix='kg'
                    maxWidth={props.maxWidth ? props.maxWidth : 100}
                >
                    <input 
                        type='text'
                        name={props.name}
                        value={props.value}
                        onChange={sanitizeEvent}
                        autoFocus={props.autoFocus}
                        style={{
                            textAlign: 'right'
                        }}
                    />
                </InputLabelWrap>
                {props.secondaryButton ? props.secondaryButton : null}
            </div>
            <FormErrorMessage 
                text={props.tooLightText ? props.tooLightText : ''}
                show={showToSmall}
            />
            <FormErrorMessage 
                text={props.tooHeavyText ? props.tooHeavyText : ''}
                show={showToHeavy}
            />
            {props.required && <FormErrorMessage 
                text={`${props.label} is required`}
                show={showRequired}
            />}
        </>
    )
}

export default WeightInput