import { ReactNode } from 'react'
import Skeleton from '../../General/Skeleton/Skeleton'
import styles from './SideBarModule.module.css'

const  SideBarModule = (props: {
    children: ReactNode,
    title?: string,
    skeleton?: boolean
}) => {
    return (
        <div className={styles['side-bar-module']}>
            {!props.skeleton ? 
                <h3>{props.title}</h3> :
                <>
                    <h3>
                        <Skeleton type='small-title'/>
                    </h3>
                </>
            }
            {props.children}
        </div>
    )
}

export default SideBarModule