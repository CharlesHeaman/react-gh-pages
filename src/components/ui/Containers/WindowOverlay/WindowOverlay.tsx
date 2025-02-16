import { FocusTrap } from 'focus-trap-react';
import styles from './WindowOverlay.module.css'
import { ReactNode, useEffect } from 'react'

const WindowOverlay = (props: {
    title: string,
    maxWidth: number,
    hideFunc?: () => void,
    show: boolean,
    children: ReactNode,
    footer?: ReactNode,
    top?: boolean
}) => {
    useEffect(() => {
        const handleEscape = (event: { key: string; }) => {
           if (event.key === 'Escape' && props.hideFunc) props.hideFunc();
        };
        window.addEventListener('keydown', handleEscape);
    
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleClick = (event: any) => {
        if (event.target.className.includes('WindowOverlay_window-overlay') && props.hideFunc) props.hideFunc();
    }

    return (
        props.show ? <FocusTrap>
            <div 
                className={`${styles['window-overlay']} ${props.top ? styles['top'] : ''}`}
                onClick={handleClick}
            >
           
                <div 
                    className={styles['content']} 
                    style={{ "width": `${props.maxWidth}px` }}
                >
                    <div className={styles['overlay-header']}>
                        <h3>{props.title}</h3>
                        {props.hideFunc ? 
                            <button className={styles['close-button']} type='button' onClick={props.hideFunc}>
                                <span className="material-icons">close</span>
                            </button> :
                            null
                        }
                    </div>
                    <div className={styles['overlay-body']}>
                        {props.children}
                    </div>
                    {props.footer ? <div className={styles['overlay-footer']}>
                        {props.footer}
                    </div> : null}
                </div>
            </div>
        </FocusTrap> : null
    )
}

export default WindowOverlay