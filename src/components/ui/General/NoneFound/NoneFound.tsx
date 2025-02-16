import CreateButton from "../../../form/CreateButton/CreateButton";
import styles from "./NoneFound.module.css";

const NoneFound = (props: {
    iconFont: string,
    text: string,
    noPadding?: boolean,
    small?: boolean,
    createTo?: string,
    createText?: string
}) => {
    return (
        <div className={`${styles['none-found']} ${props.noPadding ? styles['no-padding'] : ''}  ${props.small ? styles['small'] : ''}`}>
            <span className="material-icons">{props.iconFont}</span>  
            {props.small ? 
                <h3>{props.text}</h3> :
                <h2>{props.text}</h2>
            }
            {props.createTo && props.createText && <div style={{ marginLeft: 'auto', display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--normal-gap)' }}>
                <CreateButton
                    to={props.createTo}
                    text={props.createText}
                />
            </div>}
        </div>
    )
}

export default NoneFound