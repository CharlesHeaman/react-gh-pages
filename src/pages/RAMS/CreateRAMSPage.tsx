import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../components/form/FormWizardFlex";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import WindowOverlay from "../../components/ui/Containers/WindowOverlay/WindowOverlay";
import Loading from "../../components/ui/Loading/Loading";
import { SelectItem } from "../../components/ui/SelectMenu/SelectMenu";
import { ContactResponseData } from "../../types/contact.types";
import { CustomerResponseData } from "../../types/customers.types";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../types/department.types";
import { DescriptionOfWorksCollectionResponse, DescriptionOfWorksResponseData } from "../../types/descriptionOfWorks.types";
import { EquipmentResponseData } from "../../types/equipment.types";
import { PersonnelProtectiveEquipmentCollectionResponse } from "../../types/personnelProtectiveEquipment.types";
import { RequiredPersonnelProtectiveEquipmentCollectionResponse } from "../../types/requiredPersonnelProtectiveEquipment.types";
import { RiskAssessmentCollectionResponse } from "../../types/riskAssessment.types";
import { RiskAssessmentAttachmentCollectionResponse } from "../../types/riskAssessmentAttachment.types";
import { CreateRiskAssessmentMethodStatement, RiskAssessmentMethodStatementResponseData } from "../../types/riskAssessmentMethodStatements.types";
import { SiteResponseData } from "../../types/sites.types";
import { TicketCollectionResponse, TicketResponseData } from "../../types/tickets.types";
import getAPI from "../../utils/getAPI";
import postAPI from "../../utils/postAPI";
import updateStateDateParams from "../../utils/updateStateParams/updateStateDateParams";
import ConfigureRAMSForm from "./ConfigureRAMSForm";
import RAMSDetailsForm from "./RAMSDetailsForm";
import CreateRAMSSkeleton from "./CreateRAMSSkeleton";
import UnderDevelopment from "../../components/ui/UnderDevelopment/UnderDevelopment";
import InnerContainer from "../../components/ui/Containers/InnerContainer/InnerContainer";

const CreateRAMSPage = () => {
    const navigate = useNavigate();
    const { departmentName, ticketNumber, ticketSuffix } = useParams();

    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isDescriptionOfWorksLoading, setIsDescriptionOfWorksLoading] = useState(true);
    const [descriptionOfWorksData, setDescriptionOfWorksData] = useState<Array<DescriptionOfWorksResponseData>>();
    const [isRiskAssessmentAttachmentsLoading, setIsRiskAssessmentAttachmentsLoading] = useState(true);
    const [riskAssessmentAttachmentIDs, setRiskAssessmentAttachmentIDs] = useState<Array<number>>([]);
    const [requiredPPEIDs, setRequiredPPEIDs] = useState<Array<number>>([]);
    const [startRequiredPPEIDs, setStartRequiredPPEIDs] = useState<Array<number>>([]);
    const [isRiskAssessmentLoading, setIsRiskAssessmentLoading] = useState(false);
    const [riskAssessmentData, setRiskAssessmentData] = useState<RiskAssessmentCollectionResponse>();
    const [isTicketLoading, setIsTicketLoading] = useState(false);
    const [ticketData, setTicketData] = useState<TicketResponseData>();
    const [isRequiredPPELoading, setIsRequiredPPELoading] = useState(false);
    const [isPPELoading, setIsPPELoading] = useState(false);
    const [personnelProtectiveEquipmentData, setPersonnelProtectiveEquipmentData] = useState<PersonnelProtectiveEquipmentCollectionResponse>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isSiteLoading, setIsSiteLoading] = useState(false);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentResponseData>();

    // From States
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);    
    const [ramsDetails, setRamsDetails] = useState<CreateRiskAssessmentMethodStatement>({
        end_date: new Date()
    })
    const [isCreating, setIsCreating] = useState(false);    
    const [sequenceOfOperations, setSequenceOfOperations] = useState('');
    const [selectedRiskAssessments, setSelectedRiskAssessments] = useState<Array<SelectItem>>([]);
    const [startSelectedRiskAssessmentIDS, setStartSelectedRiskAssessmentIDS] = useState<Array<number>>([]);
    const [selectedPPE, setSelectedPPE] = useState<Array<SelectItem>>([]);
    const [isContactLoading, setIsContactLoading] = useState(false);
    const [selectedContact, setSelectedContact] = useState<ContactResponseData>();
    const [selectedDescriptionOfWorks, setSelectedDescriptionOfWorks] = useState<DescriptionOfWorksResponseData>();

    useEffect(() => {
        if (selectedDescriptionOfWorks === undefined) return;
        setSequenceOfOperations(selectedDescriptionOfWorks.data.sequence_of_operations);
        getRiskAssessmentAttachments(selectedDescriptionOfWorks.id);
    }, [selectedDescriptionOfWorks])

    useEffect(() => {
        getDepartment();
        getRiskAssessments();
    }, [departmentName, ticketNumber, ticketSuffix]);

    useEffect(() => {
        getPPE();
    }, [])

    const getPPE = () => {
        getAPI(`personnel_protective_equipment`, {}, (response: any) => {
            const personnelProtectiveEquipmentData: PersonnelProtectiveEquipmentCollectionResponse = response.data;
            setPersonnelProtectiveEquipmentData(personnelProtectiveEquipmentData);
        }, setIsPPELoading)
    }

    const setStartSelectedRiskAssessments = (riskAssessmentAttachmentIDs: Array<number>) => {
        setRiskAssessmentAttachmentIDs(riskAssessmentAttachmentIDs);
        setStartSelectedRiskAssessmentIDS(riskAssessmentAttachmentIDs);
        riskAssessmentData && setSelectedRiskAssessments(riskAssessmentData.data.map(riskAssessment => {
            return {
                id: riskAssessment.id,
                selected: riskAssessmentAttachmentIDs.includes(riskAssessment.id),
                display: <>
                    <h3 style={{ margin: 0 }}>{riskAssessment.data.name}</h3>
                </>
            }
        }))
    };

    const setStartSelectedPPE = (ppeIDs: Array<number>) => {
        setRequiredPPEIDs(ppeIDs);
        setStartRequiredPPEIDs(ppeIDs);
        personnelProtectiveEquipmentData && setSelectedPPE(personnelProtectiveEquipmentData.data.map(ppe => {
            return {
                id: ppe.id,
                selected: ppeIDs.includes(ppe.id),
                display: <>
                    <h3 style={{ margin: 0 }}>{ppe.data.name}</h3>
                </>
            }
        }))
    };

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartmentData = departmentData.data[0];
            setDepartmentData(currentDepartmentData);
            getTicket(currentDepartmentData.id);
            getDescriptionOfWorks(currentDepartmentData.id);
        }, setIsDepartmentLoading)
    }

    const getRiskAssessments = () => {
        getAPI('risk_assessments', {}, (response: any) => {
            const riskAssessmentData: RiskAssessmentCollectionResponse = response.data;
            setRiskAssessmentData(riskAssessmentData);
        }, setIsRiskAssessmentLoading)
    }

    const getTicket = (departmentID: number) => {
        getAPI(`tickets`, {
            numbers: [ticketNumber],
            suffixes: [ticketSuffix],
            department_ids: [departmentID]
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            const currentTicketData = ticketData.data[0];
            setTicketData(currentTicketData);
            if (currentTicketData) {
                getCustomer(currentTicketData.data.customer_id);
                getSite(currentTicketData.data.site_id);
                currentTicketData.data.equipment_id && getEquipment(currentTicketData.data.equipment_id);
                currentTicketData.data.contact_id && getContact(currentTicketData.data.contact_id);
            }
        }, setIsTicketLoading);
    }

    const getCustomer = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading)
    }

    const getSite = (siteID: number) => {
        getAPI(`sites/${siteID}`, {}, (response: any) => {
            const siteData: SiteResponseData = response.data;
            setSiteData(siteData);
        }, setIsSiteLoading)   
    }

    const getEquipment = (equipmentID: number) => {
        getAPI(`equipment/${equipmentID}`, {}, (response: any) => {
            const equipmentData: EquipmentResponseData = response.data;
            setEquipmentData(equipmentData);
        }, setIsEquipmentLoading);
    }

    const getContact = (contactID: number) => {
        getAPI(`contacts/${contactID}`, {}, (response: any) => {
            const contactData: ContactResponseData = response.data;
            setSelectedContact(contactData);
        }, setIsContactLoading);
    }

    const getDescriptionOfWorks = (departmentID: number) => {
        getAPI('description_of_works', {
            department_id: departmentID
        }, (response: any) => {
            const descriptionOfWorksData: DescriptionOfWorksCollectionResponse = response.data;
            setDescriptionOfWorksData(descriptionOfWorksData.data);
        }, setIsDescriptionOfWorksLoading)
    }

    const getRiskAssessmentAttachments = (descriptionOfWorksID: number) => {
        getAPI(`risk_assessment_attachments`, {
            description_of_works_ids: [descriptionOfWorksID]
        }, (response: any) => {
            const riskAssessmentAttachmentData: RiskAssessmentAttachmentCollectionResponse = response.data;
            if (riskAssessmentAttachmentData.data.length > 0) {
                setStartSelectedRiskAssessments(riskAssessmentAttachmentData.data.map(riskAssessmentAttachment => riskAssessmentAttachment.data.risk_assessment_id));
                getRequiredPPE(riskAssessmentAttachmentData.data.map(riskAssessmentAttachment => riskAssessmentAttachment.data.risk_assessment_id));
            } else {
                setStartSelectedRiskAssessments([]);
                setStartSelectedPPE([]);
            }
        }, setIsRiskAssessmentAttachmentsLoading)
    }

    const getRequiredPPE = (riskAssessmentIDs: Array<number>) => {
        getAPI(`required_personnel_protective_equipment`, {
            risk_assessment_ids: riskAssessmentIDs
        }, (response: any) => {
            const requiredPPE: RequiredPersonnelProtectiveEquipmentCollectionResponse = response.data;
            if (requiredPPE.data.length > 0) {
                setStartSelectedPPE(requiredPPE.data.map(requiredPPE => requiredPPE.data.personnel_protective_equipment));
            } else {
                setStartSelectedPPE([]);
            }
        }, setIsRequiredPPELoading)
    }

    const createRAMS = () => {
        ticketData && postAPI('risk_assessment_method_statements/create', {}, {
            ...ramsDetails,
            ticket_id: ticketData.id,
            ticket_type: ticketData.data.ticket_type,
            description_of_works_id: selectedDescriptionOfWorks?.id,
            contact_id: selectedContact?.id,
            department_id: ticketData.data.department_id,
            sequence_of_operations: sequenceOfOperations,
            attached_risk_assessment_ids: riskAssessmentAttachmentIDs,
            required_personnel_protective_equipment_ids: requiredPPEIDs,
        }, (response: any) => {
            const ramsData: RiskAssessmentMethodStatementResponseData = response.data;
            window.open(`${process.env.REACT_APP_API_URL}/${ramsData.data.pdf_url}`)
            navigate('../', { relative: 'path' })
        }, setIsCreating)
    }

    const updateDateParams = (date: Date, name: string) => {
        updateStateDateParams(date, name, setRamsDetails)
    }

    const isFormComplete = ( 
        ramsDetails.end_date !== undefined && 
        selectedDescriptionOfWorks?.id !== undefined && 
        selectedContact?.id !== undefined
    )

    const formSteps: Array<FormStep> = [
        {
            header: 'RAMS Details',
            form: ticketData && customerData && siteData && departmentData && riskAssessmentData && personnelProtectiveEquipmentData ? <RAMSDetailsForm
                ramsDetails={ramsDetails}
                ticket={ticketData}
                department={departmentData}
                customer={customerData}
                site={siteData}
                equipment={equipmentData}
                updateDateParams={updateDateParams}
                selectedContact={selectedContact}
                setSelectedContact={setSelectedContact}
                selectedDescriptionOfWork={selectedDescriptionOfWorks}
                setSelectedDescriptionOfWork={setSelectedDescriptionOfWorks}
                showErrors={maxStepSubmitted > 0} 
            /> : <CreateRAMSSkeleton/>,
            isComplete: isFormComplete
        },
        {
            header: 'Configure RAMS',
            form: ticketData && customerData && siteData && departmentData && riskAssessmentData && personnelProtectiveEquipmentData ? <ConfigureRAMSForm
                sequenceOfOperations={sequenceOfOperations}
                setSequenceOfOperations={setSequenceOfOperations}
                startSelectedRiskAssessmentIDS={startSelectedRiskAssessmentIDS}
                riskAssessmentAttachmentIDs={riskAssessmentAttachmentIDs}
                setRiskAssessmentAttachmentIDs={setRiskAssessmentAttachmentIDs}
                selectedRiskAssessments={selectedRiskAssessments}
                riskAssessments={riskAssessmentData.data}
                selectedPPE={selectedPPE} 
                ppe={personnelProtectiveEquipmentData.data} 
                startSelectedPPEIDS={startRequiredPPEIDs} 
                ppeRequiredIDs={requiredPPEIDs} 
                setPPERequiredIDs={setRequiredPPEIDs}            
                showErrors={maxStepSubmitted > 1} 
            /> : <CreateRAMSSkeleton/>,
            isComplete: isFormComplete
        },
        {
            header: 'Preview RAMS',
            form: <InnerContainer><UnderDevelopment/></InnerContainer>,
            isComplete: isFormComplete
        }
    ]

    return (
        <>
            <OuterContainer
                title='Create RAMS'
                id={`${ticketNumber}${parseInt(ticketSuffix as string) > 0 ? `/${ticketSuffix}` : ''}`}
                description="Complete this form to create RAMS for the ticket."
                maxWidth={1200}
                bigID
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="RAMS"
                    isCreating={isCreating}
                    createFunc={createRAMS}
                />
            </OuterContainer>
            
            <WindowOverlay 
                title={"Creating RAMS"} 
                maxWidth={400} 
                show={isCreating}
            >
                <div style={{ minHeight: '200px', position: 'relative' }}>
                    <Loading
                        text='Generating RAMS PDFs'
                    />
                    <input style={{ opacity: 0 }} type='file'/>
                </div>
            </WindowOverlay>
        </>
    )
}

export default CreateRAMSPage
