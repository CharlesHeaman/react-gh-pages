import getNonConformanceReportURL from "../utils/getNonConformanceReportURL"

const NonConformanceReportLink = (props: {
    nonConformanceReportID: number,
}) => {
    return (
        <a 
            href={getNonConformanceReportURL(props.nonConformanceReportID)}
            className="icon-link"
        >
            <span className="material-icons">feedback</span>
            <span>{props.nonConformanceReportID}</span>
        </a>
    )
}

export default NonConformanceReportLink