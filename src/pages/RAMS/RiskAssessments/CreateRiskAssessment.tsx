import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import DepartmentLabel from "../../../components/ui/Department/DepartmentLabel";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import Header from "../../../components/ui/Structure/Header/Header";
import { DepartmentResponseData, DepartmentCollectionResponse } from "../../../types/department.types";
import { RiskAssessmentResponseData } from "../../../types/riskAssessment.types";
import getAPI from "../../../utils/getAPI";
import postAPI from "../../../utils/postAPI";

const CreateRiskAssessment = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const createRiskAssessment = () => {
        postAPI('risk_assessments/create', {}, {
            name: name,
        }, (response: any) => {
            const riskAssessmentData: RiskAssessmentResponseData = response.data;
            navigate(`../${riskAssessmentData.id}`)
        }, setIsSubmitting)
    }

    const isDisabled = !(name.length > 0) 

    const getPageDescription = () => {
        return 'Create a risk assessment'
    }

    return (
        <>
            <Header
                links={[
                    {
                        to: 'rams',
                        text: 'RAMS'
                    },
                    {
                        to: 'risk_assessments',
                        text: 'Risk Assessments'
                    },
                    {
                        to: 'create',
                        text: 'Create'
                    }
                ]}
            />
            <OuterContainer
                title='Create Risk Assessment'
                headerContent={getPageDescription()}
                stickyHeaderContent={<p style={{ fontSize: '0.85em' }}>{getPageDescription()}</p>}
                maxWidth={600}
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <InfoGrid>
                            <GridItem title='Name'>
                                <input
                                    type='text'
                                    placeholder='Name...'
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                />
                            </GridItem>
                        </InfoGrid>
                        <ContainerFooter>
                            <SubmitButton
                                text='Create Risk Assessment' 
                                submitting={isSubmitting}
                                submittingText='Creating...'
                                disabled={isDisabled}
                                clickFunc={createRiskAssessment}                            
                            />
                        </ContainerFooter>
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default CreateRiskAssessment