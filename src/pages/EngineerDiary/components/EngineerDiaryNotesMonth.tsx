import { Dispatch, SetStateAction, useState } from "react";
import { DiaryNoteResponseData } from "../../../types/diaryNotes.types";
import { UserResponseData } from "../../../types/user.types";
import getDayRelativeDate from "../../../utils/getDayRelativeDate";
import filterDateEngineerDiaryNotes from "../utils/filterDateEngineerDiaryNotes";
import styles from "./../../OnCallCalendar/components/OnCallCalendar/OnCallCalendar.module.css";
import EngineerDiaryNotesDay from "./EngineerDiaryNotesDay";

const EngineerDiaryNotesMonth = (props: {
    firstDayOfMonth: Date,
    lastDayOfMonth: Date,
    startDate: Date,
    diaryNotes: Array<DiaryNoteResponseData>,
    users: Array<UserResponseData>,
    setCurrentCreateDate: Dispatch<SetStateAction<Date | undefined>>
}) => {

    const [currentHover, setCurrentHover] = useState<number>(-1);

    const isSameMonth = (date: Date) => {
        return (
            date.getTime() >= props.firstDayOfMonth.getTime() &&
            date.getTime() <= props.lastDayOfMonth.getTime()
        )
    }

    const getCurrentDate = (rowIndex: number, columnIndex: number) => {
        return getDayRelativeDate(props.startDate, (rowIndex * 7) + columnIndex)
    }
    
    return (
        <section>
            <h2>Notes</h2>
            <div className="table-wrapper">
                <table className={styles['calendar-table']}>
                    <thead>
                        <tr>
                            <th style={{
                                width: '240px'
                            }}>Monday</th>
                            <th style={{
                                width: '240px'
                            }}>Tuesday</th>
                            <th style={{
                                width: '240px'
                            }}>Wednesday</th>
                            <th style={{
                                width: '240px'
                            }}>Thursday</th>
                            <th style={{
                                width: '240px'
                            }}>Friday</th>
                            <th style={{
                                width: '240px'
                            }}>Saturday</th>
                            <th style={{
                                width: '240px'
                            }}>Sunday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(6)].map((_, rowIndex) => 
                            <tr key={rowIndex}>
                                {[...Array(7)].map((_, columnIndex) => 
                                    <EngineerDiaryNotesDay
                                        date={getCurrentDate(rowIndex, columnIndex)}
                                        isSameMonth={isSameMonth(getCurrentDate(rowIndex, columnIndex))}
                                        currentHover={currentHover}
                                        setCurrentHover={setCurrentHover}
                                        setCurrentCreateDate={props.setCurrentCreateDate}
                                        diaryNotes={filterDateEngineerDiaryNotes(props.diaryNotes, getCurrentDate(rowIndex, columnIndex))}
                                        users={props.users}
                                        key={columnIndex}
                                    />
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default EngineerDiaryNotesMonth