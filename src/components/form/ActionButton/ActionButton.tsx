import styles from './ActionButton.module.css'

const ActionButton = (props: {
    text: string,
    iconFont?: string
    color: string,
    clickFunc: () => void
}) => {
    return (
        <button
            className={`
                ${styles['action-button']} 
                ${props.color}
            `} 
            type='button'
            onClick={props.clickFunc}
        >
            {props.iconFont && <span className="material-icons">{props.iconFont}</span>}
            {props.text}
        </button>
    )
}

export default ActionButton