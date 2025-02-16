function Difference(props) {
    return (
        <span style={{ color: props.value < 0 ?
            'rgb(var(--red-hl))' : 
                props.value > 0 ? 
                    'rgb(var(--light-green-hl))' :
                    'rgb(var(--dark-blue-hl))',
            width: props.width ? props.width : '',
            display: 'inline-block'
        }}>
            {`${props.prefix ? props.prefix : ''}${props.value > 0 ? '+' : ''}${props.value}${props.suffix ? props.suffix : ''}`}
        </span>
    )
}

export default Difference