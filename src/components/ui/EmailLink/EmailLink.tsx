const EmailLink = (props: {
    email: string
}) => {
    return (
        <a 
            href={`mailto:${props.email}`} 
            className="icon-link"
        >
            <span className="material-icons">email</span>
            <span>{props.email}</span>
        </a>
    )
}

export default EmailLink