import { Dispatch, SetStateAction } from "react"
import { DiaryNoteResponseData } from "../../../types/diaryNotes.types"
import { UserResponseData } from "../../../types/user.types"
import findUser from "../../../utils/findUser"
import styles from "./../../HolidayCalendar/components/HolidayCalendarDay.module.css"
import DiaryNote from "./DiaryNote"
import isSameDay from "../../../utils/isSameData"
import PermsProtectedComponent from "../../../components/PermsProtectedComponent"

const EngineerDiaryNotesDay = (props: {
    date: Date,
    isSameMonth: boolean,
    currentHover: number,
    setCurrentHover: Dispatch<SetStateAction<number>>,
    setCurrentCreateDate: Dispatch<SetStateAction<Date | undefined>>,
    diaryNotes: Array<DiaryNoteResponseData>,
    users: Array<UserResponseData>,
}) => {
    
    return (
        <td className={styles['calendar-day']}>
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
                    {props.diaryNotes.map((note, index) => <>
                        {index > 0 && <hr className="small"/>}
                        <DiaryNote
                            diaryNote={note}
                            user={findUser(props.users, note.data.created_by_id)}
                            vertical
                            key={index}
                        />
                    </>
                    )}
                </div>
            </div>
        </td>
    )
}

export default EngineerDiaryNotesDay