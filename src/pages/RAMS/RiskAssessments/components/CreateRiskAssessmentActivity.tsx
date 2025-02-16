import InputLabelWrap from "../../../../components/form/InputLabelWrap/InputLabelWrap"
import MarkdownEditor from "../../../../components/form/MarkdownEditor/MarkdownEditor"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import postAPI from "../../../../utils/postAPI"
import LabelIconBox from "../../../TimeGrids/TimieGridReview/components/LabelIconBox/LabelIconBox"
import { useState } from 'react'

const CreateRiskAssessmentActivity = (props: {
    riskAssessmentID: number,
    resFunc: () => void
}) => {
    const [name, setName] = useState<string>('');
    const [riskLikelihood, setRiskLikelihood] = useState<number>(1);
    const [riskSeverity, setRiskSeverity] = useState<number>(1);
    const [residualRiskLikelihood, setResidualRiskLikelihood] = useState<number>(1);
    const [residualRiskSeverity, setResidualRiskSeverity] = useState<number>(1);
    const [personAtRisk, setPersonAtRisk] = useState('');
    const [significantHazards, setSignificantHazards] = useState('');
    const [riskControlMeasures, setRiskControlMeasures] = useState('');

    const [isCreating, setIsCreating] = useState(false);

    const createActivity = () => {
        postAPI('risk_assessment_activities/create', {}, {
            risk_assessment_id: props.riskAssessmentID,
            activity_name: name,
            person_at_risk: personAtRisk,
            significant_hazards: significantHazards,
            risk_likelihood: riskLikelihood,
            risk_severity: riskSeverity,
            risk_control_measures: riskControlMeasures,
            residual_risk_likelihood: residualRiskLikelihood,
            residual_risk_severity: residualRiskSeverity
        }, props.resFunc, setIsCreating)
    }

    const canCreate = (
        (riskLikelihood >= 1 && riskLikelihood <= 5) &&
        (riskSeverity >= 1 && riskSeverity <= 5) &&
        (residualRiskLikelihood >= 1 && residualRiskLikelihood <= 5) &&
        (residualRiskSeverity >= 1 && residualRiskSeverity <= 5) && 
        personAtRisk.length > 0 && 
        significantHazards.length > 0 &&
        riskControlMeasures.length > 0
    );

    return (
        <>
            <InfoGrid>
                <GridItem title='Activity Name'>
                    <input 
                        type="text" 
                        placeholder="Name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Person at Risk' span={3}>
                    <MarkdownEditor 
                        content={personAtRisk} 
                        setter={setPersonAtRisk}                    
                        minRows={3} 
                    />
                </GridItem>
                <GridItem title='Significant Hazards' span={3}>
                    <MarkdownEditor 
                        content={significantHazards} 
                        setter={setSignificantHazards}                    
                        minRows={3}
                    />
                </GridItem>
                <GridItem title='Risk'>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr 1fr',
                    }}>
                        <LabelIconBox
                            label='Likelihood'
                            text={
                                <InputLabelWrap maxWidth={75} suffix='/5'>
                                    <input 
                                        type="number" 
                                        value={riskLikelihood}
                                        onChange={(e) => setRiskLikelihood(parseInt(e.target.value))}
                                    />
                                </InputLabelWrap>
                            }
                            icon='casino'
                        />
                    <LabelIconBox
                            label='Severity'
                            text={
                                <InputLabelWrap maxWidth={75} suffix='/5'>
                                    <input 
                                        type="number" 
                                        value={riskSeverity}
                                        onChange={(e) => setRiskSeverity(parseInt(e.target.value))}
                                    />
                                </InputLabelWrap>
                            }
                            icon='running_with_errors'
                        />
                        <LabelIconBox
                            label='Degree of Risk'
                            text={riskLikelihood * riskSeverity}
                            icon='warning'
                            suffix='/25'

                        />
                    </div>
                </GridItem>
                <GridItem title='Risk Control Measures'>
                    <MarkdownEditor 
                        content={riskControlMeasures} 
                        setter={setRiskControlMeasures}                    
                        minRows={3}
                    />
                </GridItem>
                <GridItem title='Residual Risk'>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr 1fr',
                    }}>
                        <LabelIconBox
                            label='Likelihood'
                            text={
                                <InputLabelWrap maxWidth={75} suffix='/5'>
                                    <input 
                                        type="number" 
                                        value={residualRiskLikelihood}
                                        onChange={(e) => setResidualRiskLikelihood(parseInt(e.target.value))}
                                    />
                                </InputLabelWrap>
                            }
                            icon='casino'
                        />
                        <LabelIconBox
                            label='Severity'
                            text={
                                <InputLabelWrap maxWidth={75} suffix='/5'>
                                    <input 
                                        type="number" 
                                        value={residualRiskSeverity}
                                        onChange={(e) => setResidualRiskSeverity(parseInt(e.target.value))}
                                    />
                                </InputLabelWrap>
                            }
                            icon='running_with_errors'
                        />
                        <LabelIconBox
                            label='Degree of Risk'
                            text={residualRiskLikelihood * residualRiskSeverity}
                            icon='warning'
                            suffix='/25'
                        />
                    </div>
                </GridItem>
            </InfoGrid>
            <ContainerFooter>
                <SubmitButton
                    text='Create Activity'
                    disabled={!canCreate}
                    clickFunc={createActivity}
                    submitting={isCreating}
                    submittingText="Creating..."
                />
            </ContainerFooter>
        </>
    )
}

export default CreateRiskAssessmentActivity