import { useParams } from "react-router-dom";
import styles from "./../../CustomerAdmin/components/CustomerAdminNavigation.module.css"

const EngineerDairyPageNavigation = (props: {
    location: string
}) => {
    const { departmentName } = useParams();
    return (
        <div className={styles['navigation']}>
            <nav>
                <ul>
                    <li>
                        <a href={`#/${departmentName}/engineer_diary/day`} className={props.location === 'day' ? styles['focus'] : ''}>
                            <span className="material-icons">event</span>
                            Day
                        </a>
                    </li>
                    <li>
                        <a href={`#/${departmentName}/engineer_diary/week`} className={props.location === 'week' ? styles['focus'] : ''}>
                            <span className="material-icons">date_range</span>
                            Week
                        </a>
                    </li>
                    <li>
                        <a href={`#/${departmentName}/engineer_diary/month`} className={props.location === 'month' ? styles['focus'] : ''}>
                            <span className="material-icons">calendar_month</span>
                            Month
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default EngineerDairyPageNavigation