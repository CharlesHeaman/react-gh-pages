import { ReactNode } from 'react'
import styles from './SideBar.module.css'

function SideBar(props: {
    children: ReactNode
}) {
    return (
        <aside className={styles['side-bar']}>
            {props.children}
        </aside>
    )
}

export default SideBar