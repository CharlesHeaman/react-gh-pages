import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import Label from "../../../../components/ui/General/Label/Label"
import { RiskAssessmentResponseData } from "../../../../types/riskAssessment.types"

const RiskAssessmentDisplay = (props: {
    riskAssessmentData: RiskAssessmentResponseData
}) => {
    return (
        <InnerContainer
            title={props.riskAssessmentData.data.name}
            headerItem={<div style={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                flexGrow: 1
            }}>
                {props.riskAssessmentData.data.is_landscape ?
                    <Label text="Landscape" iconFont="crop_landscape" color="grey"/> :
                    <Label text="Portrait" iconFont="crop_portrait" color="grey"/> 
                }
            </div>
            }
        >
            <ReactMarkdown>{props.riskAssessmentData.data.content}</ReactMarkdown>
        </InnerContainer>
    )
}

export default RiskAssessmentDisplay