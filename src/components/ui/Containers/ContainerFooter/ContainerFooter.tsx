import { ReactNode } from 'react'
import styles from './ContainerFooter.module.css'

function ContainerFooter(props: {
    children: ReactNode
}) {
    return (
        <div className={styles['container-footer']}>
            {props.children}
        </div>
    )
}

export default ContainerFooter