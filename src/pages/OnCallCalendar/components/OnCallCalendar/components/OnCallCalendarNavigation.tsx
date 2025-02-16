import { useSearchParams } from "react-router-dom";
import MonthInput from "../../../../../components/form/MonthInput/MonthInput";
import ShowCreateButton from "../../../../../components/form/ShowCreateButton/ShowCreateButton";
import getMonthRelativeDate from "../../../../../utils/getMonthRelativeDate";
import getOnCallCalendarDate from "../../../utils/getOnCallCalendarDate";
import styles from "./../../../../TimeGrids/components/TimegridNavigation/TimegridNavigation.module.css";
import getYYYYMMDD from "../../../../../utils/getYYYYMMDD";
import PermsProtectedComponent from "../../../../../components/PermsProtectedComponent";

const OnCallCalendarNavigation = (props: {
    showAdd: () => void,
    resourceName: string,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const date = getOnCallCalendarDate(searchParams.get('date'));

    const updateDate = (newDate: Date) => {
        let updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set('date', getYYYYMMDD(newDate));
        setSearchParams(updatedSearchParams);
    }

    return (
        <div className={styles['timegrid-navigation']}>
            <div className="flex">
                <button 
                    onClick={() => updateDate(getMonthRelativeDate(date, -1))}
                    className={`
                        ${styles['previous-page']} 
                        ${styles['nav-item']}
                    `}
                >
                    <span className={`material-icons ${styles['nav-item-icon']}`}>navigate_before</span> 
                    <span className={styles['nav-item-text']}>Last Month</span>
                </button>
                <MonthInput
                    name={"calendar_date"} 
                    value={date} 
                    updateFunc={(date) => updateDate(date)}                
                />
            </div>
            <div className="flex">
                <PermsProtectedComponent requiredPerms={{ calendars: 2 }}>
                    <ShowCreateButton
                        text={`Add ${props.resourceName}`}
                        clickFunc={props.showAdd}
                    />
                </PermsProtectedComponent>
                <button 
                    onClick={() => updateDate(getMonthRelativeDate(date, 1))}
                    className={`
                        ${styles['next-page']} 
                        ${styles['nav-item']}
                    `}
                >
                    <span className={styles['nav-item-text']}>Next Month</span>
                    <span className={`material-icons ${styles['nav-item-icon']}`}>navigate_next</span> 
                </button>
            </div>
        </div>
    )
}

export default OnCallCalendarNavigation