import { ChangeEvent, useState } from "react"
import InputLabelWrap from "../InputLabelWrap/InputLabelWrap"
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage"

const CodeInput = (props: {
    name: string,
    value: string,
    updateFunc: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    isUnique: boolean,
    checkUnique: (code: string) => void,
    hasSubmitted: boolean,
    required?: boolean,
    maxWidth?: number,
    label?: string,
    upperCase?: boolean,
    autoFocus?: boolean
}) => {

    const [codeChecked, setCodeChecked] = useState(false);
    const codeEntered = props.value.length > 0;

    const checkCode = (event: ChangeEvent<HTMLInputElement>) => {
        if (props.value.length === 0) return;
        setCodeChecked(true);
        props.checkUnique(event.target.value);
    }

    const getColor = (): string | undefined => {
        if (!codeChecked) return undefined;
        return props.isUnique ? 'light-green' : 'red';
    }

    const sanitizeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        const regex = /[^a-zA-Z0-9-_/]/g;
        event.target.value = event.target.value.replace(regex, '');
        props.updateFunc(event);
        props.checkUnique(event.target.value);
    }

    const showTaken = codeChecked && !props.isUnique;
    const showRequired = !showTaken && !codeEntered && props.hasSubmitted;
    
    return (
        <>
            <InputLabelWrap 
                prefix={<span className="material-icons">tag</span>}
                color={getColor()}
                maxWidth={props.maxWidth ? props.maxWidth : 300}
            >
                <input 
                    type='text'
                    name={props.name}
                    value={props.value}
                    onChange={sanitizeEvent}
                    onBlur={checkCode}
                    style={{ 
                        textTransform: props.upperCase === false ? undefined : 'uppercase'
                    }}
                    autoFocus={props.autoFocus}
                />
            </InputLabelWrap>
            <FormErrorMessage 
                text={`${props.label ? props.label : 'Code'} is already taken`}
                show={showTaken}
            />
            {props.required && <FormErrorMessage 
                text="Code is required"
                show={showRequired}
            />}
        </>
    )
}

export default CodeInput