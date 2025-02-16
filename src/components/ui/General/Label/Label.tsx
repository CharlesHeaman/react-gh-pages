import styles from './Label.module.css'

const Label = (props: {
    color?: string, 
    hex?: string | null, 
    iconFont?: string, 
    symbolFont?: string,
    text?: string, 
    hideIcon?: boolean, 
    hideText?: boolean, 
    title?: string,
    icon?: any,
    massiveIcon?: boolean,
    bigIcon?: boolean,
    mediumIcon?: boolean,
    noBackground?: boolean,
    circular?: boolean,
    bold?: boolean,
}) => {
    return (
        <span 
            className={`
                ${styles['label']} 
                ${props.color}
                ${props.massiveIcon ? styles['massive-icon'] : ''}
                ${props.bigIcon ? styles['big-icon'] : ''}
                ${props.mediumIcon ? styles['medium-icon'] : ''}
                ${props.noBackground ? styles['no-background'] : ''}
                ${props.circular ? styles['circular'] : ''}
                ${props.bold ? styles['bold'] : ''}
            `}
            style={{ 
                "--hex-label-color": `${props.hex ? `#${props.hex}` : ''}`,
                "--hex-label-color-bg": `${props.hex ? `#${props.hex}40` : ''}`
            } as React.CSSProperties}
            title={props.title ? props.title : props.text}
        >
            {!props.hideIcon && 
                <>
                    {props.icon}
                    {props.iconFont && <span className="material-icons" style={{ fontSize: props.massiveIcon ? '60px' : props.bigIcon ? '50px' : props.mediumIcon ? '30px' : ''}}>{props.iconFont}</span>}
                    {props.symbolFont && <span className="material-symbols-rounded" style={{ fontSize: props.massiveIcon ? '60px' : props.bigIcon ? '50px' : props.mediumIcon ? '30px' : ''}}>{props.symbolFont}</span>}
                </>
            }
            {!props.hideText && props.text}
        </span>
    )
}

export default Label