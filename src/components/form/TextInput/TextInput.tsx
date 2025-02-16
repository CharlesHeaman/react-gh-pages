import { ChangeEvent } from "react"
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage"

const TextInput = (props: {
    name: string,
    value: string,
    label?: string,
    updateFunc: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    hasSubmitted?: boolean,
    required?: boolean,
    maxWidth?: number,
    autoFocus?: boolean
}) => {

    const textEntered = props.value.length > 0;
    const showRequired = !textEntered && props.hasSubmitted !== undefined && props.hasSubmitted;
    
    return (
        <>
            <input 
                type='text'
                name={props.name}
                value={props.value}
                onChange={props.updateFunc}
                autoFocus={props.autoFocus}
                style={{
                    maxWidth: props.maxWidth ? props.maxWidth : ''
                }}
            />

            {props.required && <FormErrorMessage 
                text={`${props.label} is required`}
                show={showRequired}
            />}
        </>
    )
}

export default TextInput