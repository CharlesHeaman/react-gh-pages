import formatDate from "../../../utils/formatDate"
import formatTime from "../../../utils/formatTime"
import Label from "../General/Label/Label"
import styles from './ActivityItem.module.css'

const ActivityItem = (props: {
    iconFont: string,
    text: string,
    date: Date
}) => {
    return (
        <div className={styles['activity-wrapper']}>
            <div className={styles['icon-wrapper']}>
                <Label text='' iconFont={props.iconFont} color=''/>
            </div>
            <div className={styles['text-wrapper']}>
                <span style={{ flexShrink: '1' }}>{props.text} at</span>
                <h4>{formatDate(props.date)} {formatTime(props.date)}</h4>
            </div>
        </div>
    )
}

export default ActivityItem