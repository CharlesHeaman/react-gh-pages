import styles from './Percentage.module.css'

function Percentage(props) {
    return (
        <span className={styles['percentage-wrapper']}>
            <span className={styles['percentage-filled']} style={{width: `${props.percentage}%`}}></span>
        </span>
    )
}

export default Percentage