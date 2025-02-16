import MarkdownDisplay from "../../../../components/form/MarkdownEditor/components/MarkdownDisplay"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import { RiskAssessmentTemplateResponseData } from "../../../../types/riskAssessmentTemplate.types"
import { TemplateFooterResponseData } from "../../../../types/templateFooter.types"
import { TemplateHeaderResponseData } from "../../../../types/templateHeader.types"
import { CodeSnippet } from "../../../../utils/getAllCodeSnippets"
import getHeaderJustifyContent from "../../../../utils/getHeaderJustifyContent"
import replaceCodeSnippetsWithValues from "../../../../utils/replaceCodeSnippetsWithValues"
import InactiveStatus from "../../../Vehicles/VehiclePage/components/InactiveStatus"

const RiskAssessmentTemplateInformation = (props: {
    riskAssessmentTemplate: RiskAssessmentTemplateResponseData,
    templateHeader: TemplateHeaderResponseData | undefined,
    templateFooter: TemplateFooterResponseData | undefined,
    codeSnippets: Array<CodeSnippet>
}) => {
    return (
        <>
            {!props.riskAssessmentTemplate.data.is_active ? <InactiveStatus resourceName='Risk Assessment Template' inactiveDate={undefined}/> : null}
            <section>
                <h2>Risk Assessment Template Details</h2>
                <InfoGrid>
                    <GridItem title='Name'>
                        <p>{props.riskAssessmentTemplate.data.name}</p>
                    </GridItem>
                    <GridItem title='Description'>
                        <p>{props.riskAssessmentTemplate.data.description.length > 0 ? 
                            props.riskAssessmentTemplate.data.description : 'None.'
                        }</p>
                    </GridItem>
                    <GridItem title='Template'>
                        <InnerContainer>
                            {props.templateHeader ?
                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: getHeaderJustifyContent(props.templateHeader.data.alignment)
                                }}>
                                    <img 
                                        style={{
                                            maxHeight: '75px'
                                        }}
                                        src={`${process.env.REACT_APP_API_URL}/${props.templateHeader.data.image_url}?${Date.now()}`} 
                                        alt=""
                                    />
                                </div> :
                                null
                            }
                            <MarkdownDisplay markdown={replaceCodeSnippetsWithValues(props.riskAssessmentTemplate.data.content, props.codeSnippets)}/>
                            {props.templateFooter ?
                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: getHeaderJustifyContent(props.templateFooter.data.alignment)
                                }}>
                                    <img 
                                        style={{
                                            maxHeight: '75px'
                                        }}
                                        src={`${process.env.REACT_APP_API_URL}/${props.templateFooter.data.image_url}?${Date.now()}`} 
                                        alt=""
                                    />
                                </div> :
                                null
                            }
                        </InnerContainer>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default RiskAssessmentTemplateInformation