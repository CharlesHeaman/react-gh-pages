import getRiskAssessmentURL from "../utils/getRiskAssessmentURL"

const RiskAssessmentLink = (props: {
    riskAssessmentID: number,
    name: string,
}) => {
    return (
        <a 
            href={getRiskAssessmentURL(props.riskAssessmentID)}
            className='icon-link'
        >
            <span className="material-icons">assignment_late</span>
            <span>{props.name}</span>
        </a>
    )
}

export default RiskAssessmentLink