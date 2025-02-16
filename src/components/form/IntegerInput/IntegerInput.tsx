import { ChangeEvent } from "react"
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage"
import InputLabelWrap from "../InputLabelWrap/InputLabelWrap"

const IntegerInput = (props: {
    name: string,
    value: string,
    label: string,
    updateFunc: (event: ChangeEvent<HTMLInputElement>) => void,
    hasSubmitted: boolean,
    required?: boolean,
    maxWidth?: number,
    prefix?: string,
    prefixIcon?: string,
    suffix?: string,
    min?: number,
    tooSmallText?: string,
    disabled?: boolean,
    autoFocus?: boolean
}) => {

    const numberEntered = props.value.length > 0;

    const sanitizeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        const regex = /^\+1|[^0-9]+/g;
        event.target.value = event.target.value.replace(regex, '')
        props.updateFunc(event)
    }

    const showToSmall = props.min !== undefined && parseFloat(props.value) < props.min && props.hasSubmitted;
    const showRequired = !numberEntered && props.hasSubmitted;
    
    return (
        <>
            <InputLabelWrap 
                prefix={props.prefixIcon ? <span className="material-icons">{props.prefixIcon}</span> : props.prefix}
                suffix={props.suffix}
                maxWidth={props.maxWidth ? props.maxWidth : 150}
                disabled={props.disabled}
            >
                <input 
                    type='text'
                    name={props.name}
                    value={props.value}
                    onChange={sanitizeEvent}
                    style={{
                        textAlign: 'right',
                        paddingTop: '4px',
                        paddingBottom: '4px',
                        paddingLeft: (props.prefix === undefined && props.prefixIcon === undefined) ? '8px' : '0px',
                        paddingRight: (props.suffix === undefined) ? '8px' : '0px',
                    }}
                    autoFocus={props.autoFocus}
                    disabled={props.disabled}
                />
            </InputLabelWrap>
            <FormErrorMessage 
                text={props.tooSmallText ? props.tooSmallText : ''}
                show={showToSmall}
            />
            {props.required && <FormErrorMessage 
                text={`${props.label} is required`}
                show={showRequired}
            />}
        </>
    )
}

export default IntegerInput