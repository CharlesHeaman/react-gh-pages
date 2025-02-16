import styles from './DataIconPair.module.css'

function DataIconPair(props) {
    return (
        <div className={styles['data-icon']}>
            {props.icon}
            {props.data}
        </div>
    )
}

export default DataIconPair