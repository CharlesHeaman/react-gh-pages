import ReactMarkdown from "react-markdown"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import ListWrapper from "../../../../components/ui/Containers/ListWrapper/ListWrapper"
import getExpiryColor from "../../../../components/ui/ExpiryDateLabel/getExpiryColor"
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import { DescriptionOfWorksResponseData } from "../../../../types/descriptionOfWorks.types"
import { RiskAssessmentResponseData } from "../../../../types/riskAssessment.types"
import RiskAssessmentRow from "../../RiskAssessments/components/RiskAssessmentRow"
import getRiskAssessmentReviewStatusDescription from "../../RiskAssessments/utils/getRiskAssessmentReviewStatusDescription"
import getRiskAssessmentReviewStatusIcon from "../../RiskAssessments/utils/getRiskAssessmentReviewStatusIcon"
import getRiskAssessmentReviewStatusTitle from "../../RiskAssessments/utils/getRiskAssessmentReviewStatusTitle"
import { PersonnelProtectiveEquipmentResponseData } from "../../../../types/personnelProtectiveEquipment.types"
import ListItem from "../../../../components/ui/Containers/ListItem/ListItem"
import { HazardousSubstanceResponseData } from "../../../../types/hazardousSubstance.types"

const DescriptionOfWorksInformation = (props: {
    descriptionOfWorks: DescriptionOfWorksResponseData,
    riskAssessments: Array<RiskAssessmentResponseData>,
    personnelProtectiveEquipment: Array<PersonnelProtectiveEquipmentResponseData>,
    hazardousSubstances: Array<HazardousSubstanceResponseData>,
}) => {
    return ( 
        <>
            {props.descriptionOfWorks.data.next_review_at ? 
                <section>
                    <InnerContainer color={getExpiryColor(props.descriptionOfWorks.data.next_review_at)}>
                        <IconTitleText
                            iconFont={getRiskAssessmentReviewStatusIcon(props.descriptionOfWorks.data.next_review_at)}
                            title={`Risk Assessment Review ${getRiskAssessmentReviewStatusTitle(props.descriptionOfWorks.data.next_review_at)}`}
                            color={getExpiryColor(props.descriptionOfWorks.data.next_review_at)}
                            text={getRiskAssessmentReviewStatusDescription(props.descriptionOfWorks.data.next_review_at)}
                        />
                    </InnerContainer>
                </section>
                : null
            }
            <section>
                <h2>Description of Works Details</h2>
                <InfoGrid>
                    <GridItem title='Name'>
                        <p>{props.descriptionOfWorks.data.name}</p>
                    </GridItem>
                    <GridItem title='Description'>
                        <p>{props.descriptionOfWorks.data.description}</p>
                    </GridItem>
                </InfoGrid> 
            </section>
            <hr/>
            <section>
                <h2>Sequence of Operations</h2>
                <InfoGrid>
                    <GridItem>
                        <InnerContainer>
                            {props.descriptionOfWorks.data.sequence_of_operations.length > 0 ?
                                <ReactMarkdown>{props.descriptionOfWorks.data.sequence_of_operations}</ReactMarkdown> 
                                : 
                                <NoneFound 
                                    iconFont={"subject"} 
                                    text={"No sequence of operations found."}
                                    small
                                />
                            }
                        </InnerContainer> 
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <h2>Associated Risk Assessments</h2>
                {props.riskAssessments.length > 0 ?
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Next Review</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.riskAssessments.map((riskAssessment, index) => 
                                    <RiskAssessmentRow 
                                        riskAssessment={riskAssessment}
                                        key={index}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div> :
                    <InnerContainer>
                        <NoneFound
                            iconFont="assignment_late"
                            text='No risk assessments found.'
                            small
                        />
                    </InnerContainer>
                }
            </section>
            <hr/>
            <section>
                <h2>Required Personnel Protective Equipment</h2>
                {props.personnelProtectiveEquipment.length > 0 ?
                    <ListWrapper>
                        {props.personnelProtectiveEquipment.map((personnelProtectiveEquipment, index) => 
                            <ListItem
                                clickFunc={() => null }
                                key={index}
                                noClick
                            >
                                <img style={{ maxHeight: '75px', marginRight: 'var(--small-gap)'}} src={`${process.env.REACT_APP_API_URL}/${personnelProtectiveEquipment.data.image_url}`} alt=''/>
                                <h3>{personnelProtectiveEquipment.data.name}</h3>
                            </ListItem>
                        )} 
                    </ListWrapper> :
                    <InnerContainer>
                        <NoneFound
                            iconFont="masks"
                            text='No personnel protective equipment found.'
                            small
                        />
                    </InnerContainer>
                }
            </section>
            <hr/>
            <section>
                <h2>Hazardous Substances</h2>
                {props.hazardousSubstances.length > 0 ?
                    <ListWrapper>
                        {props.hazardousSubstances.map((hazardousSubstances, index) => 
                            <ListItem
                                clickFunc={() => null }
                                key={index}
                                noClick
                            >
                                <img style={{ maxHeight: '75px', marginRight: 'var(--small-gap)'}} src={`${process.env.REACT_APP_API_URL}/${hazardousSubstances.data.image_url}`} alt=''/>
                                <h3>{hazardousSubstances.data.name}</h3>
                            </ListItem>
                        )} 
                    </ListWrapper> :
                    <InnerContainer>
                        <NoneFound
                            iconFont="report_problem"
                            text='No hazardous substances found.'
                            small
                        />
                    </InnerContainer>
                }
            </section>
        </>
    )
}

export default DescriptionOfWorksInformation