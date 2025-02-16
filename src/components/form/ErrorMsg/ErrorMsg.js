import styles from './ErrorMsg.module.css'

function ErrorMsg(props) {
    return (
        <p className={styles['error-msg']}>{props.errors.find(obj => obj.param === props.name) ? props.errors.find(obj => obj.param === props.name).msg : null}</p>
    )
}

export default ErrorMsg