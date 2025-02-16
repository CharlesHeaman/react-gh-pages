import { ChangeEvent, useState } from "react"
import InputLabelWrap from "../InputLabelWrap/InputLabelWrap"
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage"
import isEmailValid from "../../../utils/isEmailValid"

const EmailInput = (props: {
    name: string,
    value: string,
    label?: string,
    updateFunc: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    hasSubmitted: boolean,
    required?: boolean,
    autoFocus?: boolean,
}) => {

    const [emailChecked, setEmailChecked] = useState(false);
    const emailValid = isEmailValid(props.value);
    const emailEntered = props.value.length > 0;

    const checkEmail = () => {
        if (props.value.length === 0) return;
        setEmailChecked(true);
    }

    const getColor = (): string | undefined => {
        if (!emailChecked) return undefined;
        return emailValid ? 'light-green' : 'red';
    }

    const sanitizeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        const regex = /\s/g;
        event.target.value = event.target.value.replace(regex, '')
        props.updateFunc(event)
    }

    const showInvalid = emailChecked && !emailValid;
    const showRequired = !showInvalid && !emailEntered && props.hasSubmitted;
    
    return (
        <>
            <InputLabelWrap 
                prefix={<span className="material-icons">email</span>}
                color={getColor()}
                maxWidth={300}
            >
                <input 
                    type='email'
                    name={props.name}
                    value={props.value}
                    onChange={sanitizeEvent}
                    onBlur={checkEmail}
                    autoFocus={props.autoFocus}
                />
            </InputLabelWrap>
            <FormErrorMessage 
                text="Please enter a valid email address"
                show={showInvalid}
            />
            {props.required && <FormErrorMessage 
                text={`${props.label ? props.label : 'Email'} is required`}
                show={showRequired}
            />}
        </>
    )
}

export default EmailInput