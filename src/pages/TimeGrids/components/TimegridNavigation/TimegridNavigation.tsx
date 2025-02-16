import { useSearchParams } from "react-router-dom";
import getDayRelativeDate from "../../../../utils/getDayRelativeDate";
import getTimegridListDate from "../../utils/getTimegridListDate";
import styles from "./TimegridNavigation.module.css";
import getYYYYMMDD from "../../../../utils/getYYYYMMDD";
import DateInput from "../../../../components/form/DateInput/DateInput";

const TimegridNavigation = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const date = getTimegridListDate(searchParams.get('date'));

    const canGoNext = () => {
        return date.getTime() < new Date(new Date().setHours(0)).getTime()
    }

    const updateDate = (newDate: Date) => {
        let updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set('date', getYYYYMMDD(newDate));
        setSearchParams(updatedSearchParams);
    }

    return (

        <div className={styles['timegrid-navigation']}>
            <div className="flex">
                <button 
                    onClick={() => updateDate(getDayRelativeDate(date, -1))}
                    className={`
                        ${styles['previous-page']} 
                        ${styles['nav-item']}
                    `}
                >
                    <span className="material-icons">navigate_before</span> 
                    <span className={styles['nav-item-text']}>Previous Day</span>
                </button>
                <DateInput 
                    name={"timegrid_date"} 
                    value={date} 
                    updateFunc={(date) => updateDate(date)}
                />
            </div>
            <button 
                onClick={() => updateDate(getDayRelativeDate(date, 1))}
                className={`
                    ${styles['next-page']} 
                    ${styles['nav-item']}
                    ${!canGoNext() && styles['disabled']}
                `}
            >
                <span className={styles['nav-item-text']}>Next Day</span>
                <span className="material-icons">navigate_next</span> 
            </button>
        </div>
    )
}

export default TimegridNavigation