import styles from './CheckboxInput.module.css'
import { ChangeEvent } from "react"

const CheckboxInput = (props: {
    name: string,
    checked: boolean,
    updateFunc: (event: ChangeEvent<HTMLInputElement>) => void,
    autoFocus?: boolean,
    disabled?: boolean,
}) => {
    return (
        <label
            className={`
                ${styles['checkbox-input']} 
                ${props.checked ? styles['checked'] : ''} 
                ${props.disabled ? styles['disabled'] : ''} 
                no-select
            `}
        >
            {props.checked ? <>
                <span className="material-icons">done</span>
                Yes
            </> : <>
                <span className="material-icons">close</span>                         
                No
            </>}
            <input 
                type="checkbox" 
                name={props.name}
                onChange={props.updateFunc}
                checked={props.checked}
                autoFocus={props.autoFocus}
                style={{
                    opacity: '0',
                    position: 'absolute'
                }}
                disabled={props.disabled}
            />   
        </label>
    )
}

export default CheckboxInput