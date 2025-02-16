import { ReactNode } from 'react'
import styles from './DashboardWrapper.module.css'

const DashboardWrapper = (props: {
    children: ReactNode,
}) => {
    return (
        <div className={styles['dashboard-wrapper']}>
            <div className={styles['dashboard-content']}>
                {props.children}
            </div>
        </div>
    )
}

export default DashboardWrapper