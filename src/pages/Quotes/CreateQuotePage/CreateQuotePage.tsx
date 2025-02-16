import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { CustomerResponseData } from "../../../types/customers.types";
import { CreateQuoteAttributes, QuoteResponseData } from "../../../types/quote.types";
import { SiteResponseData } from "../../../types/sites.types";
import getAPI from "../../../utils/getAPI";
import postAPI from "../../../utils/postAPI";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import QuoteCustomerInformationForm from "./QuoteCustomerInformationForm";
import QuoteDetailsForm from "./QuoteDetailsForm";
import isQuoteCustomerInformationFormValid from "./utils/isQuoteCustomerInformationFormValid";
import QuoteInformationDetails from "../QuotePage/components/QuoteInformationDetails";
import { FilterSelection } from "../../../components/ui/FilterSelect/FilterSelect";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";
import { EquipmentCollectionResponse, EquipmentResponseData } from "../../../types/equipment.types";
import { ContactResponseData } from "../../../types/contact.types";
import { TicketResponseData } from "../../../types/tickets.types";
import QuotedEquipmentPreviewRow from "../QuotePage/components/QuotedEquipmentPreviewRow";
import { SiteListNoteCollectionResponse } from "../../../types/siteListNotes.types";

const CreateQuotePage = () => {
    const { departmentName } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [quoteDetails, setQuoteDetails] = useState<CreateQuoteAttributes>({
        description: '',
        notes: ''
    });
    const [selectOptions, setSelectOptions] = useState<Array<FilterSelection>>([
        {
            text: 'Enquiry',
            value: 'enquiry',
            iconFont: 'question_answer',
            selected: true
        },
        {
            text: 'Reactive',
            value: 'reactive',
            iconFont: 'confirmation_number',
        },
        {
            text: 'Maintenance',
            value: 'maintenance',
            iconFont: 'business',
        },
        {
            text: 'Project',
            value: 'project',
            iconFont: 'dataset_linked',
        },
    ]);
    const [, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [, setIsSiteLoading] = useState(false);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<Array<EquipmentResponseData>>([]);
    const [contactData, setContactData] = useState<ContactResponseData>();
    const [isTicketLoading, setIsTicketLoading] = useState(true);
    const [ticketData, setTicketData] = useState<TicketResponseData>();
    const [isSiteListNotesLoading, setIsSiteListNotesLoading] = useState(false);

    const customerIDParam = searchParams.get('customer_id');
    const siteIDParam = searchParams.get('site_id');
    const equipmentIDParam = searchParams.get('equipment_id');
    const ticketIDParam = searchParams.get('ticket_id');
    const ticketTypeParam = searchParams.get('ticket_type');

    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    useEffect(() => {
        customerIDParam && getCustomer(parseInt(customerIDParam));
    }, [customerIDParam]);

    useEffect(() => {
        siteIDParam && getSite(parseInt(siteIDParam));
    }, [siteIDParam]);

    useEffect(() => {
        equipmentIDParam && getEquipment(parseInt(equipmentIDParam));
    }, [equipmentIDParam]);

    useEffect(() => {
        if (ticketIDParam === null || ticketTypeParam === null) return;
        getTicket(parseInt(ticketTypeParam), parseInt(ticketIDParam));
    }, [ticketIDParam, ticketTypeParam]);

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartment = departmentData.data[0];
            setDepartmentData(currentDepartment);
            if (!currentDepartment.data.uses_job_module) {
                setSelectOptions(prevState => prevState.filter(selection => selection.value !== 'project'));
            }
        }, setIsDepartmentLoading)
    }
    
    const getCustomer = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const getSite = (siteID: number) => {
        getAPI(`sites/${siteID}`, {}, (response: any) => {
            const siteData: SiteResponseData = response.data;
            setSiteData(siteData);
            getCustomer(siteData.data.customer_id)
        }, setIsSiteLoading);
    }

    const getEquipment = (equipmentID: number) => {
        getAPI(`equipment/${equipmentID}`, {}, (response: any) => {
            const equipmentData: EquipmentResponseData = response.data;
            setEquipmentData([equipmentData]);
            getSite(equipmentData.data.site_id);
        }, setIsEquipmentLoading);
    }

    const getTicket = (ticketType: number, ticketID: number) => {
        setSelectOptions(prevState => {
            return prevState.map((selection, index) => {
                return (1 === index ? 
                        {
                            ...selection,
                            selected: true
                        } :
                        {
                            ...selection,
                            selected: false
                        }
                    )
            })
        });
        getAPI(`tickets/${ticketType}/${ticketID}`, {}, (response: any) => {
            const ticketData: TicketResponseData = response.data;
            setTicketData(ticketData);
            getCustomer(ticketData.data.customer_id);
            getSite(ticketData.data.site_id);
            ticketData.data.equipment_id && getEquipment(ticketData.data.equipment_id);
            ticketData.data.ticket_type === 1 && getSiteListNotes(ticketData.id);
        }, setIsTicketLoading);
    }

    const getSiteListNotes = (ticketID: number) => {
        getAPI(`site_list_notes`, {
            ticket_ids: [ticketID],
        }, (response: any) => {
            const siteListNotesData: SiteListNoteCollectionResponse = response.data;
            getSiteListEquipment(siteListNotesData.data.filter(siteListNote => siteListNote.data.is_work_required).map(siteListNote => siteListNote.data.equipment_id));
        }, setIsSiteListNotesLoading)    
    } 

    const getSiteListEquipment = (equipmentIDs: Array<number>) => {
        getAPI('equipment', {
            ids: equipmentIDs
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData.data);
        }, setIsEquipmentLoading);
    }

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setQuoteDetails)
    }

    var selectOption = selectOptions.find(selection => selection.selected);
    var selectValue = selectOption ? selectOption.value as string : ''

    const createQuote = () => {
        postAPI('quotes/create', {}, {
            ...quoteDetails,
            customer_id: customerData?.id,
            site_id: siteData?.id,
            recipient_id: contactData?.id,
            department_id: departmentData?.id,
            is_maintenance: selectValue === "maintenance",
            is_job_quote: selectValue === "job",
            is_reactive: false,
            ticket_id: ticketData?.id,
            ticket_type: ticketData?.data.ticket_type,
        }, (response: any) => {
            const quoteData: QuoteResponseData = response.data;
            navigate(`../${quoteData.data.number}/${quoteData.data.revision_number}`, { relative: 'path' })
        }, setIsCreating)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Quote Details',
            form: <QuoteDetailsForm
                    quoteDetails={quoteDetails}
                    updateParams={updateParams}
                    selectOptions={selectOptions}
                    setSelectOptions={setSelectOptions}
                    showErrors={maxStepSubmitted > 0}
                />, 
            isComplete: quoteDetails.description.length > 0
        },
        {
            header: 'Customer Information',
            form: <QuoteCustomerInformationForm
                    selectedCustomer={customerData}
                    setSelectedCustomer={setCustomerData}
                    selectValue={selectValue}
                    selectedSite={siteData}
                    setSelectedSite={setSiteData}
                    selectedContact={contactData}
                    setSelectedContact={setContactData}
                    showErrors={maxStepSubmitted > 1}
                />, 
            isComplete: isQuoteCustomerInformationFormValid(selectValue, customerData?.id, siteData?.id, contactData?.id)
        },
        {
            header: 'Review Information',
            form: customerData && departmentData && contactData ? <>
                <QuoteInformationDetails
                    quote={{
                        ...quoteDetails,
                        department_id: departmentData.id,
                        is_maintenance: selectValue ? true : false
                    }}
                    ticket={ticketData}
                    customerData={customerData}
                    siteData={siteData ? siteData.data : undefined}
                    recipientData={contactData}
                    department={departmentData}
                    isPreview
                />
                {equipmentData.length > 0 ? <>
                    <hr/>
                    <section>
                        <h2>Quoted Equipment</h2>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Equipment</th>
                                        <th>Location</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {equipmentData.map((equipment, index) => 
                                        <QuotedEquipmentPreviewRow
                                            key={index}
                                            equipment={equipment}
                                        />
                                    )}
                                </tbody>
                            </table> 
                        </div>
                    </section>
                </> : null}
            </> : null,
            isComplete: true
        }, 
    ]

    return (
        <>
            <OuterContainer
                title='Create Quote'
                description="Complete this form to create a quote."
                maxWidth={1000}
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="Quote"
                    isCreating={isCreating}
                    createFunc={createQuote}
                />
            </OuterContainer>
        </>
    )
}

export default CreateQuotePage