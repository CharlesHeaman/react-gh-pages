import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MarkdownEditor from "../../../../components/form/MarkdownEditor/MarkdownEditor";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { SelectItem } from "../../../../components/ui/SelectMenu/SelectMenu";
import SideButtonMenu from "../../../../components/ui/SideButtonMenu/SideButtonMenu";
import { DescriptionOfWorksResponseData } from "../../../../types/descriptionOfWorks.types";
import { RiskAssessmentCollectionResponse } from "../../../../types/riskAssessment.types";
import { RiskAssessmentAttachmentResponseData } from "../../../../types/riskAssessmentAttachment.types";
import deleteAPI from "../../../../utils/deleteAPI";
import getAPI from "../../../../utils/getAPI";
import postAPI from "../../../../utils/postAPI";
import putAPI from "../../../../utils/putAPI";
import DescriptionOfWorksActions from "./DescriptionOfWorksActions";
import DescriptionOfWorksDeactivate from "./DescriptionOfWorksDeactivate";
import ExportResource from "../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource";
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent";


const DescriptionOfWorksSideBar = (props: {
    descriptionOfWorksData: DescriptionOfWorksResponseData | undefined,
    setDescriptionOfWorksData: Dispatch<SetStateAction<DescriptionOfWorksResponseData | undefined>>,
    riskAssessmentAttachments: Array<RiskAssessmentAttachmentResponseData>,
    riskAssessmentAttachmentIDs: Array<number>,
    getRiskAssessmentAttachments: () => void

}) => {
    const [showSource, setShowSource] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showReactivate, setShowReactivate] = useState(false);
    const [showEditDetails, setShowEditDetails] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showRecordReview, setShowRecordReview] = useState(false);
    const [showSequenceOfOperations, setShowSequenceOfOperations] = useState(false);
    const [sequenceOfOperations, setSequenceOfOperations] = useState(props.descriptionOfWorksData ? props.descriptionOfWorksData.data.sequence_of_operations : '');
    const [selectedRiskAssessments, setSelectedRiskAssessments] = useState<Array<SelectItem>>([]);
    const [isRiskAssessmentsLoading, setIsRiskAssessmentsLoading] = useState(true);
    const [riskAssessmentData, setRiskAssessmentData] = useState<RiskAssessmentCollectionResponse>();
    const [isCreatingRiskAssessmentAttachments, setIsCreatingRiskAssessmentAttachments] = useState(false);
    const [isDeletingRiskAssessmentAttachments, setIsDeletingRiskAssessmentAttachments] = useState(false);

    const hasSequenceOfOperations = props.descriptionOfWorksData && props.descriptionOfWorksData.data.sequence_of_operations.length > 0

    useEffect(() => {
        getAPI('risk_assessments', {}, (response: any) => {
            const riskAssessmentData: RiskAssessmentCollectionResponse = response.data;
            setRiskAssessmentData(riskAssessmentData);
        }, setIsRiskAssessmentsLoading)
    }, [])

    useEffect(() => {
        riskAssessmentData && setSelectedRiskAssessments(riskAssessmentData.data.map(riskAssessment => {
            return {
                id: riskAssessment.id,
                selected: props.riskAssessmentAttachmentIDs.includes(riskAssessment.id),
                display: <>
                    <h3 style={{ margin: 0 }}>{riskAssessment.data.name}</h3>
                </>
            }
        }))
    }, [riskAssessmentData, props.riskAssessmentAttachmentIDs]);

    const updateRiskAssessmentAttachments = (updatedItems: Array<SelectItem>) => {
        const createItems = updatedItems.filter(selectItem => selectItem.selected);
        const createObjects = createItems.map(riskAssessment => {
            return {
                description_of_works_id: props.descriptionOfWorksID,
                risk_assessment_id: riskAssessment.id
            }
        })
        const deleteItems = updatedItems.filter(selectItem => !selectItem.selected);
        const deleteIDs = deleteItems.map(ppe => props.riskAssessmentAttachments.find(riskAssessmentAttachment => riskAssessmentAttachment.data.risk_assessment_id === ppe.id)?.id);
        const updatedDeleteIDs = deleteIDs.filter(id => id !== undefined) as Array<number>;

        createRiskAssessmentAttachments(createObjects, updatedDeleteIDs);
    }

    const createRiskAssessmentAttachments = (createObjects: any, deleteIDs: Array<number>) => {
        postAPI('risk_assessment_attachments/create_collection', {}, {
            risk_assessment_attachments: createObjects
        }, () => deleteRiskAssessmentAttachments(deleteIDs), setIsCreatingRiskAssessmentAttachments);
    }

    const deleteRiskAssessmentAttachments = (deleteIDs: Array<number>) => {
        deleteAPI('risk_assessment_attachments/delete_collection', {
            risk_assessment_attachment_ids: deleteIDs
        }, props.getRiskAssessmentAttachments, setIsDeletingRiskAssessmentAttachments);
    }

    const deleteRiskAssessment = () => {
        putAPI(`description_of_works/${props.descriptionOfWorksID}/update`, {}, {
            is_active: false
        }, (response: any) => {
            props.setDescriptionOfWorksData(response.data);
            setShowDelete(false);
        }, setIsSubmitting)
    }

    const reactiveRiskAssessment = () => {
        putAPI(`description_of_works/${props.descriptionOfWorksID}/update`, {}, {
            is_active: true
        }, (response: any) => {
            props.setDescriptionOfWorksData(response.data);
            setShowReactivate(false);
        }, setIsSubmitting)
    }

    const updateSequenceOfOperations = () => {
        putAPI(`description_of_works/${props.descriptionOfWorksID}/update`, {}, {
            sequence_of_operations: sequenceOfOperations
        }, (response: any) => {
            props.setDescriptionOfWorksData(response.data);
            setShowSequenceOfOperations(false);
        }, setIsSubmitting)
    }

    return (
        <>
            
            {props.descriptionOfWorksData ? 
                <>
                    <PermsProtectedComponent requiredPerms={{ iso: 2 }}>
                        {props.descriptionOfWorksData.data.is_active ? <DescriptionOfWorksActions
                            descriptionOfWorksID={props.descriptionOfWorksData.id}
                            setDescriptionOfWorksData={props.setDescriptionOfWorksData}
                        /> : null}
                        {!props.isInactive && <SideBarModule title="Associated Risk Assessments">
                            <SideButtonMenu
                                buttonText='Select Risk Assessments'
                                buttonIcon="checklist_rtl"
                                menuTitle='Select Risk Assessments'
                                startSelectItems={selectedRiskAssessments}
                                updateFunc={updateRiskAssessmentAttachments}
                                createResourceLocation={'rams/risk_assessments/create'}
                                createResourceName={'Risk Assessment'}
                                resourcePlural='risk assessments'
                            />
                        </SideBarModule>}
                        <DescriptionOfWorksDeactivate  
                            descriptionOfWorksID={props.descriptionOfWorksData.id}
                            setDescriptionOfWorksData={props.setDescriptionOfWorksData}
                            reactivate={!props.descriptionOfWorksData.data.is_active}
                        />
                    </PermsProtectedComponent>

                    <ExportResource
                        resourceName="Description of Works"
                        resourceData={props.descriptionOfWorksData}
                    />
                </> : null
                
            }

            <WindowOverlay 
                title={"Sequence of Operations Source"} 
                maxWidth={800} 
                hideFunc={() => setShowSource(false)} 
                show={showSource} 
            >
                <div>
                    {props.descriptionOfWorksData && props.descriptionOfWorksData.data.sequence_of_operations.split('\n').map(str => <p>{str}</p>)}
                </div>
            </WindowOverlay>

            <WindowOverlay
                title={"Deactivate Description of Works"} 
                maxWidth={400} 
                hideFunc={() => setShowDelete(false)} 
                show={showDelete} 
            >
                <p>All previous records of this risk assessment will not be affected but no future records can be made.</p>
                <SubmitButton
                    text="Deactivate Description of Works"
                    color="red"
                    submitting={isSubmitting}
                    submittingText='Deactivating...'
                    clickFunc={deleteRiskAssessment}
                />
            </WindowOverlay>

            <WindowOverlay 
                title={"Reactivate Description of Works"} 
                maxWidth={400} 
                hideFunc={() => setShowReactivate(false)} 
                show={showReactivate} 
            >
                <p>The additional time activity will be reactivated allowing future records to be made.</p>
                <SubmitButton
                    text="Reactivate Description of Works"
                    color="light-green"
                    submitting={isSubmitting}
                    submittingText='Reactivating...'
                    clickFunc={reactiveRiskAssessment}
                />
            </WindowOverlay>

            <WindowOverlay 
                title={`${hasSequenceOfOperations ? 'Edit' : 'Add'} Sequence of Operations`} 
                maxWidth={800} 
                hideFunc={() => setShowSequenceOfOperations(false)} 
                show={showSequenceOfOperations} 
            >
                <InfoGrid>
                    <GridItem>
                        <p>{`${hasSequenceOfOperations ? 'Edit' : 'Add'} sequence of operations for this description of works.`}</p>
                    </GridItem>
                    <GridItem title='Sequence of Operations'>
                        <MarkdownEditor 
                            content={sequenceOfOperations} 
                            setter={setSequenceOfOperations}
                        />
                    </GridItem>
                </InfoGrid>
                <SubmitButton
                    text={hasSequenceOfOperations ? 'Save Changes' : 'Add Sequence of Operations'}
                    color="light-green"
                    submitting={isSubmitting}
                    submittingText='Reactivating...'
                    clickFunc={updateSequenceOfOperations}
                />
            </WindowOverlay>

            {/* <WindowOverlay
                title={`Edit Description of Works Details`} 
                maxWidth={600} 
                hideFunc={() => setShowEditDetails(false)} 
                show={showEditDetails} 
            >
                <EditDescriptionOfWorks
                    descriptionOfWorksID={props.descriptionOfWorksID} 
                    name={props.descriptionOfWorksData.data.name} 
                    description={props.descriptionOfWorksData.data.description}
                    resFunc={(response: any) => {
                        props.setDescriptionOfWorksData(response.data);
                        setShowEditDetails(false);
                    }}
                />
            </WindowOverlay> */}
        </>
    )
}

export default DescriptionOfWorksSideBar