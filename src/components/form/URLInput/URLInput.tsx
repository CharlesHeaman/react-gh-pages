import { ChangeEvent, useState } from "react"
import InputLabelWrap from "../InputLabelWrap/InputLabelWrap"
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage"
import isURLValid from "../../../utils/isURLValid"

const URLInput = (props: {
    name: string,
    value: string,
    label?: string,
    updateFunc: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    hasSubmitted: boolean,
    required?: boolean
}) => {

    const [urlChecked, setURLChecked] = useState(false);
    const urlValid = isURLValid(props.value);
    const urlEntered = props.value.length > 0;

    const checkURL = () => {
        if (props.value.length === 0) return;
        setURLChecked(true);
    }

    const getColor = (): string | undefined => {
        if (!urlChecked) return undefined;
        return urlValid ? 'light-green' : 'red';
    }

    const showInvalid = urlChecked && !urlValid;
    const showRequired = !showInvalid && !urlEntered && props.hasSubmitted;
    
    return (
        <>
            <InputLabelWrap 
                prefix={<span className="material-icons">web</span>}
                color={getColor()}
                maxWidth={300}
            >
                <input 
                    type='tel'
                    name={props.name}
                    value={props.value}
                    onChange={props.updateFunc}
                    onBlur={checkURL}
                />
            </InputLabelWrap>
            <FormErrorMessage 
                text="Please enter a valid URL"
                show={showInvalid}
            />
            {props.required && <FormErrorMessage 
                text={`${props.label ? props.label : 'URL'} is required`}
                show={showRequired}
            />}
        </>
    )
}

export default URLInput