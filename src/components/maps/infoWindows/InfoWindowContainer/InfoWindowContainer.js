
import styles from "./InfoWindowContainer.module.css";

const InfoWindowContainer = (props) => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                {props.headerContent}
            </div>
            <div className={styles['body']}>
                {props.bodyContent}
            </div>
        </div>
    )
}

export default InfoWindowContainer