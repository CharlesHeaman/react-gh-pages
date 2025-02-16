import styles from './SubmitButton.module.css'

const SubmitButton = (props: {
    text: string,
    clickFunc: () => void,
    color?: string,
    iconFont?: string,
    iconSymbol?: string,
    iconAfter?: boolean,
    left?: boolean,
    disabled?: boolean,
    submitting?: boolean,
    submittingText?: string,
    noMargin?: boolean
    noSubmit?: boolean,
    smallPadding?: boolean
}) => {
    return (
        <button 
            className={`
                ${styles['submit-button']} 
                ${props.color ? 
                    props.color : 
                    'light-green'
                }
                ${props.left ? 
                    styles['left'] : 
                    ''
                }
                ${props.smallPadding ? 
                    styles['small-padding'] : 
                    ''
                }
                ${props.noMargin ? 
                    styles['no-margin'] : 
                    ''
                }
            `} 
            onClick={props.clickFunc}
            disabled={props.disabled || props.submitting}
            type={!props.noSubmit ? 'submit' : 'button'}
        >
            {!props.iconAfter && props.iconFont && <span className='material-icons'>{props.iconFont}</span>}
            {!props.iconAfter && props.iconSymbol && <span className='material-symbols-rounded'>{props.iconSymbol}</span>}
            {!props.submitting ? 
                props.text : 
                (props.submittingText ? 
                    props.submittingText : 
                    'Submitting...'
                )
            }
            {props.iconAfter && props.iconFont && <span className='material-icons'>{props.iconFont}</span>}
        </button>
    )
}

export default SubmitButton