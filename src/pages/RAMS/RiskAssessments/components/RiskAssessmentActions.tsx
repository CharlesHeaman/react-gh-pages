import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import IconButton from "../../../../components/ui/Buttons/IconButton/IconButton"
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import ListItem from "../../../../components/ui/Containers/ListItem/ListItem"
import ListWrapper from "../../../../components/ui/Containers/ListWrapper/ListWrapper"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import Label from "../../../../components/ui/General/Label/Label"
import { SelectItem } from "../../../../components/ui/SelectMenu/SelectMenu"
import SideButtonMenu from "../../../../components/ui/SideButtonMenu/SideButtonMenu"
import { AssociatedHazardousSubstanceResponseData } from "../../../../types/associatedHazardousSubstances.types"
import { HazardousSubstanceCollectionResponse } from "../../../../types/hazardousSubstance.types"
import { PersonnelProtectiveEquipmentCollectionResponse } from "../../../../types/personnelProtectiveEquipment.types"
import { RequiredPersonnelProtectiveEquipmentResponseData } from "../../../../types/requiredPersonnelProtectiveEquipment.types"
import { RiskAssessmentResponseData } from "../../../../types/riskAssessment.types"
import { RiskAssessmentActivityResponseData } from "../../../../types/riskAssessmentActivity.types"
import { RiskAssessmentTemplateCollectionResponse } from "../../../../types/riskAssessmentTemplate.types"
import deleteAPI from "../../../../utils/deleteAPI"
import getAPI from "../../../../utils/getAPI"
import postAPI from "../../../../utils/postAPI"
import putAPI from "../../../../utils/putAPI"
import CreateRiskAssessmentActivity from "./CreateRiskAssessmentActivity"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"
import ExportResource from "../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"

const RiskAssessmentActions = (props: {
    riskAssessmentID: number,
    riskAssessmentData: RiskAssessmentResponseData,
    isInactive: boolean,
    setRiskAssessmentData: Dispatch<SetStateAction<RiskAssessmentResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    requiredPPE: Array<RequiredPersonnelProtectiveEquipmentResponseData>,
    requiredPPEIDs: Array<number>,
    getRequiredPPE: () => void,
    associatedHazardousSubstances: Array<AssociatedHazardousSubstanceResponseData>,
    associatedHazardousSubstanceIDs: Array<number>,
    getAssociatedHazardousSubstances: () => void,
    getRiskAssessmentActivities: () => void,
    getRiskAssessmentTemplateData: (riskAssessmentTemplateID: number) => void,
    riskAssessmentActivityData: Array<RiskAssessmentActivityResponseData>,
}) => {
    const [showCreateActivity, setShowCreateActivity] = useState(false);

    const [showDelete, setShowDelete] = useState(false);
    const [showDeleteActivity, setShowDeleteActivity] = useState(false);
    const [showReactivate, setShowReactivate] = useState(false);
    const [showEditActivities, setShowEditActivities] = useState(false);
    const [showRecordReview, setShowRecordReview] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCreatingRequiredPPE, setIsCreatingRequiredPPE] = useState(false);
    const [isDeletingRequiredPPE, setIsDeletingRequiredPPE] = useState(false);
    const [isCreatingAssociatedHazardousSubstances, setIsCreatingAssociatedHazardousSubstances] = useState(false);
    const [isDeletingAssociatedHazardousSubstances, setIsDeletingAssociatedHazardousSubstances] = useState(false);
    const [isRiskAssessmentTemplatesLoading, setIsRiskAssessmentTemplatesLoading] = useState(true);
    const [riskAssessmentTemplateData, setRiskAssessmentTemplateData] = useState<RiskAssessmentTemplateCollectionResponse>();

    const [lastReview, setLastReview] = useState<Date>();
    const [nextReview, setNextReview] = useState<Date>();
    const [hazardousSubstancesData, setHazardousSubstancesData] = useState<HazardousSubstanceCollectionResponse>();
    const [isHazardousSubstancesLoading, setIsHazardousSubstancesLoading] = useState(true);
    const [ppeData, setPpeData] = useState<PersonnelProtectiveEquipmentCollectionResponse>();
    const [isPPELoading, setIsPPELoading] = useState(true);
    const [isUpdatingTemplate, setIsUpdatingTemplate] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentDeleteID, setCurrentDeleteID] = useState(0);

    const [selectedHazardousMaterials, setSelectedHazardousMaterials] = useState<Array<SelectItem>>([]);
    const [selectedPPE, setSelectedPPE] = useState<Array<SelectItem>>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<Array<SelectItem>>([]);

    useEffect(() => {
        getHazardousSubstances();
        getPPE();
        getRiskAssessmentTemplates();
    }, [])

    useEffect(() => {
        hazardousSubstancesData && setSelectedHazardousMaterials(hazardousSubstancesData.data.map(hazardousSubstance => {
            return {
                id: hazardousSubstance.id,
                selected: props.associatedHazardousSubstanceIDs.includes(hazardousSubstance.id),
                display: <>
                    <h3 style={{ margin: 0 }}>{hazardousSubstance.data.name}</h3>
                </>
            }
        }))
    }, [hazardousSubstancesData, props.associatedHazardousSubstanceIDs])

    useEffect(() => {
        ppeData && setSelectedPPE(ppeData.data.map(ppeData => {
            return {
                id: ppeData.id,
                selected: props.requiredPPEIDs.includes(ppeData.id),
                display: <>
                    <h3 style={{ margin: 0 }}>{ppeData.data.name}</h3>
                </>
            }
        }))
    }, [ppeData, props.requiredPPEIDs])

    useEffect(() => {
        riskAssessmentTemplateData && setSelectedTemplate(riskAssessmentTemplateData.data.map(riskAssessmentTemplate => {
            return {
                id: riskAssessmentTemplate.id,
                selected: riskAssessmentTemplate.id === props.riskAssessmentData.data.risk_assessment_template_id,
                display: <>
                    {riskAssessmentTemplate.data.is_default ? <Label text='Default' color="dark-blue"/> : ''}
                    <h3 style={{ margin: 0 }}>{riskAssessmentTemplate.data.name}</h3>
                </>
            }
        }))
    }, [riskAssessmentTemplateData, props.riskAssessmentData])

    const updateTemplate = (updatedItems: Array<SelectItem>) => {
        const selectedTemplate = updatedItems.find(selectItem => selectItem.selected);
        if (!selectedTemplate) return
        putAPI(`risk_assessments/${props.riskAssessmentID}/update`, {}, {
            risk_assessment_template_id: selectedTemplate.id
        }, (response: any) => {
            const riskAssessmentData: RiskAssessmentResponseData = response.data;
            props.setRiskAssessmentData(riskAssessmentData);
            if (riskAssessmentData.data.risk_assessment_template_id) props.getRiskAssessmentTemplateData(riskAssessmentData.data.risk_assessment_template_id)
        }, setIsUpdatingTemplate);
    }

    const updateRequiredPPE = (updatedItems: Array<SelectItem>) => {
        const createItems = updatedItems.filter(selectItem => selectItem.selected);
        const createObjects = createItems.map(ppe => {
            return {
                risk_assessment_id: props.riskAssessmentID,
                personnel_protective_equipment_id: ppe.id
            }
        })
        const deleteItems = updatedItems.filter(selectItem => !selectItem.selected);
        const deleteIDs = deleteItems.map(ppe => props.requiredPPE.find(requiredPPE => requiredPPE.data.personnel_protective_equipment === ppe.id)?.id);
        const updatedDeleteIDs = deleteIDs.filter(id => id !== undefined) as Array<number>;

        createRequiredPPE(createObjects, updatedDeleteIDs);
    }

    const createRequiredPPE = (createObjects: any, deleteIDs: Array<number>) => {
        postAPI('required_personnel_protective_equipment/create_collection', {}, {
            required_personnel_protective_equipment: createObjects
        }, () => deleteRequiredPPE(deleteIDs), setIsCreatingRequiredPPE);
    }

    const deleteRequiredPPE = (deleteIDs: Array<number>) => {
        deleteAPI('required_personnel_protective_equipment/delete_collection', {
            required_personnel_protective_equipment_ids: deleteIDs
        }, props.getRequiredPPE, setIsDeletingRequiredPPE);
    }

    const updateAssociatedHazardousSubstances = (updatedItems: Array<SelectItem>) => {
        const createItems = updatedItems.filter(selectItem => selectItem.selected);
        const createObjects = createItems.map(hazardousSubstance => {
            return {
                risk_assessment_id: props.riskAssessmentID,
                hazardous_substance_id: hazardousSubstance.id
            }
        })
        const deleteItems = updatedItems.filter(selectItem => !selectItem.selected);
        const deleteIDs = deleteItems.map(hazardousSubstance => props.associatedHazardousSubstances.find(associatedHazardousSubstance => associatedHazardousSubstance.data.hazardous_substance_id === hazardousSubstance.id)?.id);
        const updatedDeleteIDs = deleteIDs.filter(id => id !== undefined) as Array<number>;
        
        createAssociatedHazardousSubstances(createObjects, updatedDeleteIDs);
    }

    const createAssociatedHazardousSubstances = (createObjects: any, deleteIDs: Array<number>) => {
        postAPI('associated_hazardous_substances/create_collection', {}, {
            associated_hazardous_substances: createObjects
        }, () => deleteAssociatedHazardousSubstances(deleteIDs), setIsCreatingAssociatedHazardousSubstances);
    }

    const deleteAssociatedHazardousSubstances = (deleteIDs: Array<number>) => {
        deleteAPI('associated_hazardous_substances/delete_collection', {
            associated_hazardous_substance_ids: deleteIDs
        }, props.getAssociatedHazardousSubstances, setIsDeletingAssociatedHazardousSubstances);
    }

    const getHazardousSubstances = () => {
        getAPI(`hazardous_substances`, {}, (response: any) => {
            const hazardousSubstancesData: HazardousSubstanceCollectionResponse = response.data;
            setHazardousSubstancesData(hazardousSubstancesData);
        }, setIsHazardousSubstancesLoading)
    }

    const getPPE = () => {
        getAPI(`personnel_protective_equipment`, {}, (response: any) => {
            const ppeData: PersonnelProtectiveEquipmentCollectionResponse = response.data;
            setPpeData(ppeData);
        }, setIsPPELoading)
    }

    const getRiskAssessmentTemplates = () => {
        getAPI('risk_assessment_templates', {
            is_active: true
        }, (response: any) => {
            const riskAssessmentTemplatesData: RiskAssessmentTemplateCollectionResponse = response.data;
            setRiskAssessmentTemplateData(riskAssessmentTemplatesData);
        }, setIsRiskAssessmentTemplatesLoading)
    }

    const deleteRiskAssessment = () => {
        putAPI(`risk_assessments/${props.riskAssessmentID}/update`, {}, {
            is_active: false
        }, (response: any) => {
            props.setRiskAssessmentData(response.data);
            setShowDelete(false);
        }, setIsSubmitting)
    }

    const reactiveRiskAssessment = () => {
        putAPI(`risk_assessments/${props.riskAssessmentID}/update`, {}, {
            is_active: true
        }, (response: any) => {
            props.setRiskAssessmentData(response.data);
            setShowReactivate(false);
        }, setIsSubmitting)
    }

    const deleteActivity = () => {
        deleteAPI(`risk_assessment_activities/${currentDeleteID}/delete`, {}, () => {
            props.getRiskAssessmentActivities();
            setShowDeleteActivity(false);
        }, setIsDeleting);
    }

    const updateReviewDates = () => {
        putAPI(`risk_assessments/${props.riskAssessmentID}/update`, {}, {
            last_review_at: lastReview,
            next_review_at: nextReview
        }, (response: any) => {
            props.setRiskAssessmentData(response.data);
            setShowRecordReview(false);
        }, setIsSubmitting)
    }

    return (
        <>
            <PermsProtectedComponent requiredPerms={{ iso: 2 }}>
                <SideBarModule title='Actions'>
                    {!props.isEditMode ? 
                        !props.isInactive ? 
                            <>
                                <SideBarButton 
                                    text='Record Review'
                                    iconFont="verified"
                                    color="dark-blue"
                                    clickEvent={() => setShowRecordReview(true)}
                                />
                                <SideBarButton
                                    text='Rename Risk Assessment'
                                    iconFont="edit"
                                    color="orange"
                                    clickEvent={() => props.setIsEditMode(true)}
                                />
                                <SideBarButton 
                                    text='Deactivate Risk Assessment'
                                    iconFont="highlight_off"
                                    color="red"
                                    clickEvent={() => setShowDelete(true)}
                                />
                            </> :
                        <SideBarButton
                            text="Reactive Risk Assessment"
                            iconFont="check_circle"
                            color="light-green"
                            clickEvent={() => setShowReactivate(true)}
                        />
                        :
                        <SideBarButton
                            text="Abandon Edit"
                            iconFont="close"
                            clickEvent={() => props.setIsEditMode(false)}
                        />
                    }
                </SideBarModule>
                {!props.isEditMode && !props.isInactive ?
                        <SideBarModule title="Activities">
                            <SideBarButton 
                                text='Create Activity'
                                iconFont="add"
                                color="light-green"
                                clickEvent={() => setShowCreateActivity(true)}
                            />
                            {props.riskAssessmentActivityData.length > 0 ? 
                                <SideBarButton 
                                    text='Edit Activities'
                                    iconFont="edit"
                                    color="orange"
                                    clickEvent={() => setShowEditActivities(true)}
                                /> : null
                            }
                        </SideBarModule>
                : null}  
                {!props.isEditMode && !props.isInactive && 
                    <SideBarModule title="Required PPE">
                        <SideButtonMenu
                            buttonText='Select Required PPE'
                            buttonIcon="checklist_rtl"
                            menuTitle='Select Required PPE'
                            startSelectItems={selectedPPE}
                            updateFunc={updateRequiredPPE}
                            createResourceLocation='rams/personnel_protective_equipment/create'
                            createResourceName="Personnel Protective Equipment"
                            resourcePlural='personnel protective equipment'
                        />
                    </SideBarModule>
                }
                {!props.isEditMode && !props.isInactive && 
                    <SideBarModule title="Hazardous Substances">
                        <SideButtonMenu
                            buttonText='Select Hazardous Substances'
                            buttonIcon="checklist_rtl"
                            menuTitle='Select Hazardous Substances'
                            startSelectItems={selectedHazardousMaterials}
                            updateFunc={updateAssociatedHazardousSubstances}
                            createResourceLocation='rams/hazardous_substances/create'
                            createResourceName="Hazardous Substance"
                            resourcePlural='hazardous substances'
                        />
                    </SideBarModule>
                }
                {!props.isEditMode && !props.isInactive && 
                    <SideBarModule title="Risk Assessment Template">
                        <SideButtonMenu
                            buttonText='Select Template'
                            buttonIcon="checklist_rtl"
                            menuTitle='Select Template'
                            startSelectItems={selectedTemplate}
                            updateFunc={updateTemplate}
                            createResourceLocation='templates/risk_assessments/create'
                            createResourceName="Risk Assessment Template"
                            resourcePlural='risk assessment templates'
                            isSelectOne
                        />
                    </SideBarModule>
                }
            </PermsProtectedComponent>

            <ExportResource
                resourceData={props.riskAssessmentData}
                resourceName="Risk Assessment"
            />

            <WindowOverlay
                title={"Deactivate Risk Assessment"} 
                maxWidth={300} 
                hideFunc={() => setShowDelete(false)} 
                show={showDelete} 
            >
                <p>All previous records of this risk assessment will not be affected but no future records can be made.</p>
                <SubmitButton
                    text="Deactivate Risk Assessment"
                    color="red"
                    submitting={isSubmitting}
                    submittingText='Deactivating...'
                    clickFunc={deleteRiskAssessment}
                />
            </WindowOverlay>

            <WindowOverlay 
                title={"Reactivate Risk Assessment"} 
                maxWidth={300} 
                hideFunc={() => setShowReactivate(false)} 
                show={showReactivate} 
            >
                <p>The risk assessment will be reactivated allowing future records to be made.</p>
                <SubmitButton
                    text="Reactivate Risk Assessment"
                    color="light-green"
                    submitting={isSubmitting}
                    submittingText='Reactivating...'
                    clickFunc={reactiveRiskAssessment}
                />
            </WindowOverlay>

            <WindowOverlay 
                title={"Create Risk Assessment Activity"} 
                maxWidth={800} 
                hideFunc={() => setShowCreateActivity(false)} 
                show={showCreateActivity} 
            >
                <CreateRiskAssessmentActivity
                    riskAssessmentID={props.riskAssessmentID}
                    resFunc={() => {
                        props.getRiskAssessmentActivities();
                        setShowCreateActivity(false);
                    }}
                />
            </WindowOverlay>

            <WindowOverlay
                title="Edit Risk Assessment Activities"
                maxWidth={700}
                hideFunc={() => setShowEditActivities(false)}
                show={showEditActivities}
            >
                <ListWrapper>
                    {props.riskAssessmentActivityData.map((activity, index) => 
                        <ListItem
                            key={index}
                            smallPadding
                            noClick
                        >
                            <IconButton
                                iconFont='delete'
                                color="red"
                                clickFunc={() => {
                                    setCurrentDeleteID(activity.id)
                                    setShowDeleteActivity(true);
                                }}
                            />
                            <h3>{activity.data.activity_name}</h3>
                        </ListItem>
                    )}
                </ListWrapper>
            </WindowOverlay>

            <WindowOverlay
                title="Delete Risk Assessment Activity"
                show={showDeleteActivity}
                hideFunc={() => setShowDeleteActivity(false)}
                maxWidth={400}
            >
                <p>Delete risk assessment activity? This cannot be undone.</p>
                <SubmitButton
                    text="Delete Risk Assessment Activity"
                    submitting={isDeleting}
                    submittingText='Deleting...'
                    clickFunc={deleteActivity}
                    disabled={currentDeleteID === undefined}
                    color='red'
                />
            </WindowOverlay>

            <WindowOverlay
                title="Record Review"
                show={showRecordReview}
                hideFunc={() => setShowRecordReview(false)}
                maxWidth={400}
            >
                <p>Record a review for this risk assessment.</p>
                <InfoGrid>
                    <GridItem title='Last Review' span={3}>
                        <input 
                            type='date' 
                            onChange={(e) => setLastReview(new Date(e.target.value))}
                        />
                    </GridItem>
                    <GridItem title='Next Review' span={3}>
                        <input 
                            type='date' 
                            onChange={(e) => setNextReview(new Date(e.target.value))}
                        />
                    </GridItem>
                </InfoGrid>

                <SubmitButton
                    text="Record Review"
                    submitting={isSubmitting}
                    submittingText='Recording...'
                    clickFunc={updateReviewDates}
                    disabled={lastReview === undefined || nextReview === undefined}
                    color='light-green'
                />
            </WindowOverlay>

        </>
    )
}

export default RiskAssessmentActions