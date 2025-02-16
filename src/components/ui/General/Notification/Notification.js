import { useEffect } from 'react';
import styles from './Notification.module.css';

function Notification(props) {
    useEffect(() => {
        const timer = setTimeout(() => {
            clearNotification();
        }, 6000);
        return () => clearTimeout(timer);
    }, []);

    function clearNotification() {
        props.setNotification({});
    }

    return (
        <div className={`${styles['notification']} ${styles[!props.error ? 'positive' : 'negative']}`} onClick={clearNotification}>
            {props.text}
        </div>
    )
}

export default Notification