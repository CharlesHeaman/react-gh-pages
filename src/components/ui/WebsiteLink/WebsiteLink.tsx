const WebsiteLink = (props: {
    url: string
}) => {
    return (
        <a 
            href={props.url} 
            className="icon-link"
        >
            <span className="material-icons">web</span>
            <span>{props.url}</span>
        </a>
    )
}

export default WebsiteLink