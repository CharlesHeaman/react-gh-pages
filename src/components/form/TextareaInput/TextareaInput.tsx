import { ChangeEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

const TextareaInput = (props: {
    name: string,
    value: string,
    label?: string,
    minRows?: number,
    updateFunc: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    hasSubmitted?: boolean,
    required?: boolean,
    autoFocus?: boolean
}) => {
    
    const textEntered = props.value.length > 0;
    const showRequired = !textEntered && props.hasSubmitted !== undefined && props.hasSubmitted;

    return (
        <>
            <TextareaAutosize 
                minRows={props.minRows ? props.minRows : 2} 
                name={props.name}
                value={props.value}
                onChange={props.updateFunc}
                autoFocus={props.autoFocus}
            />

            {props.required && <FormErrorMessage 
                text={`${props.label} is required`}
                show={showRequired}
            />}
        </>
    )
}

export default TextareaInput