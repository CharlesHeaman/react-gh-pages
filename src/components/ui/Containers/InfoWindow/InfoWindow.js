import styles from './InfoWindow.module.css'
import { ReactComponent as CloseImg } from './../../../../assets/images/close_black_24dp.svg'

function InfoWindow(props) {
    return (
        <div className={styles['info-window']}>
            <div className={styles['content']}>
                <button className={styles['close-button']} type='button' onClick={props.hideFunc}>
                    <CloseImg/>
                </button>
                {props.children}
            </div>
        </div>
    )
}

export default InfoWindow