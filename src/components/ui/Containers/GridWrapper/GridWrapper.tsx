import { ReactNode } from 'react'
import styles from './GridWrapper.module.css'

const GridWrapper = (props: {
    children: ReactNode,
}) => {
    return (
        <div className={styles['grid-wrapper']}>
            <div className={styles['grid-content']}>
                {props.children}
            </div>
        </div>
    )
}

export default GridWrapper