import { useEffect, useRef, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import styles from './ActionMenu.module.css';

export interface ActionItem {
    iconFont?: string,
    text: string,
    clickFunc: () => void,
}

const ActionMenu = (props: {
    actionItems: Array<ActionItem>,
}) => {
    const containerRef = useDetectClickOutside({ onTriggered: () => setShowMenu(false) });
    const inputRef = useRef(null);

    // Menu States
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        inputRef.current !== null && inputRef.current.focus();
    }, [showMenu])

    return (
        <details open={showMenu} ref={containerRef}>
            <summary
                className={`${styles['details-summary']} ${showMenu ? styles['open'] : ''} no-select`}
                onClick={(e: any) => {
                    e.preventDefault();
                    setShowMenu(!showMenu)
                }}
            >
                <span className="material-icons">more_horiz</span>
            </summary>
            <div 
                className={styles['menu-wrapper']}
            >
                <div
                    className={`${styles['list-wrapper']} no-select`}
                >
                    {props.actionItems.map((actionItem, index) => 
                        <label
                            onClick={() => {
                                setShowMenu(false);
                                actionItem.clickFunc();
                            }}
                            className={styles['list-item']}
                            key={index}
                        >   
                            <span className="material-icons">{actionItem.iconFont}</span>
                            <span>{actionItem.text}</span>
                        </label>                
                    )}
                </div>
            </div>
        </details>
    )
}

export default ActionMenu