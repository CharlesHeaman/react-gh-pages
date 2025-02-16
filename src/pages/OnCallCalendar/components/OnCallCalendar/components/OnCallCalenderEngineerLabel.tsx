import { OnCallEngineerResponseData } from "../../../../../types/OnCallEngineer.types"
import { DepartmentResponseData } from "../../../../../types/department.types"
import { UserResponseData } from "../../../../../types/user.types"
import getUserFullName from "../../../../../utils/getUserFullName"
import styles from "./OnCallCalendarEngineerLabel.module.css"
import getOnCallEngineerLink from "../../../../../utils/getOnCallEngineerLink"
import isSameDay from "../../../../../utils/isSameData"
import getMonday from "../../../../../utils/getMonday"
import getDayRelativeDate from "../../../../../utils/getDayRelativeDate"
import { Dispatch, SetStateAction } from "react"
import hexRgb from "hex-rgb"

const OnCallCalenderEngineerLabel = (props: {
    date: Date,
    onCallEngineer: OnCallEngineerResponseData,
    user: UserResponseData | undefined,
    pageDepartment: DepartmentResponseData | undefined,
    department: DepartmentResponseData | undefined,
    offSet: number,
    currentHover: number,
    setCurrentHover: Dispatch<SetStateAction<number>>
}) => {

    const isCurrentDate = isSameDay(new Date(props.date), new Date(props.onCallEngineer.data.start_date));
    const isMonday = new Date(props.date).getDay() === 1
    const isBeforeMonday = getMonday(new Date(props.date)).getTime() > new Date(props.onCallEngineer.data.start_date).getTime()

    const isVisible = (isCurrentDate || isMonday);

    const endTime = Math.min(
        new Date(props.onCallEngineer.data.end_date).getTime(), 
        getDayRelativeDate(getMonday(new Date(props.date)), 7).getTime()
    )

    const startTime = Math.max(
        new Date(props.onCallEngineer.data.start_date).getTime(), 
        getMonday(new Date(props.date)).getTime()
    )
   
    const numberOfDays = (endTime - startTime) / (1000 * 60 * 60 * 24);

    const width = `calc(${numberOfDays * 100}%)`;

    const topOffset = (props.offSet * 40) + 4
    const leftOffset = (!isMonday || !isBeforeMonday) ?
        `${new Date(props.onCallEngineer.data.start_date).getHours() * (100 / 24)}%` :
        `0px`

    const labelColor = hexRgb(props.department?.data.label_color ? `#${props.department.data.label_color}` : '#ffffff');

    return (
        props.user && isVisible ?
            <a 
                style={{ 
                    "--label-color": `${props.department?.data.label_color ? 
                        `${labelColor.red}, ${labelColor.green}, ${labelColor.blue}` : 
                        'var(--text-hl-color)'
                    }`,
                    width: width,
                    top: `${topOffset}px`,
                    left: leftOffset
                }}
                className={`${styles['on-call-engineer']} ${props.currentHover === props.onCallEngineer.id ? styles['hover'] : ''}`}
                href={`/#${getOnCallEngineerLink(props.pageDepartment?.data.name, props.onCallEngineer.id)}`}
                onMouseOver={() => props.setCurrentHover(props.onCallEngineer.id)}
                onMouseOut={() => props.setCurrentHover(-1)}
            >
                <div className={styles['text-wrapper']}>
                    <span className="material-icons">perm_phone_msg</span>
                    {getUserFullName(props.user)}
                </div>
            </a> :
            null
    )
}

export default OnCallCalenderEngineerLabel