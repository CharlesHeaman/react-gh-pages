import { ReactNode } from 'react';
import styles from './GridItemWrapper.module.css'

const GridItemWrapper = (props: {
    children: ReactNode,
    clickFunc?: () => void,
}) => {
    return (
        <div 
            onClick={props.clickFunc}
            className={styles['grid-item']}
        >
            {props.children}
        </div>
    )
}

export default GridItemWrapper