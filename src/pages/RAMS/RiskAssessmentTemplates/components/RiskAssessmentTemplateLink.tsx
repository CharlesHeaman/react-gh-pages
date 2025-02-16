import DisabledLabel from "../../../../components/ui/DisabledLabel/DisabledLabel"
import getRiskAssessmentTemplateURL from "../utils/getRiskAssessmentTemplateURL"

const RiskAssessmentTemplateLink = (props: {
    riskAssessmentTemplateID: number,
    name: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getRiskAssessmentTemplateURL(props.riskAssessmentTemplateID)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">assignment_late</span> :
                <DisabledLabel hideText/>
            } 
            <span>{props.name}</span>
        </a>
    )
}

export default RiskAssessmentTemplateLink