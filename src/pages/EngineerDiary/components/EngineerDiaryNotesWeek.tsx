import { Dispatch, SetStateAction, useState } from "react";
import { DiaryNoteResponseData } from "../../../types/diaryNotes.types";
import { UserResponseData } from "../../../types/user.types";
import getDayRelativeDate from "../../../utils/getDayRelativeDate";
import filterDateEngineerDiaryNotes from "../utils/filterDateEngineerDiaryNotes";
import styles from "./../../OnCallCalendar/components/OnCallCalendar/OnCallCalendar.module.css";
import EngineerDiaryNotesDay from "./EngineerDiaryNotesDay";

const EngineerDiaryNotesWeek = (props: {
    startDate: Date,
    diaryNotes: Array<DiaryNoteResponseData>,
    users: Array<UserResponseData>,
    setCurrentCreateDate: Dispatch<SetStateAction<Date | undefined>>
}) => {

    const [currentHover, setCurrentHover] = useState<number>(-1);
    const getCurrentDate = (columnIndex: number) => {
        return getDayRelativeDate(props.startDate, columnIndex)
    }
    
    return (
        <section>
            <h2>Notes</h2>
            <table className={styles['calendar-table']}>
                <thead>
                    <tr>
                        {[...Array(7)].map((_, columnIndex) => 
                            <th 
                                style={{
                                    width: '120px'
                                }}
                            >
                                {getCurrentDate(columnIndex).toLocaleString('default', { weekday: 'long', day: 'numeric' })}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {[...Array(7)].map((_, columnIndex) => 
                            <EngineerDiaryNotesDay
                                date={getCurrentDate(columnIndex)}
                                isSameMonth={true}
                                currentHover={currentHover}
                                setCurrentHover={setCurrentHover}
                                setCurrentCreateDate={props.setCurrentCreateDate}
                                diaryNotes={filterDateEngineerDiaryNotes(props.diaryNotes, getCurrentDate(columnIndex))}
                                users={props.users}
                                key={columnIndex}
                            />
                        )}
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default EngineerDiaryNotesWeek