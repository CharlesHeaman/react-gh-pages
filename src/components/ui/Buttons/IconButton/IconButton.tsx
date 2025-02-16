import styles from './IconButton.module.css'

const IconButton = (props: {
    iconFont: string,
    text: string,
    clickFunc: () => void
}) => {
    return (
        <button
            className={`
                ${styles['icon-button']}
            `}
            onClick={props.clickFunc}
        >
            <span className="material-icons">{props.iconFont}</span>
        </button>
    )
}

export default IconButton