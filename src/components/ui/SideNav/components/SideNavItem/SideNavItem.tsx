import { useNavigate } from "react-router-dom";
import styles from "./SideNavItem.module.css"

const SideNavItem = (props: {
    title: string,
    iconFont: string,
    location: string,
    selected?: boolean
    navIsOpen: boolean,
    hex?: string | null
}) => {
    const navigate = useNavigate();
    
    return (
        <li 
            className={`
                ${styles['side-nav-item']}
                ${props.navIsOpen ? styles['open'] : ''}
                ${props.selected ? styles['selected'] : ''}
                no-select
            `}
            style={{ 
                "--hex-label-color": `${props.hex ? `#${props.hex}` : ''}`,
                "--hex-label-color-bg": `${props.hex ? `#${props.hex}40` : ''}`
            } as React.CSSProperties}
        >
            <a
                onClick={() => navigate(`/${props.location}`)}
            >
                <span className="material-icons">{props.iconFont}</span>
                {props.navIsOpen && <span className={styles['title']}>{props.title}</span>}
            </a>
        </li>
    )
}

export default SideNavItem