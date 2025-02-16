const FormErrorMessage = (props: {
    text: string,
    isWarning?: boolean
    show: boolean
}) => {
    return (
        props.show ? <p style={{
            display: 'flex'
        }}><span style={{ 
            color: !props.isWarning ? 'rgb(var(--red-hl))' : 'rgb(var(--orange-hl))', 
            fontSize: '14px', 
            marginTop: '0.25em', 
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--small-gap)',
            borderRadius: 'var(--button-border-radius)',
            padding: 'var(--small-button-padding)',
            fontWeight: 600
        }}>
            <span style={{ fontSize: '1.375em'}} className="material-icons">report_problem</span>
            {props.text}
        </span></p> : null
    )
}

export default FormErrorMessage