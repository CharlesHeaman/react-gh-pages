import styles from './HelpButton.module.css'
import { ReactComponent as InfoImg } from './../../../../assets/images/help_black_24dp.svg';

function HelpButton(props) {
    function handleClick(e) {
        e.stopPropagation();
        props.clickFunc();
    }

    return (
        <button className={styles['help-button']} onClick={handleClick}>
            <InfoImg/>
        </button>
    )
}

export default HelpButton