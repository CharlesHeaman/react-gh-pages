import { ReactNode } from 'react'
import styles from './ListWrapper.module.css'

const ListWrapper = (props: {
    children: ReactNode,
    noMargin?: boolean,
}) => {
    return (
        <div className={`${styles['list-wrapper']} ${props.noMargin ? styles['no-margin'] : ''}`}>
            {props.children}
        </div>
    )
}

export default ListWrapper