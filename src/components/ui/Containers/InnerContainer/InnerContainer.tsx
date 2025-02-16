import { ReactNode, useState } from 'react';
import styles from './InnerContainer.module.css'

function InnerContainer(props: {
    title?: string | ReactNode,
    children?: ReactNode, 
    collapsible?: boolean,
    startCollapsed?: boolean,
    noPadding?: boolean,
    smallHeader?: boolean,
    headerItem?: JSX.Element
    headerCollapseItem?: JSX.Element
    skeleton?: boolean,
    flex?: boolean,
    color?: string
}) {
    const [isCollapsed, setIsCollapsed] = useState(props.startCollapsed ? true : false);
    const toggleCollapsed = () => setIsCollapsed(!isCollapsed);

    return (
        <div 
            className={`
                ${styles['inner-container']} 
                ${props.collapsible ? styles['collapsible'] : ''} 
                ${isCollapsed ? styles['collapsed'] : '' }
                ${props.skeleton ? styles['skeleton'] : '' }
                ${props.smallHeader ? styles['smallHeader'] : '' }
            `}
            style={{ border: `1px solid ${props.color ? `rgba(var(--${props.color}-hl), 0.5)` : 'var(--high-contrast-bg)'}`}}
        >
            {(props.title || props.skeleton || props.headerItem) && 
                <div 
                    className={styles['header']} 
                    onClick={props.collapsible ? toggleCollapsed : undefined}
                >                
                <div className={styles['title-wrapper']}>
                    
                    {!props.smallHeader ? 
                        <h2>{props.title}</h2>  :
                        <h3>{props.title}</h3>
                    }
                    {props.headerItem}
                    {isCollapsed && props.headerCollapseItem}
                </div>
                {/* Collapse Icon */}
                {props.collapsible ?
                    !props.skeleton ? 
                        <span className={`
                            ${styles['collapse-icon']} 
                            material-icons`
                        }>
                            expand_more
                        </span> :
                        null
                    : null
                }
            </div>}
            <div 
                className={`
                    ${styles['body']} ${props.flex ? styles['flex'] : ''}
                `}
            >
                <div>
                    <div>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InnerContainer