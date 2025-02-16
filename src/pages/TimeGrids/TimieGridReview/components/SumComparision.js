function SumComparision(props) {
    return (
        <>
            {props.prefix}
            <span 
                style={{ color: props.total == props.match ? 
                    `rgb(var(--dark-blue-hl))` : 
                    props.total <= props.max && props.total >= props.min ?
                        `rgb(var(--light-green-hl))` :
                        `rgb(var(--red-hl))` 
                }}
            >
                {props.total}
            </span>
            {props.suffix}
        </>

    )
}

export default SumComparision