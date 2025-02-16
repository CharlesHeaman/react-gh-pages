import styles from "./TicketLabels.module.css"

function LabelContainer(props) {
    return (
        <div className={styles['label-container']}>
            {props.children}
        </div>
    )
}

export default LabelContainer

