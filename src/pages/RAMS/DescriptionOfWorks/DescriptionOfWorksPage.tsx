import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import getExpiryColor from "../../../components/ui/ExpiryDateLabel/getExpiryColor";
import Label from "../../../components/ui/General/Label/Label";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import { AssociatedHazardousSubstanceCollectionResponse, AssociatedHazardousSubstanceResponseData } from "../../../types/associatedHazardousSubstances.types";
import { DescriptionOfWorksResponseData } from "../../../types/descriptionOfWorks.types";
import { HazardousSubstanceCollectionResponse, HazardousSubstanceResponseData } from "../../../types/hazardousSubstance.types";
import { PersonnelProtectiveEquipmentCollectionResponse, PersonnelProtectiveEquipmentResponseData } from "../../../types/personnelProtectiveEquipment.types";
import { RequiredPersonnelProtectiveEquipmentCollectionResponse } from "../../../types/requiredPersonnelProtectiveEquipment.types";
import { RiskAssessmentCollectionResponse, RiskAssessmentResponseData } from "../../../types/riskAssessment.types";
import { RiskAssessmentAttachmentCollectionResponse, RiskAssessmentAttachmentResponseData } from "../../../types/riskAssessmentAttachment.types";
import { UserResponseData } from "../../../types/user.types";
import getAPI from "../../../utils/getAPI";
import getRiskAssessmentReviewStatusIcon from "../RiskAssessments/utils/getRiskAssessmentReviewStatusIcon";
import getRiskAssessmentReviewStatusTitle from "../RiskAssessments/utils/getRiskAssessmentReviewStatusTitle";
import DescriptionOfWorksInformation from "./components/DescriptionOfWorksInformation";
import DescriptionOfWorksSideBar from "./components/DescriptionOfWorksSideBar";
import DescriptionOfWorksInformationSkeleton from "./DescriptionOfWorksInformationSkeleton";

const DescriptionOfWorksPage = () => {
    const { descriptionOfWorksID } = useParams();

    const [isDescriptionOfWorksLoading, setIsDescriptionOfWorksLoading] = useState(true);
    const [descriptionOfWorksData, setDescriptionOfWorksData] = useState<DescriptionOfWorksResponseData>();
    const [isCreatedByUserLoading, setIsCreatedByUserLoading] = useState(false);
    const [createdByUserData, setCreatedByUserData] = useState<UserResponseData>();
    const [isRiskAssessmentAttachmentsLoading, setIsRiskAssessmentAttachmentsLoading] = useState(true);
    const [riskAssessmentAttachmentData, setRiskAssessmentAttachmentData] = useState<Array<RiskAssessmentAttachmentResponseData>>([]);
    const [isRiskAssessmentLoading, setIsRiskAssessmentLoading] = useState(false);
    const [riskAssessmentData, setRiskAssessmentData] = useState<Array<RiskAssessmentResponseData>>([]);
    const [isRequiredPPELoading, setIsRequiredPPELoading] = useState(false);
    const [isPPELoading, setIsPPELoading] = useState(false);
    const [personnelProtectiveEquipmentData, setPersonnelProtectiveEquipmentData] = useState<Array<PersonnelProtectiveEquipmentResponseData>>([]);
    const [isAssociatedHazardousSubstancesLoading, setIsAssociatedHazardousSubstancesLoading] = useState(false);
    const [associatedHazardousSubstancesData, setAssociatedHazardousSubstancesData] = useState<Array<AssociatedHazardousSubstanceResponseData>>([]);
    const [isHazardousSubstancesLoading, setIsHazardousSubstancesLoading] = useState(false);
    const [hazardousSubstancesData, setHazardousSubstancesData] = useState<Array<HazardousSubstanceResponseData>>([]);

    useEffect(() => {
        getDescriptionOfWorks();
        getRiskAssessmentAttachments();
    }, [descriptionOfWorksID]);

    const getDescriptionOfWorks = () => {
        getAPI(`description_of_works/${descriptionOfWorksID}`, {}, (response: any) => {
            const descriptionOfWorksData: DescriptionOfWorksResponseData = response.data;
            setDescriptionOfWorksData(descriptionOfWorksData);
            getCreatedByUser(descriptionOfWorksData.data.created_by_id)
        }, setIsDescriptionOfWorksLoading)
    }

    const getCreatedByUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setCreatedByUserData(userData);
        }, setIsCreatedByUserLoading)
    }

    const getRiskAssessmentAttachments = () => {
        getAPI(`risk_assessment_attachments`, {
            description_of_works_ids: [descriptionOfWorksID]
        }, (response: any) => {
            const riskAssessmentAttachmentData: RiskAssessmentAttachmentCollectionResponse = response.data;
            if (riskAssessmentAttachmentData.data.length > 0) {
                setRiskAssessmentAttachmentData(riskAssessmentAttachmentData.data);
                getRiskAssessments([...new Set(riskAssessmentAttachmentData.data.map(riskAssessmentAttachment => riskAssessmentAttachment.data.risk_assessment_id))]);
            } else {
                setRiskAssessmentData([]);
            }
        }, setIsRiskAssessmentAttachmentsLoading)
    }

    const getRiskAssessments = (riskAssessmentIDs: Array<number>) => {
        getAPI('risk_assessments', {
            ids: riskAssessmentIDs
        }, (response: any) => {
            const riskAssessmentsData: RiskAssessmentCollectionResponse = response.data;
            setRiskAssessmentData(riskAssessmentsData.data);
            if (riskAssessmentsData.data.length > 0) {
                getRequiredPPE([...new Set(riskAssessmentsData.data.map(riskAssessment => riskAssessment.id))]);
                getAssociatedHazardousSubstances([...new Set(riskAssessmentsData.data.map(riskAssessment => riskAssessment.id))]);
            }
        }, setIsRiskAssessmentLoading)
    }

    const getRequiredPPE = (riskAssessmentIDs: Array<number>) => {
        getAPI(`required_personnel_protective_equipment`, {
            risk_assessment_ids: riskAssessmentIDs
        }, (response: any) => {
            const requiredPPE: RequiredPersonnelProtectiveEquipmentCollectionResponse = response.data;
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

    const getAssociatedHazardousSubstances = (riskAssessmentIDs: Array<number>) => {
        getAPI(`associated_hazardous_substances`, {
            risk_assessment_ids: riskAssessmentIDs
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


    const isLoading = (
        isDescriptionOfWorksLoading || 
        isRiskAssessmentAttachmentsLoading || 
        isRiskAssessmentLoading || 
        isRequiredPPELoading || 
        isPPELoading ||
        isAssociatedHazardousSubstancesLoading || 
        isHazardousSubstancesLoading
    )

    const isHeaderLoading = (
        isDescriptionOfWorksLoading || 
        isCreatedByUserLoading
    )

    return (
        <>
            <OuterContainer
                title='Description of Works'
                id={descriptionOfWorksID}
                headerContent={!isHeaderLoading && descriptionOfWorksData ? 
                    <div className='flex'>
                        {!descriptionOfWorksData.data.is_active ? <InactiveLabel/> : null}
                        {descriptionOfWorksData.data.next_review_at ? <Label
                            iconFont={getRiskAssessmentReviewStatusIcon(descriptionOfWorksData.data.next_review_at)}
                            color={getExpiryColor(descriptionOfWorksData.data.next_review_at)}
                            text={`Review ${getRiskAssessmentReviewStatusTitle(descriptionOfWorksData.data.next_review_at)}`}
                        /> : null}
                    </div> :
                    <Skeleton type="label"/>
                }
                maxWidth={1050}
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && descriptionOfWorksData ? 
                            <DescriptionOfWorksInformation
                                descriptionOfWorks={descriptionOfWorksData}
                                riskAssessments={riskAssessmentData}
                                personnelProtectiveEquipment={personnelProtectiveEquipmentData}
                                hazardousSubstances={hazardousSubstancesData}
                            />                                
                            :
                            <DescriptionOfWorksInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <DescriptionOfWorksSideBar 
                            descriptionOfWorksData={descriptionOfWorksData}         
                            setDescriptionOfWorksData={setDescriptionOfWorksData}            
                            riskAssessmentAttachmentIDs={riskAssessmentAttachmentData.map(riskAssessmentAttachment => riskAssessmentAttachment.data.risk_assessment_id)}
                            riskAssessmentAttachments={riskAssessmentAttachmentData}
                            getRiskAssessmentAttachments={getRiskAssessmentAttachments}
                        /> 
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default DescriptionOfWorksPage