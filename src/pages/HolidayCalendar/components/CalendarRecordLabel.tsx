import hexRgb from "hex-rgb"
import { Dispatch, SetStateAction } from "react"
import { CalendarActivityResponseData } from "../../../types/calendarActivity.types"
import { UserResponseData } from "../../../types/user.types"
import getUserFullName from "../../../utils/getUserFullName"
import styles from "./CalendarRecordLabel.module.css"
import getCalendarRecordIcon from "./getCalendarRecordIcon"

const CalendarRecordLabel = (props: {
    calendarRecordID: number,
    user: UserResponseData | undefined,
    activity: CalendarActivityResponseData | undefined
    currentHover: number,
    setCurrentHover: Dispatch<SetStateAction<number>>,
    setCurrentSelected: Dispatch<SetStateAction<number>>
}) => {
    
    const labelColor = hexRgb(props.activity?.data.label_color ? `#${props.activity.data.label_color}` : '#ffffff');

    return (
        props.user && props.activity ?
            <span
                style={{ 
                    "--label-color": `${props.activity?.data.label_color ? 
                        `${labelColor.red}, ${labelColor.green}, ${labelColor.blue}` : 
                        'var(--text-hl-color)'
                    }`,
                }}
                className={`${styles['on-call-engineer']} ${props.currentHover === props.calendarRecordID ? styles['hover'] : ''}`}
                onMouseOver={() => props.setCurrentHover(props.calendarRecordID)}
                onMouseOut={() => props.setCurrentHover(-1)}
                onClick={() => props.setCurrentSelected(props.calendarRecordID)}
            >
                <div className={styles['text-wrapper']}>
                    <span className="material-icons">{getCalendarRecordIcon(props.activity.id)}</span>
                    {getUserFullName(props.user)}
                </div>
            </span> :
            null
    )
}

export default CalendarRecordLabel