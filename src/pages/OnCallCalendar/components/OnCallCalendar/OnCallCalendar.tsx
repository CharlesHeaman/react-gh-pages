import { Dispatch, SetStateAction, useState } from "react";
import { DepartmentResponseData } from "../../../../types/department.types";
import { UserResponseData } from "../../../../types/user.types";
import filterDateOnCallEngineers from "../../../../utils/filterDateOnCallEngineersPositions";
import getDayRelativeDate from "../../../../utils/getDayRelativeDate";
import { OnCallEngineerPositions } from "../../utils/positionOnCallEngineers";
import OnCallCalendarDay from "./components/OnCallCalendarDay";
import styles from "./OnCallCalendar.module.css";

const OnCallCalendar = (props: {
    firstDayOfMonth: Date,
    lastDayOfMonth: Date,
    startDate: Date,
    onCallEngineers: Array<OnCallEngineerPositions>,
    users: Array<UserResponseData>,
    department: DepartmentResponseData | undefined,
    departments: Array<DepartmentResponseData>,
    setCurrentCreateDate: Dispatch<SetStateAction<Date | undefined>>
    isLoading: boolean,
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
        <>
            <table className={styles['calendar-table']}>
                <thead>
                    <tr>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th className={styles["weekend"]}>Saturday</th>
                        <th className={styles["weekend"]}>Sunday</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(6)].map((_, rowIndex) => 
                        <tr key={rowIndex}>
                            {[...Array(7)].map((_, columnIndex) => 
                                <OnCallCalendarDay
                                    date={getCurrentDate(rowIndex, columnIndex)}
                                    isSameMonth={isSameMonth(getCurrentDate(rowIndex, columnIndex))}
                                    onCallEngineers={filterDateOnCallEngineers(props.onCallEngineers, getCurrentDate(rowIndex, columnIndex))}
                                    users={props.users}
                                    department={props.department}
                                    departments={props.departments}
                                    currentHover={currentHover}
                                    setCurrentHover={setCurrentHover}
                                    setCurrentCreateDate={props.setCurrentCreateDate}
                                    isLoading={props.isLoading}
                                    key={columnIndex}
                                />
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default OnCallCalendar