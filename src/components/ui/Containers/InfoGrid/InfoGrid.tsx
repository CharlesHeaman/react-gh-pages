import { ReactNode } from 'react'
import styles from './InfoGrid.module.css'

function InfoGrid(props: {
    children: ReactNode,
    columnCount?: number
}) {
    return (
        <div 
            style={
                { "--column-count": props.columnCount ? props.columnCount : 6 } as React.CSSProperties
            } 
            className={styles['info-grid']}>
            {props.children}
        </div>
    )
}

export default InfoGrid