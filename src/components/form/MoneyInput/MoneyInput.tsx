import { ChangeEvent } from "react"
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage"
import InputLabelWrap from "../InputLabelWrap/InputLabelWrap"

const MoneyInput = (props: {
    name: string,
    value: string,
    label?: string,
    updateFunc: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    hasSubmitted: boolean,
    required?: boolean,
    autoFocus?: boolean,
    maxWidth?: number,
    isBig?: boolean,
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
                prefix='£'
                maxWidth={props.maxWidth ? props.maxWidth : 150}
                isBig={props.isBig}
            >
                <input 
                    type='text'
                    name={props.name}
                    value={props.value}
                    onChange={sanitizeEvent}
                    style={{
                        textAlign: 'left'
                    }}
                    autoFocus={props.autoFocus}
                />
            </InputLabelWrap>
            {props.required && <FormErrorMessage 
                text={`${props.label} is required`}
                show={showRequired}
            />}
        </>
    )
}

export default MoneyInput