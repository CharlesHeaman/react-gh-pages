import { ReactNode } from 'react'
import styles from './SideBarButton.module.css'

const SideBarButton = (props: {
    text: string
    iconFont: string,
    clickEvent: (event: React.MouseEvent<HTMLAnchorElement>) => void
    color?: string,
    icon?: ReactNode,
}) => {
    return (
        <a 
            className={`${styles['side-bar-button']} ${props.color ? props.color : 'no-color'}`}
            onClick={props.clickEvent}
        >
            {props.icon}
            <span className="material-icons">{props.iconFont}</span>
            <span>{props.text}</span>
        </a>
    )
}

export default SideBarButton