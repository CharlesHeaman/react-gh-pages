import { ChangeEvent, useState } from "react"
import InputLabelWrap from "../InputLabelWrap/InputLabelWrap"
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage"
import isRegistrationValid from "../../../utils/isRegistrationValid"

const VehicleRegistrationInput = (props: {
    name: string,
    value: string,
    label?: string,
    updateFunc: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    hasSubmitted: boolean,
    required?: boolean,
    autoFocus?: boolean,
}) => {

    const [registrationChecked, setRegistrationChecked] = useState(false);
    const registrationValid = isRegistrationValid(props.value);
    const registrationEntered = props.value.length > 0;

    const checkRegistration = () => {
        if (props.value.length === 0) return;
        setRegistrationChecked(true);
    }

    const getColor = (): string | undefined => {
        if (!registrationChecked) return undefined;
        return registrationValid ? 'light-green' : 'red';
    }

    const sanitizeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        const regex = /[^a-zA-Z0-9 ]/g;
        event.target.value = event.target.value.replace(regex, '')
        props.updateFunc(event)
    }

    const showInvalid = registrationChecked && !registrationValid;
    const showRequired = !showInvalid && !registrationEntered && props.hasSubmitted;
    
    return (
        <>
            <InputLabelWrap 
                prefix={<span className="material-icons">directions_car</span>}
                color={getColor()}
                maxWidth={115}
            >
                <input 
                    type='text'
                    name={props.name}
                    value={props.value}
                    maxLength={8}
                    onChange={sanitizeEvent}
                    onBlur={checkRegistration}
                    style={{
                        textTransform: 'uppercase'
                    }}
                    autoFocus={props.autoFocus}
                />
            </InputLabelWrap>
            <FormErrorMessage 
                text="Please enter a valid registration"
                show={showInvalid}
            />
            {props.required && <FormErrorMessage 
                text={`${props.label ? props.label : 'Registration'} is required`}
                show={showRequired}
            />}
        </>
    )
}

export default VehicleRegistrationInput