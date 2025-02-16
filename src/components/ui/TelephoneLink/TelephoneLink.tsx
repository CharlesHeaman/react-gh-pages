const TelephoneLink = (props: {
    number: string
}) => {
    return (
        <a 
            href={`tel:${props.number}`} 
            className="icon-link"
        >
            <span className="material-icons">call</span>
            <span>{props.number}</span>
        </a>
    )
}

export default TelephoneLink