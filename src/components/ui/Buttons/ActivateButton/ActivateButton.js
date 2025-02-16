import styles from './ActivateButton.module.css'

function ActivateButton(props) {
    function handleClick() {
        props.clickFunc();
    }

    return (
        <span 
            className={styles['active-button']}
            onClick={handleClick}
        >
            {props.text}
        </span>
    )
}

export default ActivateButton