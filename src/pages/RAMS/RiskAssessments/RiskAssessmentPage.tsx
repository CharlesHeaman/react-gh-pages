import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MarkdownDisplay from "../../../components/form/MarkdownEditor/components/MarkdownDisplay";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer";
import ListItem from "../../../components/ui/Containers/ListItem/ListItem";
import ListWrapper from "../../../components/ui/Containers/ListWrapper/ListWrapper";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import getExpiryColor from "../../../components/ui/ExpiryDateLabel/getExpiryColor";
import Label from "../../../components/ui/General/Label/Label";
import NoneFound from "../../../components/ui/General/NoneFound/NoneFound";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import IconTitleText from "../../../components/ui/IconTitleText/IconTitleText";
import { AssociatedHazardousSubstanceCollectionResponse, AssociatedHazardousSubstanceResponseData } from "../../../types/associatedHazardousSubstances.types";
import { HazardousSubstanceCollectionResponse, HazardousSubstanceResponseData } from "../../../types/hazardousSubstance.types";
import { PersonnelProtectiveEquipmentCollectionResponse, PersonnelProtectiveEquipmentResponseData } from "../../../types/personnelProtectiveEquipment.types";
import { RequiredPersonnelProtectiveEquipmentCollectionResponse, RequiredPersonnelProtectiveEquipmentResponseData } from "../../../types/requiredPersonnelProtectiveEquipment.types";
import { RiskAssessmentResponseData } from "../../../types/riskAssessment.types";
import { RiskAssessmentActivityCollectionResponse, RiskAssessmentActivityResponseData } from "../../../types/riskAssessmentActivity.types";
import { RiskAssessmentTemplateCollectionResponse, RiskAssessmentTemplateResponseData } from "../../../types/riskAssessmentTemplate.types";
import { UserResponseData } from "../../../types/user.types";
import formatDate from "../../../utils/formatDate";
import getAPI from "../../../utils/getAPI";
import getUserFullName from "../../../utils/getUserFullName";
import LabelIconBox from "../../TimeGrids/TimieGridReview/components/LabelIconBox/LabelIconBox";
import EditRiskAssessment from "./components/EditRiskAssessment";
import RiskAssessmentActions from "./components/RiskAssessmentActions";
import RiskAssessmentSideBarSkeleton from "./components/RiskAssessmentSideBarSkeleton";
import RiskAssessmentSkeleton from "./components/RiskAssessmentSkeleton";
import getRiskAssessmentReviewStatusDescription from "./utils/getRiskAssessmentReviewStatusDescription";
import getRiskAssessmentReviewStatusIcon from "./utils/getRiskAssessmentReviewStatusIcon";
import getRiskAssessmentReviewStatusTitle from "./utils/getRiskAssessmentReviewStatusTitle";

const RiskAssessmentPage = () => {
    const { riskAssessmentID } = useParams();
    const navigate = useNavigate();

    const [isEditMode, setIsEditMode] = useState(false);

    const [isRiskAssessmentsLoading, setIsRiskAssessmentsLoading] = useState(true);
    const [riskAssessmentData, setRiskAssessmentData] = useState<RiskAssessmentResponseData>();
    const [isCreatedByUserLoading, setIsCreatedByUserLoading] = useState(false);
    const [createdByUserData, setCreatedByUserData] = useState<UserResponseData>();
    const [isRequiredPPELoading, setIsRequiredPPELoading] = useState(true);
    const [isPPELoading, setIsPPELoading] = useState(false);
    const [requiredPPEData, setRequiredPPEData] = useState<Array<RequiredPersonnelProtectiveEquipmentResponseData>>([]);
    const [personnelProtectiveEquipmentData, setPersonnelProtectiveEquipmentData] = useState<Array<PersonnelProtectiveEquipmentResponseData>>([]);
    const [isRiskAssessmentActivitiesLoading, setIsRiskAssessmentActivitiesLoading] = useState(true);
    const [riskAssessmentActivityData, setRiskAssessmentActivityData] = useState<Array<RiskAssessmentActivityResponseData>>([]);
    const [isAssociatedHazardousSubstancesLoading, setIsAssociatedHazardousSubstancesLoading] = useState(true);
    const [associatedHazardousSubstancesData, setAssociatedHazardousSubstancesData] = useState<Array<AssociatedHazardousSubstanceResponseData>>([]);
    const [isHazardousSubstancesLoading, setIsHazardousSubstancesLoading] = useState(false);
    const [hazardousSubstancesData, setHazardousSubstancesData] = useState<Array<HazardousSubstanceResponseData>>([]);
    const [isRiskAssessmentTemplateLoading, setIsRiskAssessmentTemplateLoading] = useState(true);
    const [riskAssessmentTemplateData, setRiskAssessmentTemplateData] = useState<RiskAssessmentTemplateResponseData>();

    useEffect(() => {
        getRiskAssessment();
        getRequiredPPE();
        getRiskAssessmentActivities();
        getAssociatedHazardousSubstances();
    }, [riskAssessmentID])

    const getRiskAssessment = () => {
        getAPI(`risk_assessments/${riskAssessmentID}`, {}, (response: any) => {
            const riskAssessmentsData: RiskAssessmentResponseData = response.data;
            setRiskAssessmentData(riskAssessmentsData);
            getCreatedByUser(riskAssessmentsData.data.created_by_id)
            const riskAssessmentTemplateID = riskAssessmentsData.data.risk_assessment_template_id;
            if (riskAssessmentTemplateID) {
                getRiskAssessmentTemplate(riskAssessmentTemplateID);
            } else {
                getDefaultRiskAssessmentTemplate();
            }
        }, setIsRiskAssessmentsLoading)
    }

    const getRiskAssessmentTemplate = (riskAssessmentTemplateID: number) => {
        getAPI(`risk_assessment_templates/${riskAssessmentTemplateID}`, {}, (response: any) => {
            const riskAssessmentTemplatesData: RiskAssessmentTemplateResponseData = response.data;
            setRiskAssessmentTemplateData(riskAssessmentTemplatesData);
        }, setIsRiskAssessmentTemplateLoading)
    }
    
    const getDefaultRiskAssessmentTemplate = () => {
        getAPI(`risk_assessment_templates`, {
            is_default: true
        }, (response: any) => {
            const riskAssessmentTemplates: RiskAssessmentTemplateCollectionResponse = response.data;
            if (riskAssessmentTemplates.data.length > 0)
            setRiskAssessmentTemplateData(riskAssessmentTemplates.data[0]);
        }, setIsRiskAssessmentTemplateLoading)
    }

    const getRiskAssessmentActivities = () => {
        getAPI(`risk_assessment_activities`, {
            risk_assessment_ids: [riskAssessmentID]
        }, (response: any) => {
            const riskAssessmentActivityData: RiskAssessmentActivityCollectionResponse = response.data;
            setRiskAssessmentActivityData(riskAssessmentActivityData.data);
        }, setIsRiskAssessmentActivitiesLoading)
    }

    const getRequiredPPE = () => {
        getAPI(`required_personnel_protective_equipment`, {
            risk_assessment_ids: [riskAssessmentID]
        }, (response: any) => {
            const requiredPPE: RequiredPersonnelProtectiveEquipmentCollectionResponse = response.data;
            setRequiredPPEData(requiredPPE.data);
            if (requiredPPE.data.length > 0) {
                getPersonnelProtectiveEquipment([...new Set(requiredPPE.data.map(requiredPPE => requiredPPE.data.personnel_protective_equipment))]);
            } else {
                setPersonnelProtectiveEquipmentData([]);
            }
        }, setIsRequiredPPELoading)
    }

    const getPersonnelProtectiveEquipment = (ppeIDs: Array<number>) => {
        getAPI(`personnel_protective_equipment`, {
            ids: ppeIDs
        }, (response: any) => {
            const personnelProtectiveEquipmentData: PersonnelProtectiveEquipmentCollectionResponse = response.data;
            setPersonnelProtectiveEquipmentData(personnelProtectiveEquipmentData.data);
        }, setIsPPELoading)
    }

    const getAssociatedHazardousSubstances = () => {
        getAPI(`associated_hazardous_substances`, {
            risk_assessment_ids: [riskAssessmentID]
        }, (response: any) => {
            const associatedHazardousSubstancesData: AssociatedHazardousSubstanceCollectionResponse = response.data;
            setAssociatedHazardousSubstancesData(associatedHazardousSubstancesData.data);
            if (associatedHazardousSubstancesData.data.length > 0) {
                getHazardousSubstances([...new Set(associatedHazardousSubstancesData.data.map(hazardousSubstance => hazardousSubstance.data.hazardous_substance_id))]);
            } else {
                setHazardousSubstancesData([]);
            }
        }, setIsAssociatedHazardousSubstancesLoading)
    }

    const getHazardousSubstances = (hazardousSubstancesID: Array<number>) => {
        getAPI(`hazardous_substances`, {
            ids: hazardousSubstancesID
        }, (response: any) => {
            const hazardousSubstanceData: HazardousSubstanceCollectionResponse = response.data;
            setHazardousSubstancesData(hazardousSubstanceData.data);
        }, setIsHazardousSubstancesLoading)
    }

    const getCreatedByUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setCreatedByUserData(userData);
        }, setIsCreatedByUserLoading)
    }

    const isLoading = () => {
        return (
            isRiskAssessmentsLoading || 
            isRequiredPPELoading ||
            isPPELoading || 
            isRiskAssessmentActivitiesLoading || 
            isAssociatedHazardousSubstancesLoading || 
            isHazardousSubstancesLoading || 
            isRiskAssessmentTemplateLoading
        )
    }

    const isHeaderLoading = () => {
        return (
            isRiskAssessmentsLoading || 
            isCreatedByUserLoading
        )
    }

    const isInactive = (riskAssessmentData && !riskAssessmentData.data.is_active) === true;

    const headerText = riskAssessmentData && createdByUserData && `Created by ${getUserFullName(createdByUserData)} on ${formatDate(riskAssessmentData.data.created_at)}`;

    
    return (
        <>
            <OuterContainer
                title='Risk Assessment'
                id={riskAssessmentID}
                headerContent={!isHeaderLoading() ? 
                    <div className='flex'>
                        {isInactive && <Label 
                            text='Inactive'
                            iconFont="highlight_off"
                            color="grey"
                        />}
                        <p>{headerText}</p>
                    </div> :
                    <Skeleton type="text" width={300}/>
                }
                maxWidth={1050}
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading() && riskAssessmentData ? 
                            !isEditMode ? 
                                <>
                                    <section>
                                        <h2><span style={{ color: 'var(--grey-text-color)'}}>Name:</span> {riskAssessmentData.data.name}</h2>
                                        <InfoGrid>
                                            {riskAssessmentData.data.next_review_at ? 
                                                <GridItem>
                                                    <InnerContainer color={getExpiryColor(riskAssessmentData.data.next_review_at)}>
                                                        <IconTitleText
                                                            iconFont={getRiskAssessmentReviewStatusIcon(riskAssessmentData.data.next_review_at)}
                                                            title={getRiskAssessmentReviewStatusTitle(riskAssessmentData.data.next_review_at)}
                                                            color={getExpiryColor(riskAssessmentData.data.next_review_at)}
                                                            text={getRiskAssessmentReviewStatusDescription(riskAssessmentData.data.next_review_at)}
                                                        />
                                                    </InnerContainer>
                                                </GridItem> : null
                                            }
                                        </InfoGrid>
                                    </section>
                                    <hr/>
                                    <section>
                                        <h2>Risk Assessment Activities</h2>
                                        <InfoGrid>
                                            <GridItem>
                                                <p>All associated activities for this risk assessment.</p>
                                            </GridItem>
                                            {riskAssessmentActivityData.length > 0 ? 
                                                riskAssessmentActivityData.map((activity, index) => 
                                                    <GridItem>
                                                        <InnerContainer 
                                                            title={activity.data.activity_name}
                                                            collapsible
                                                            startCollapsed
                                                            key={index}
                                                        >
                                                            <InfoGrid>
                                                                <GridItem title='Person at Risk'>
                                                                    <MarkdownDisplay markdown={activity.data.person_at_risk}/>
                                                                </GridItem>
                                                                <GridItem title='Significant Hazards'>
                                                                    <MarkdownDisplay markdown={activity.data.significant_hazards}/>
                                                                </GridItem>
                                                                <GridItem title='Risk'>
                                                                    <div style={{ 
                                                                        display: 'grid', 
                                                                        gridTemplateColumns: '1fr 1fr 1fr',
                                                                    }}>
                                                                        <LabelIconBox
                                                                            label='Likelihood'
                                                                            text={activity.data.risk_likelihood}
                                                                            icon='casino'
                                                                            suffix='/5'
                                                                        />
                                                                        <LabelIconBox
                                                                            label='Severity'
                                                                            text={activity.data.risk_severity}
                                                                            icon='running_with_errors'
                                                                            suffix='/5'
                                                                        />
                                                                        <LabelIconBox
                                                                            label='Degree of Risk'
                                                                            text={activity.data.risk_likelihood * activity.data.risk_severity}
                                                                            icon='warning'
                                                                            suffix='/25'
                                                                        />
                                                                    </div>
                                                                </GridItem>
                                                                <GridItem title='Risk Control Measures'>
                                                                    <MarkdownDisplay markdown={activity.data.risk_control_measures}/>
                                                                </GridItem>
                                                                <GridItem title='Residual Risk'>
                                                                    <div style={{ 
                                                                        display: 'grid', 
                                                                        gridTemplateColumns: '1fr 1fr 1fr',
                                                                    }}>
                                                                        <LabelIconBox
                                                                            label='Likelihood'
                                                                            text={activity.data.residual_risk_likelihood}
                                                                            icon='casino'
                                                                            suffix='/5'
                                                                        />
                                                                        <LabelIconBox
                                                                            label='Severity'
                                                                            text={activity.data.residual_risk_severity}
                                                                            icon='running_with_errors'
                                                                            suffix='/5'
                                                                        />
                                                                        <LabelIconBox
                                                                            label='Degree of Risk'
                                                                            text={activity.data.residual_risk_likelihood * activity.data.residual_risk_severity}
                                                                            icon='warning'
                                                                            suffix='/25'
                                                                        />
                                                                    </div>
                                                                </GridItem>
                                                            </InfoGrid>
                                                        </InnerContainer>
                                                    </GridItem>
                                                ) :
                                                <ListWrapper>
                                                    <NoneFound
                                                        iconFont="running_with_errors"
                                                        text='No risk assessment activities found.'
                                                        small
                                                    />
                                                </ListWrapper>
                                            }
                                        </InfoGrid>
                                    </section>
                                    <hr/>
                                    <section>
                                        <h2>Required Personnel Protective Equipment</h2>
                                        <InfoGrid>
                                            <GridItem>
                                                <p>All personnel protective equipment that is associated with this risk assessment.</p>
                                            </GridItem>
                                            <GridItem>
                                                <ListWrapper>
                                                    {personnelProtectiveEquipmentData.length > 0 ?
                                                        personnelProtectiveEquipmentData.map((personnelProtectiveEquipment, index) => 
                                                            <ListItem
                                                                clickFunc={() => navigate(`../../personnel_protective_equipment/${personnelProtectiveEquipment.id}`) }
                                                                key={index}
                                                            >
                                                                <img style={{ maxHeight: '75px', marginRight: 'var(--small-gap)'}} src={`${process.env.REACT_APP_API_URL}/${personnelProtectiveEquipment.data.image_url}`} alt=''/>
                                                                <h3>{personnelProtectiveEquipment.data.name}</h3>
                                                            </ListItem>
                                                        ) :
                                                        <NoneFound
                                                            iconFont="masks"
                                                            text='No personnel protective equipment found.'
                                                            small
                                                        />
                                                    }
                                                </ListWrapper>
                                            </GridItem>
                                        </InfoGrid>
                                    </section>
                                    <hr/>
                                    <section>
                                        <h2>Hazardous Substances</h2>
                                        <InfoGrid>
                                            <GridItem>
                                                <p>All hazardous substances associated with this risk assessment.</p>
                                            </GridItem>
                                            <GridItem>
                                                <ListWrapper>
                                                    {hazardousSubstancesData.length > 0 ?
                                                        hazardousSubstancesData.map((hazardousSubstance, index) => 
                                                            <ListItem
                                                                clickFunc={() => navigate(`../../hazardous_substances/${hazardousSubstance.id}`) }
                                                                key={index}
                                                            >
                                                                <img style={{ maxHeight: '75px', marginRight: 'var(--small-gap)'}} src={`${process.env.REACT_APP_API_URL}/${hazardousSubstance.data.image_url}`} alt=''/>
                                                                <h3>{hazardousSubstance.data.name}</h3>
                                                            </ListItem>
                                                        ) :
                                                        <NoneFound
                                                            iconFont="report_problem"
                                                            text='No hazardous substances found.'
                                                            small
                                                        />
                                                    }
                                                </ListWrapper>
                                            </GridItem>
                                        </InfoGrid>
                                    </section>
                                    <hr/>
                                    <section>
                                        <h2>Template</h2>
                                        <InfoGrid>
                                            <GridItem>
                                                <p>The template used to generate the risk assessment PDF.</p>
                                            </GridItem>
                                            <GridItem>
                                                <ListWrapper> 
                                                    {riskAssessmentTemplateData ?  
                                                        <ListItem
                                                        clickFunc={() => navigate(`/templates/risk_assessments/${riskAssessmentTemplateData.id}`) }
                                                    >
                                                        
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: 'var(--small-gap)',
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                gap: 'var(--small-gap)',
                                                                alignItems: 'center'
                                                            }}>
                                                                {riskAssessmentTemplateData.data.is_default ? <Label
                                                                    iconFont="star"
                                                                    text="Default"
                                                                    color="dark-blue"
                                                                /> : null}
                                                                <h2>{riskAssessmentTemplateData.data.name}</h2>
                                                            </div>
                                                            <p>{riskAssessmentTemplateData.data.description}</p>
                                                        </div>
                                                    </ListItem>
                                                        : 
                                                            <NoneFound
                                                                iconFont="feed"
                                                                text='No template found.'
                                                                small
                                                            />
                                                        }
                                                </ListWrapper>
                                            </GridItem>
                                        </InfoGrid>
                                    </section>
                                </> : 
                                <EditRiskAssessment
                                    riskAssessmentData={riskAssessmentData}
                                    setIsEditMode={setIsEditMode}
                                    setRiskAssessmentData={setRiskAssessmentData}
                                />
                            : 
                            <RiskAssessmentSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        {!isLoading() && riskAssessmentData ? 
                            <RiskAssessmentActions
                                riskAssessmentID={parseInt(riskAssessmentID as string)}
                                riskAssessmentData={riskAssessmentData}
                                isInactive={isInactive}
                                setRiskAssessmentData={setRiskAssessmentData}
                                isEditMode={isEditMode}
                                setIsEditMode={setIsEditMode}
                                requiredPPE={requiredPPEData}
                                requiredPPEIDs={personnelProtectiveEquipmentData.map(ppe => ppe.id)}
                                getRequiredPPE={getRequiredPPE}
                                associatedHazardousSubstances={associatedHazardousSubstancesData}
                                associatedHazardousSubstanceIDs={hazardousSubstancesData.map(hazardousSubstance => hazardousSubstance.id)}
                                getAssociatedHazardousSubstances={getAssociatedHazardousSubstances}
                                getRiskAssessmentActivities={getRiskAssessmentActivities}
                                getRiskAssessmentTemplateData={getRiskAssessmentTemplate}
                                riskAssessmentActivityData={riskAssessmentActivityData}
                            /> : 
                            <RiskAssessmentSideBarSkeleton/>
                        }
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default RiskAssessmentPage