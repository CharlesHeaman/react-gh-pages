import formatLongDate from "../../../utils/formatLongDate"
import styles from "./Change.module.css"
import ChangeLabel from "./components/ChangeLabel/ChangeLabel"
import getChangeColor from "./utils/getChangeColor"
import getChangelogSystemLabel from "./utils/getChangelogSystemLabel"

const Change = (props: {
    date: Date
    type: number,
    title: string,
    text: string,
    system: number
}) => {
    return (
        <div 
            className={styles['change']}
            style={{ border: `1px solid rgba(var(--${getChangeColor(props.type)}-hl), 0.5)`}}
        >
            <h2>{props.title}</h2>
            <div className={styles['header']}>
                <div className={styles['label-wrapper']}>
                    <ChangeLabel type={props.type}/>
                    {getChangelogSystemLabel(props.system)}
                </div>
                <h3>{formatLongDate(props.date)}</h3>
            </div>
            <div className={styles['body']}>
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default Change