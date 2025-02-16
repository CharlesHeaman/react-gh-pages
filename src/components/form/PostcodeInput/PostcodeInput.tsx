import { ChangeEvent, useState } from "react"
import InputLabelWrap from "../InputLabelWrap/InputLabelWrap"
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage"
import isPostcodeValid from "../../../utils/isPostcodeValid"

const PostcodeInput = (props: {
    name: string,
    value: string,
    updateFunc: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    hasSubmitted: boolean,
    required?: boolean
}) => {

    const [postcodeChecked, setPostcodeChecked] = useState(false);
    const postcodeValid = isPostcodeValid(props.value);
    const postcodeEntered = props.value.length > 0;

    const checkPostcode = () => {
        if (props.value.length === 0) return;
        setPostcodeChecked(true);
    }

    const getColor = (): string | undefined => {
        if (!postcodeChecked) return undefined;
        return postcodeValid ? 'light-green' : 'red';
    }

    const sanitizeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        const regex = /[^a-zA-Z0-9 ]/g;
        event.target.value = event.target.value.replace(regex, '')
        props.updateFunc(event)
    }

    const showInvalid = postcodeChecked && !postcodeValid;
    const showRequired = !showInvalid && !postcodeEntered && props.hasSubmitted;
    
    return (
        <>
            <InputLabelWrap 
                prefix={<span className="material-icons">place</span>}
                color={getColor()}
                maxWidth={120}
            >
                <input 
                    type='text'
                    name={props.name}
                    value={props.value}
                    maxLength={9}
                    onChange={sanitizeEvent}
                    onBlur={checkPostcode}
                    style={{
                        textTransform: 'uppercase'
                    }}
                />
            </InputLabelWrap>
            <FormErrorMessage 
                text="Please enter a valid postcode"
                show={showInvalid}
            />
            {props.required && <FormErrorMessage 
                text="Postcode is required"
                show={showRequired}
            />}
        </>
    )
}

export default PostcodeInput