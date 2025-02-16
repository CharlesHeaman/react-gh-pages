import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { CustomerResponseData } from "../../../types/customers.types";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";
import { EquipmentCollectionResponse } from "../../../types/equipment.types";
import { EditSiteListNoteAttributes, SiteListNoteCollectionResponse } from "../../../types/siteListNotes.types";
import { SiteResponseData } from "../../../types/sites.types";
import { TicketCollectionResponse, TicketResponseData } from "../../../types/tickets.types";
import getAPI from "../../../utils/getAPI";
import putAPI from "../../../utils/putAPI";
import CompleteTicketForm from "./components/TicketSideBar/components/TicketActions/components/CompleteTicketForm";
import isCompleteTicketFormComplete from "./components/TicketSideBar/components/TicketActions/utils/isCompleteTicketFormComplete";
import EditSiteListNotes from "./EditSiteListNotes";

const CompletePlannedMaintenanceTicketPage = () => {
    const navigate = useNavigate();
    const { departmentName, ticketNumber, ticketSuffix } = useParams();

    // Data States
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isTicketLoading, setIsTicketLoading] = useState(true);
    const [ticketData, setTicketData] = useState<TicketResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isSiteLoading, setIsSiteLoading] = useState(true);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentCollectionResponse>();
    const [isSiteListNotesLoading, setIsSiteListNotesLoading] = useState(false);
    const [siteListNotesData, setSiteListNotesData] = useState<SiteListNoteCollectionResponse>();
    
    // From States
    const [siteListNoteDetails, setSiteListNoteDetails] = useState<Array<EditSiteListNoteAttributes>>([]);
    const [isCompleting, setIsCompleting] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);    
    const [completionDate, setCompletionDate] = useState<Date>(new Date());
    const [report, setReport] = useState<string>('');
    const [awaitingCosts, setAwaitingCosts] = useState<boolean>(false);
    const [workRequired, setWorkRequired] = useState<boolean>(false);

    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    useEffect(() => {
        getTicket();
    }, [departmentData, ticketNumber, ticketSuffix]);

    useEffect(() => {
        if (ticketData === undefined) return;
    }, [ticketData?.data.engineers]);

    const getDepartment = () => {
        getAPI('departments', {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
        const currentDepartment = departmentData.data[0];
            setDepartmentData(currentDepartment);
        }, setIsDepartmentLoading);
    }

    const getTicket = () => {
        if (!departmentData) return;
        getAPI('tickets', {
            department_ids: [departmentData.id],
            numbers: [ticketNumber],
            suffixes: [ticketSuffix]
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            const currentTicket = ticketData.data[0];
            setTicketData(currentTicket);
            getCustomer(currentTicket.data.customer_id);
            getSite(currentTicket.data.site_id);
            getSiteListNotes(currentTicket.id);
        }, setIsTicketLoading)
    }

    const getCustomer = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const getSite = (siteID: number) => {
        getAPI(`sites/${siteID}`, {}, (response: any) => {
            const sitesData: SiteResponseData = response.data;
            getEquipment(sitesData.id);
            setSiteData(sitesData);
        }, setIsSiteLoading);
    }

    const getEquipment = (siteID: number) => {
        getAPI('equipment', {
            site_ids: [siteID],
            is_active: true
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData);
        }, setIsEquipmentLoading);
    }

    const getSiteListNotes = (ticketID: number) => {
        getAPI(`site_list_notes`, {
            ticket_ids: [ticketID],
        }, (response: any) => {
            const siteListNotesData: SiteListNoteCollectionResponse = response.data;
            setSiteListNotesData(siteListNotesData);
            setSiteListNoteDetails(siteListNotesData.data.map(siteListNote => {
                return {
                    site_list_note_id: siteListNote.id,
                    customer_viewable_report: siteListNote.data.report
                }
            }));
        }, setIsSiteListNotesLoading)    
    } 

    const updateReports = (siteListNoteID: number, name: string, value: string | boolean) => {
        setSiteListNoteDetails(prevState => {
            return prevState.map(currentLine => {
                return (siteListNoteID === currentLine.site_list_note_id ? 
                        {
                            ...currentLine,
                            [name]: value
                        } :
                        currentLine
                    )
            })
        })
    }

    const completeTicket = () => {
        putAPI(`tickets/${ticketData?.data.ticket_type}/${ticketData?.id}/complete_ticket`, {}, {
            completion_date: completionDate,
            customer_viewable_report: report,
            is_ready_for_invoicing: !awaitingCosts,
            is_further_work_required: workRequired,
            site_list_notes: siteListNoteDetails
        }, () => {
            navigate('../', { relative: 'path' })
        }, setIsCompleting)
    }

    // const isLoading = (
    //     isDepartmentLoading ||
    //     isTicketLoading || 
    //     isCustomerLoading || 
    //     isSiteLoading || 
    //     isEquipmentLoading ||
    //     isSiteListNotesLoading
    // )

    const formSteps: Array<FormStep> = [
        {
            header: 'Site List Reports',
            form: siteListNotesData && equipmentData && departmentData ?
                <EditSiteListNotes
                    siteListNotes={siteListNotesData}
                    equipment={equipmentData.data}
                    department={departmentData}
                    siteListNoteDetails={siteListNoteDetails}
                    updateReports={updateReports}
                    showErrors={maxStepSubmitted > 0}
                />
            : null,
            isComplete: true
        },
        {
            header: 'Completion Details',
            form: <CompleteTicketForm
                completionDate={completionDate}
                setCompletionDate={setCompletionDate}
                report={report}
                setReport={setReport}
                awaitingCosts={awaitingCosts}
                setAwaitingCosts={setAwaitingCosts}
                workRequired={workRequired}
                setWorkRequired={setWorkRequired}
                hasSubmitted={maxStepSubmitted > 1}
                hideDescription
            />,
            isComplete: isCompleteTicketFormComplete(report)
        },
        {
            header: 'Review Information',
            form: siteListNotesData && equipmentData && departmentData ? <>
                <section>
                    <h2>Site List Reports</h2>
                    <EditSiteListNotes
                        siteListNotes={siteListNotesData}
                        equipment={equipmentData.data}
                        department={departmentData}
                        siteListNoteDetails={siteListNoteDetails}
                        updateReports={updateReports}
                        showErrors={maxStepSubmitted > 0}
                        isPreview
                    />
                </section>
                <hr/>
                <section>
                    <h2>Completion Details</h2>
                    <CompleteTicketForm
                        completionDate={completionDate}
                        setCompletionDate={setCompletionDate}
                        report={report}
                        setReport={setReport}
                        awaitingCosts={awaitingCosts}
                        setAwaitingCosts={setAwaitingCosts}
                        workRequired={workRequired}
                        setWorkRequired={setWorkRequired}
                        hasSubmitted={maxStepSubmitted > 1}
                        hideDescription
                        isPreview
                    />
                </section>
            </> : null,
            isComplete: true
        }
    ]

    return (
        <>
            <OuterContainer
                title='Complete Planned Maintenance Ticket'
                id={`${ticketNumber}${parseInt(ticketSuffix as string) > 0 ? `/${ticketSuffix}` : ''}`}
                description="Complete this form to save customer viewable reports and mark the ticket as complete."
                maxWidth={1100}
                bigID
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="Ticket"
                    actionName="Complete"
                    isCreating={isCompleting}
                    createFunc={completeTicket}
                />
            </OuterContainer>
        </>
    )
}

export default CompletePlannedMaintenanceTicketPage