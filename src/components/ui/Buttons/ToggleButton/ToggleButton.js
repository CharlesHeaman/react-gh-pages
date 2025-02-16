import styles from './ToggleButton.module.css';

function ToggleButton(props) {
    function handleClick() {
        props.clickFunc();
    }

    return (
        <span 
            className={`${styles['toggle-button']} 
                ${props.selected ? styles['selected'] : ''} 
                ${props.color ? props.color : ''}`} 
            onClick={handleClick}>
            {props.icon}{props.text}
        </span>
    )
}

export default ToggleButton