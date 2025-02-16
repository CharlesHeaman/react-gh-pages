import { ReactNode } from 'react';
import styles from './ListItem.module.css'

const ListItem = (props: {
    children: ReactNode,
    smallPadding?: boolean,
    clickFunc?: () => void,
    disabled?: boolean,
    noClick?: boolean
}) => {
    const handleClick = () => {
        props.clickFunc && !props.disabled && props.clickFunc();
    }

    return (
        <div 
            onClick={handleClick}
            className={`
                ${styles['list-item']} 
                ${props.disabled ? styles['disabled'] : ' '} 
                ${props.noClick ? styles['noClick'] : ' '} 
                ${props.smallPadding ? styles['small-padding'] : ' '}
            `}
        >
                {props.children}
        </div>
    )
}

export default ListItem