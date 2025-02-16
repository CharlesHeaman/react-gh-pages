import { ChangeEvent, useState } from "react"
import InputLabelWrap from "../InputLabelWrap/InputLabelWrap"
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage"
import isTelephoneValid from "../../../utils/isTelephoneValid"

const TelephoneInput = (props: {
    name: string,
    value: string,
    label?: string,
    updateFunc: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    hasSubmitted: boolean,
    required?: boolean
}) => {

    const [telephoneChecked, setTelephoneChecked] = useState(false);
    const telephoneValid = isTelephoneValid(props.value);
    const telephoneEntered = props.value.length > 0;

    const checkTelephone = () => {
        if (props.value.length === 0) return;
        setTelephoneChecked(true);
    }

    const getColor = (): string | undefined => {
        if (!telephoneChecked) return undefined;
        return telephoneValid ? 'light-green' : 'red';
    }

    const sanitizeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        const regex = /^\+1|[^0-9]+/g;
        event.target.value = event.target.value.replace(regex, '')
        props.updateFunc(event)
    }

    const showInvalid = telephoneChecked && !telephoneValid;
    const showRequired = !showInvalid && !telephoneEntered && props.hasSubmitted;
    
    return (
        <>
            <InputLabelWrap 
                prefix={<span className="material-icons">call</span>}
                color={getColor()}
                maxWidth={150}
            >
                <input 
                    type='tel'
                    name={props.name}
                    value={props.value}
                    onChange={sanitizeEvent}
                    onBlur={checkTelephone}
                />
            </InputLabelWrap>
            <FormErrorMessage 
                text="Please enter a valid telephone address"
                show={showInvalid}
            />
            {props.required && <FormErrorMessage 
                text={`${props.label ? props.label : 'Telephone'} is required`}
                show={showRequired}
            />}
        </>
    )
}

export default TelephoneInput