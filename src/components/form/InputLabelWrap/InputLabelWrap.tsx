import styles from './InputLabelWrap.module.css'
import { ReactNode } from 'react'

const InputLabelWrap = (props: {
    prefix?: ReactNode,
    suffix?: ReactNode,
    children: ReactNode,
    maxWidth?: number,
    color?: string,
    disabled?: boolean,
}) => {
    return (
        <label 
            style={{ 
                maxWidth: `${props.maxWidth}px`,
            }} 
            className={`
                ${styles['input-label-wrap']}
                ${props.color ? props.color : styles['no-color']} 
                ${props.disabled ? styles['disabled'] : ''} 
            `}
        >
            {props.prefix && <div className={styles['prefix']}>
                <span>{props.prefix}</span>
            </div>}
            {props.children}
            {props.suffix && <div className={styles['suffix']}>
                <span>{props.suffix}</span>
            </div>}
        </label>
    )
}

export default InputLabelWrap