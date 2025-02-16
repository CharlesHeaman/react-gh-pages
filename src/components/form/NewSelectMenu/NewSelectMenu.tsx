import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import NoneFound from "../../ui/General/NoneFound/NoneFound";
import styles from './SelectMenu.module.css'

export interface NewSelectItem {
    icon?: ReactNode,
    text: string,
    clickFunc: () => void,
    selected: boolean
}

const NewSelectMenu = (props: {
    iconFont: string | ReactNode,
    resourceName?: string,
    resourceNamePlural?: string,
    selectedText?: string,
    selectItems: Array<NewSelectItem>,
    secondarySelectItems?: Array<NewSelectItem>,
    showSearch?: boolean,
    onSearchUpdate?: (event: ChangeEvent<HTMLInputElement>) => void,
    minWidth?: number
}) => {
    const containerRef = useDetectClickOutside({ onTriggered: () => setShowMenu(false) });
    const inputRef = useRef<HTMLInputElement>(null);

    // Menu States
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        inputRef.current !== null && inputRef.current.focus();
    }, [showMenu]);

    return (
        <details open={showMenu} ref={containerRef}>
            <summary
                className={`${styles['details-summary']} ${showMenu ? styles['open'] : ''} no-select`}
                onClick={(e: any) => {
                    e.preventDefault();
                    setShowMenu(!showMenu)
                }}
                style={{ minWidth: props.minWidth }}
            >
                <span className="material-icons">{props.iconFont}</span>
                <span style={{
                    color: props.selectedText === undefined ? 'var(--light-grey-text-color)' : '',
                    whiteSpace: 'nowrap',
                    overflowX: 'hidden',
                    textOverflow: 'ellipsis',
                    flexGrow: 1
                }}>{props.selectedText ? props.selectedText : `Select ${props.resourceName}...`}</span>
                <span className="material-icons">arrow_drop_down</span>
            </summary>
            <div 
                className={styles['menu-wrapper']}
            >
                {props.showSearch ? <div
                    className={styles['search-wrapper']}
                >
                    <input 
                        ref={inputRef}
                        type="text"
                        placeholder={`Search ${props.resourceNamePlural}...`}
                        onChange={props.onSearchUpdate}
                        autoFocus
                    />
                </div> : null}
                <div
                    className={`${styles['list-wrapper']} no-select`}
                >
                    {props.selectItems.length > 0 ? 
                        props.selectItems.map((selectItem, index) => 
                            <label
                                onClick={() => {
                                    setShowMenu(false);
                                    selectItem.clickFunc();
                                }}
                                className={`${styles['list-item']} ${selectItem.selected ? styles['selected'] : ''}`}
                                key={index}
                            >   
                                {selectItem.icon}
                                <span>{selectItem.text}</span>
                            </label>                
                        ) : 
                        <NoneFound
                            iconFont="block"
                            text={`No ${props.resourceNamePlural} found`}
                            small
                        />
                    }
                </div>
                {props.secondarySelectItems ? <>
                    <hr/>
                    <div
                        className={`${styles['list-wrapper']} no-select`}
                    >
                        {props.secondarySelectItems.map((selectItem, index) => 
                            <label
                                onClick={() => {
                                    setShowMenu(false);
                                    selectItem.clickFunc();
                                }}
                                className={`${styles['list-item']} ${selectItem.selected ? styles['selected'] : ''}`}
                                key={index}
                            >   
                                {selectItem.icon}
                                <span>{selectItem.text}</span>
                            </label>                
                        )}
                    </div>
                </> : null}
            </div>
        </details>
    )
}

export default NewSelectMenu