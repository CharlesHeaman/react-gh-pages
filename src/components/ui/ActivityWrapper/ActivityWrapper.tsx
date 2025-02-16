import { ReactNode } from 'react';
import styles from './ActivityWrapper.module.css'
const ActivityWrapper = (props: {
    children: ReactNode
}) => {
    return (
        <div className={styles['activity-wrapper']}>
            {props.children}
        </div>
    )
}

export default ActivityWrapper