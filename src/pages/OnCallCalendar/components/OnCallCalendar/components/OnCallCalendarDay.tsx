import { Dispatch, SetStateAction } from "react"
import { DepartmentResponseData } from "../../../../../types/department.types"
import { UserResponseData } from "../../../../../types/user.types"
import findDepartment from "../../../../../utils/findDepartment"
import findUser from "../../../../../utils/findUser"
import getYYYYMMDD from "../../../../../utils/getYYYYMMDD"
import isSameDay from "../../../../../utils/isSameData"
import { OnCallEngineerPositions } from "../../../utils/positionOnCallEngineers"
import styles from "./OnCallCalendarDay.module.css"
import labelStyles from "./OnCallCalendarEngineerLabel.module.css"
import OnCallCalenderEngineerLabel from "./OnCallCalenderEngineerLabel"
import PermsProtectedComponent from "../../../../../components/PermsProtectedComponent"

const OnCallCalendarDay = (props: {
    date: Date,
    isSameMonth: boolean,
    onCallEngineers: Array<OnCallEngineerPositions>,
    users: Array<UserResponseData>,
    department: DepartmentResponseData | undefined,
    departments: Array<DepartmentResponseData>,
    currentHover: number,
    setCurrentHover: Dispatch<SetStateAction<number>>,
    setCurrentCreateDate: Dispatch<SetStateAction<Date | undefined>>,
    isLoading: boolean,
}) => {
    const isWeekend = props.date.getDay() % 6 === 0;
    
    const maxOffset = Math.max(...props.onCallEngineers.map(onCallEngineer => onCallEngineer.offSet)) + 1
    return (
        <td className={`
            ${styles['calendar-day']}
            ${isWeekend ? styles['weekend'] : ''}
        `}>
            <div className={`
                ${styles['calendar-day-wrapper']} 
                ${props.isSameMonth ? '' : styles['other-month']}
            `}>
                <div className={styles['day-header']}>
                    <PermsProtectedComponent requiredPerms={{ calendars: 2 }}>
                        <span 
                            className={styles['add-button']}
                            onClick={() => props.setCurrentCreateDate(props.date)}
                        >
                            <span className="material-icons">add</span>
                        </span>
                    </PermsProtectedComponent>
                    <span className={`
                        ${styles['date']}
                        ${isSameDay(new Date(), props.date) ? styles['today'] : ''}
                    `}>{props.date.getDate()}</span>
                </div>
                <div className={styles['day-body']}>
                    {!props.isLoading ? props.onCallEngineers.reverse().map((onCallEngineerPosition, index) => 
                        <OnCallCalenderEngineerLabel
                            onCallEngineer={onCallEngineerPosition.onCallEngineer}
                            date={props.date}
                            user={findUser(props.users, onCallEngineerPosition.onCallEngineer.data.user_id)}
                            department={findDepartment(props.departments, onCallEngineerPosition.onCallEngineer.data.department_id)}
                            pageDepartment={props.department}
                            currentHover={props.currentHover}
                            setCurrentHover={props.setCurrentHover}
                            offSet={onCallEngineerPosition.offSet}
                            key={index}
                        />
                    ) : null}
                    {maxOffset > 0 && [...Array(maxOffset)].map((_, index) =>
                        <span className={labelStyles['spacer']} key={index}></span>
                    )}
                </div>
            </div>
        </td>
    )
}

export default OnCallCalendarDay