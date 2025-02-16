import { ChangeEvent } from "react"
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage"
import InputLabelWrap from "../InputLabelWrap/InputLabelWrap"

const VoltsAmpsInput = (props: {
    name: string,
    value: string,
    label: string,
    updateFunc: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    hasSubmitted: boolean,
    isAmps?: boolean,
    required?: boolean
}) => {

    const numberEntered = props.value.length > 0;

    const sanitizeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        const regex = /^\+1|[^0-9.]+/g;
        event.target.value = event.target.value.replace(regex, '')
        props.updateFunc(event)
    }

    const showRequired = !numberEntered && props.hasSubmitted;
    
    return (
        <>
            <InputLabelWrap 
                suffix={!props.isAmps ? 'V' : 'A'}
                maxWidth={75}
            >
                <input 
                    type='text'
                    name={props.name}
                    value={props.value}
                    onChange={sanitizeEvent}
                    style={{
                        textAlign: 'right'
                    }}
                />
            </InputLabelWrap>
            {props.required && <FormErrorMessage 
                text={`${props.label} is required`}
                show={showRequired}
            />}
        </>
    )
}

export default VoltsAmpsInput