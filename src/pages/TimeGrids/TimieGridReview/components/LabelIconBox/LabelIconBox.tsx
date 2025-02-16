import { ReactNode } from "react"
import styles from "./LabelIconBox.module.css"

const LabelIconBox = (props: {
    label: string | ReactNode,
    text: string | ReactNode,
    icon?: string,
    prefix?: string,
    suffix?: string,
    secondaryText?: string,
    secondaryColor?: string
}) => {

    return (
        <div className={styles['comparison-box']}>
            <span className={`material-icons ${styles['icon']}`}>{props.icon}</span>
            <div className={styles['body']}>
                <span className={styles['label']}>{props.label}</span>
                <div>
                    <span>{props.prefix}</span>
                    <span className={styles['value']}>{props.text}</span>
                    <span>{props.suffix}</span>
                    {props.secondaryText ? <span className={`${styles['secondary-value']} ${props.secondaryColor}`}>
                        &nbsp;(
                            <span>{props.prefix}</span>
                            <span>{props.secondaryText}</span>
                            <span>{props.suffix}</span>
                        )
                    </span> : null}
                </div>
            </div>
        </div>
    )
}

export default LabelIconBox