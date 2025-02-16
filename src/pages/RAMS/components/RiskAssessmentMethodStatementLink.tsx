const RiskAssessmentMethodStatementLink = (props: {
    url: string
}) => {

    const getFileName = (url: string) => {
        const removedExtension = url.split('.')[0]
        const splitURL = removedExtension.split('/');
        return splitURL[splitURL.length - 1]
    }
    
    return (
        <a 
            href={`${process.env.REACT_APP_API_URL}/${props.url}`}
            className="icon-link"
        >
            <span className="material-icons">assignment_late</span>
            <span>{getFileName(props.url)}</span>
        </a>
    )
}

export default RiskAssessmentMethodStatementLink