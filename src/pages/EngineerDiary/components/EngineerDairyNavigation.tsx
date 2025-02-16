import { useSearchParams } from "react-router-dom";
import DateInput from "../../../components/form/DateInput/DateInput";
import MonthInput from "../../../components/form/MonthInput/MonthInput";
import WeekInput from "../../../components/form/WeekInput/WeekInput";
import getDayRelativeDate from "../../../utils/getDayRelativeDate";
import getMonthRelativeDate from "../../../utils/getMonthRelativeDate";
import getEngineerDiaryDate from "../utils/getEngineerDiaryDate";
import styles from "./../../TimeGrids/components/TimegridNavigation/TimegridNavigation.module.css";

const EngineerDiaryNavigation = (props: {
    week?: boolean,
    month?: boolean
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const date = getEngineerDiaryDate(searchParams.get('date'))

    const updateDate = (newDate: Date) => {
        let updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set('date', newDate.toISOString().split('T')[0]);
        setSearchParams(updatedSearchParams);
    }

    return (

        <div className={styles['timegrid-navigation']}>
            <button 
                onClick={() => updateDate(!props.month ? getDayRelativeDate(date, props.week ? -7 : -1) : getMonthRelativeDate(date, -1))}
                className={`
                    ${styles['previous-page']} 
                    ${styles['nav-item']}
                `}
            >
                <span className={`material-icons ${styles['nav-item-icon']}`}>navigate_before</span> 
                <span className={styles['nav-item-text']}>Previous {!props.month ? props.week ? 'Week' : 'Day' : 'Month'}</span>
            </button>
            {!props.month && !props.week ? <DateInput
                value={date} 
                name={"date"} 
                updateFunc={(date) => updateDate(date)}            
            /> : !props.week ? <MonthInput
                value={date} 
                name={"month"} 
                updateFunc={(date) => updateDate(date)}            
            /> : <WeekInput
                value={date} 
                name={"week"} 
                updateFunc={(date) => updateDate(date)}            
            />}
            <button 
                onClick={() => updateDate(!props.month ? getDayRelativeDate(date, props.week ? 7 : 1) : getMonthRelativeDate(date, 1))}
                className={`
                    ${styles['next-page']} 
                    ${styles['nav-item']}
                `}
            >
                <span className={styles['nav-item-text']}>Next {!props.month ? props.week ? 'Week' : 'Day' : 'Month'}</span>
                <span className={`material-icons ${styles['nav-item-icon']}`}>navigate_next</span> 
            </button>
        </div>
    )
}

export default EngineerDiaryNavigation