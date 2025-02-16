import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import MarkdownDisplay from "../../components/form/MarkdownEditor/components/MarkdownDisplay";
import { AssociatedHazardousSubstanceCollectionResponse } from "../../types/associatedHazardousSubstances.types";
import { HazardousSubstanceCollectionResponse } from "../../types/hazardousSubstance.types";
import { PersonnelProtectiveEquipmentCollectionResponse } from "../../types/personnelProtectiveEquipment.types";
import { RequiredPersonnelProtectiveEquipmentCollectionResponse } from "../../types/requiredPersonnelProtectiveEquipment.types";
import { RiskAssessmentResponseData } from "../../types/riskAssessment.types";
import { RiskAssessmentActivityCollectionResponse } from "../../types/riskAssessmentActivity.types";
import { RiskAssessmentTemplateCollectionResponse, RiskAssessmentTemplateResponseData } from "../../types/riskAssessmentTemplate.types";
import getAllCodeSnippets, { CodeSnippet } from "../../utils/getAllCodeSnippets";
import getAPI from "../../utils/getAPI";
import replaceCodeSnippetsWithValues from "../../utils/replaceCodeSnippetsWithValues";

const GenerateRiskAssessmentPage = () => {
    const { riskAssessmentID } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isRiskAssessmentTemplateLoading, setIsRiskAssessmentTemplateLoading] = useState(true);
    const [riskAssessmentTemplateData, setRiskAssessmentTemplateData] = useState<RiskAssessmentTemplateResponseData>();
    const [isRiskAssessmentActivitiesLoading, setIsRiskAssessmentActivitiesLoading] = useState(true);
    const [isRequiredPPELoading, setIsRequiredPPELoading] = useState(true);
    const [isPPELoading, setIsPPELoading] = useState(false);
    const [isRiskAssessmentLoading, setIsRiskAssessmentLoading] = useState(false);
    const [isAssociatedHazardousSubstancesLoading, setIsAssociatedHazardousSubstancesLoading] = useState(true);
    const [isHazardousSubstancesLoading, setIsHazardousSubstancesLoading] = useState(false);


    const [codeSnippets, setCodeSnippets] = useState<Array<CodeSnippet>>([]);
    const [associatedSnippetData, setAssociatedSnippetData] = useState({});

    useEffect(() => {
        getRiskAssessment();
        getRiskAssessmentActivities();
        getRequiredPPE();
        getAssociatedHazardousSubstances();
    }, [riskAssessmentID]);

    useEffect(() => {
        riskAssessmentTemplateData && setCodeSnippets(getAllCodeSnippets(riskAssessmentTemplateData.data.content, associatedSnippetData))
    }, [riskAssessmentTemplateData, associatedSnippetData])

    const getRiskAssessment = () => {
        getAPI(`risk_assessments/${riskAssessmentID}`, {}, (response: any) => {
            const riskAssessmentData: RiskAssessmentResponseData = response.data;
            setAssociatedSnippetData(associatedSnippetData => {
                return {
                    ...associatedSnippetData,
                    riskAssessment: riskAssessmentData
                }
            })
            const riskAssessmentTemplateID = riskAssessmentData.data.risk_assessment_template_id;
            if (riskAssessmentTemplateID) {
                getRiskAssessmentTemplate(riskAssessmentTemplateID);
            } else {
                getDefaultRiskAssessmentTemplate();
            }
        }, setIsRiskAssessmentLoading)
    }

    const getRiskAssessmentTemplate = (riskAssessmentTemplateID: number) => {
        getAPI(`risk_assessment_templates/${riskAssessmentTemplateID}`, {}, (response: any) => {
            const templateData: RiskAssessmentTemplateResponseData = response.data;
            setRiskAssessmentTemplateData(templateData);
        }, setIsRiskAssessmentTemplateLoading)
    }

    const getDefaultRiskAssessmentTemplate = () => {
        getAPI(`risk_assessment_templates`, {
            is_default: true
        }, (response: any) => {
            const templateData: RiskAssessmentTemplateCollectionResponse = response.data;
            if (templateData.data.length > 0) {
                const currentTemplateData = templateData.data[0];
                setRiskAssessmentTemplateData(currentTemplateData);
            }
        }, setIsRiskAssessmentTemplateLoading)
    }

    const getRiskAssessmentActivities = () => {
        getAPI(`risk_assessment_activities`, {
            risk_assessment_ids: [riskAssessmentID]
        }, (response: any) => {
            const riskAssessmentActivityData: RiskAssessmentActivityCollectionResponse = response.data;
            setAssociatedSnippetData(associatedSnippetData => {
                return {
                   ...associatedSnippetData,
                    riskAssessmentActivities: riskAssessmentActivityData.data
                }
            })
        }, setIsRiskAssessmentActivitiesLoading)
    }

    const getRequiredPPE = () => {
        getAPI(`required_personnel_protective_equipment`, {
            risk_assessment_ids: [riskAssessmentID]
        }, (response: any) => {
            const requiredPPE: RequiredPersonnelProtectiveEquipmentCollectionResponse = response.data;
            getPersonnelProtectiveEquipment([...new Set(requiredPPE.data.map(requiredPPE => requiredPPE.data.personnel_protective_equipment))]);
        }, setIsRequiredPPELoading)
    }

    const getPersonnelProtectiveEquipment = (requiredPPEIDs: Array<number>) => {
        getAPI(`personnel_protective_equipment`, {}, (response: any) => {
            const personnelProtectiveEquipmentData: PersonnelProtectiveEquipmentCollectionResponse = response.data;
            const ppeData = personnelProtectiveEquipmentData.data.map(ppe => {
                return {
                    ...ppe,
                    data: {
                        ...ppe.data,
                        required: requiredPPEIDs.includes(ppe.id)
                    }
                }
            })
            setAssociatedSnippetData(associatedSnippetData => {
                return {
                    ...associatedSnippetData,
                    personnelProtectiveEquipment: ppeData
                }
            })
        }, setIsPPELoading)
    }

    const getAssociatedHazardousSubstances = () => {
        getAPI(`associated_hazardous_substances`, {
            risk_assessment_ids: [riskAssessmentID]
        }, (response: any) => {
            const associatedHazardousSubstancesData: AssociatedHazardousSubstanceCollectionResponse = response.data;
            getHazardousSubstances([...new Set(associatedHazardousSubstancesData.data.map(hazardousSubstance => hazardousSubstance.data.hazardous_substance_id))]);
        }, setIsAssociatedHazardousSubstancesLoading)
    }

    const getHazardousSubstances = (hazardousSubstancesID: Array<number>) => {
        getAPI(`hazardous_substances`, {}, (response: any) => {
            const hazardousSubstanceData: HazardousSubstanceCollectionResponse = response.data;
            const hazardousSubstanceFormatted = hazardousSubstanceData.data.map(hazardousSubstance => {
                return {
                    ...hazardousSubstance,
                    data: {
                        ...hazardousSubstance.data,
                        required: hazardousSubstancesID.includes(hazardousSubstance.id)
                    }
                }
            })
            setAssociatedSnippetData(associatedSnippetData => {
                return {
                    ...associatedSnippetData,
                    hazardousSubstances: hazardousSubstanceFormatted
                }
            })
        }, setIsHazardousSubstancesLoading)
    }

    const isLoading = () => {
        return (
            isRiskAssessmentTemplateLoading
        )
    }    

    return (
        !isLoading() && riskAssessmentTemplateData ?
            <MarkdownDisplay 
                markdown={replaceCodeSnippetsWithValues(riskAssessmentTemplateData.data.content, codeSnippets)}
                isPrint
            />
            :
            null
        
    )
}

export default GenerateRiskAssessmentPage