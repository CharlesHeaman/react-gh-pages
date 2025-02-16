import { ReactNode } from 'react'
import styles from './GridItem.module.css'

function GridItem(props: {
    title?: string | ReactNode,
    secondaryTitle?: string
    children?: ReactNode,
    span?: number,
    
}) {
    return (
        <div 
            style={
                { "--column-span": props.span } as React.CSSProperties
            } 
            className={`
                ${styles['grid-item']} 
                ${!props.span ? styles['full-span'] : ''}
            `}
        >
            {props.title ? 
                <div className='flex'>
                    <h3 className='no-select'>{props.title} <span style={{ color: 'var(--grey-text-color)', fontWeight: 600, fontStyle: 'italic'}}>{props.secondaryTitle}</span></h3>
                    
                </div> : null
            }
            {props.children}
        </div>
    )
}

export default GridItem