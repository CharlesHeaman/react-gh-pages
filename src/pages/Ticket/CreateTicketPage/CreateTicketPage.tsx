import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { CustomerResponseData } from "../../../types/customers.types";
import { EquipmentResponseData } from "../../../types/equipment.types";
import { SiteResponseData } from "../../../types/sites.types";
import { CreateTicketAttributes, TicketResponseData } from "../../../types/tickets.types";
import getAPI from "../../../utils/getAPI";
import postAPI from "../../../utils/postAPI";
import updateStateCheckboxParams from "../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import TicketCustomerDetails from "../components/TicketCustomerDetails";
import TicketDetailsInformation from "../components/TicketDetailsInformation";
import TicketEquipmentForm from "./TicketEquipmentForm";
import TicketTicketDetailsForm from "./TicketTicketDetailsForm";
import isTicketDetailsFormValid from "./utils/isTicketDetailsFormValid";
import isTicketEquipmentFormValid from "./utils/isTicketEquipmentFormValid";
import TicketAccountsDetails from "../components/TicketAccountsDetails";
import { InvoiceTypeResponseData } from "../../../types/invoiceTypes.types";
import { ContractResponseData } from "../../../types/contract.types";
import { ContactResponseData } from "../../../types/contact.types";
import { QuoteResponseData } from "../../../types/quote.types";
import TicketJobInformation from "../components/TicketJobInformation";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";

const CreateTicketPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const { departmentName } = useParams();

    const customerIDParam = searchParams.get('customer_id');
    const siteIDParam = searchParams.get('site_id');
    const jobIDParam = searchParams.get('job_id');

    // Data States
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    
    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);    
    const [ticketDetails, setTicketDetails] = useState<CreateTicketAttributes>({
        job_description: '',
        estimated_time: '0',
        is_mate_required: false,
        is_rams_required: false,
    });
    const [isContractLoading, setIsContractLoading] = useState(false);
    const [contractData, setContractData] = useState<ContractResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isSiteLoading, setIsSiteLoading] = useState(false);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentResponseData>();
    const [isInvoiceTypeLoading, setIsInvoiceTypeLoading] = useState(false);
    const [invoiceType, setInvoiceType] = useState<InvoiceTypeResponseData>();
    const [isJobLoading, setIsJobLoading] = useState(false);
    const [selectedJob, setSelectedJob] = useState<QuoteResponseData>();
    const [contactData, setContactData] = useState<ContactResponseData>();

    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartmentData = departmentData.data[0];
            setDepartmentData(currentDepartmentData)
        }, setIsDepartmentLoading)
    }

    useEffect(() => {
        if (contractData) {
            getInvoiceType(contractData.data.invoice_type);
        } else {
            getInvoiceType(1);
        }
    }, [contractData])

    useEffect(() => {
        siteData?.data.customer_id && getCustomer(siteData.data.customer_id);
    }, [siteData?.data.customer_id]);

    useEffect(() => {
        if (siteData?.data.contract_id) {
            getContract(siteData.data.contract_id);
        } else {
            setContractData(undefined);
        }
    }, [siteData?.data.contract_id]);

    useEffect(() => {
        equipmentData?.data.site_id && getSite(equipmentData.data.site_id);
    }, [equipmentData?.data.site_id]);

    useEffect(() => {
        if (customerData === undefined) return;
        setTicketDetails((prevState: any) => {
            return {
                ...prevState, 
                is_rams_required: customerData.data.tickets_always_require_rams
            }
        });
    }, [customerData?.data.tickets_always_require_rams]);

    useEffect(() => {
        customerIDParam && getCustomer(parseInt(customerIDParam));
    }, [customerIDParam]);

    useEffect(() => {
        siteIDParam && getSite(parseInt(siteIDParam));
    }, [siteIDParam]);

    useEffect(() => {
        jobIDParam && getJob(parseInt(jobIDParam));
    }, [jobIDParam]);
    
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
        }, setIsSiteLoading);
    }

    const getJob = (jobID: number) => {
        getAPI(`quotes/${jobID}`, {}, (response: any) => {
            const jobData: QuoteResponseData = response.data;
            setSelectedJob(jobData);
            if (jobData.data.customer_id) getCustomer(jobData.data.customer_id);
            if (jobData.data.site_id) getSite(jobData.data.site_id);
        }, setIsJobLoading);
    }

    const getContract = (contractID: number) => {
        getAPI(`contracts/${contractID}`, {}, (response: any) => {
            const contractData: ContractResponseData = response.data;
            setContractData(contractData);
        }, setIsContractLoading);
    }

    const getInvoiceType = (invoiceTypeID: number) => {
        getAPI(`invoice_types/${invoiceTypeID}`, {}, (response: any) => {
            const invoiceTypeData: InvoiceTypeResponseData = response.data;
            setInvoiceType(invoiceTypeData);
        }, setIsInvoiceTypeLoading);
    }

    const updateTicketParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setTicketDetails);
    }

    const updateTicketCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setTicketDetails);
    }

    const createTicket = () => {
        postAPI('tickets/0/create', {}, {
            ...ticketDetails,
            department_id: departmentData?.id,
            site_id: siteData?.id,
            customer_id: customerData?.id,
            equipment_id: equipmentData?.id,
            contract_id: contractData?.id,
            invoice_type_id: invoiceType?.id,
            contact_id: contactData?.id,
            job_number: selectedJob?.data.number
        }, (response: any) => {
            const ticketData: TicketResponseData = response.data;
            navigate(`../${ticketData.data.number}/${ticketData.data.suffix}`, { relative: 'path' })
        }, setIsCreating);
    }


    const formSteps: Array<FormStep> = [
        {
            header: 'Customer Details',
            form: <TicketEquipmentForm 
                selectedCustomer={customerData}
                setSelectedCustomer={setCustomerData}
                selectedSite={siteData}
                setSelectedSite={setSiteData}
                selectedEquipment={equipmentData}
                setSelectedEquipment={setEquipmentData}
                selectedContact={contactData}
                setSelectedContact={setContactData}
                showErrors={maxStepSubmitted > 0}   
            />,
            isComplete: isTicketEquipmentFormValid(customerData?.id, siteData?.id, equipmentData?.id, contactData?.id)
        },
        {
            header: 'Ticket Details',
            form: <TicketTicketDetailsForm 
                    ticketDetails={ticketDetails} 
                    updateParams={updateTicketParams} 
                    updateCheckboxParams={updateTicketCheckboxParams}
                    showErrors={maxStepSubmitted > 1}   
                />,
            isComplete: isTicketDetailsFormValid(ticketDetails)
        },
        {
            header: 'Review Information',
            form: customerData && siteData && invoiceType ? <>
                <TicketCustomerDetails 
                    customer={customerData} 
                    site={siteData} 
                    equipment={equipmentData}
                    isPlannedMaintenance={false}
                />
                <hr/>
                <TicketDetailsInformation
                    ticketData={{
                        ...ticketDetails,
                        estimated_time: parseFloat(ticketDetails.estimated_time)
                    }}
                    customer={customerData}
                    site={siteData}
                />
                {selectedJob && departmentData ? <>
                    <hr/>
                    <TicketJobInformation
                        job={selectedJob}
                        jobDepartment={departmentData}
                    />
                </> : null}
                <hr/>
                <TicketAccountsDetails 
                    invoiceRequest={undefined}
                    invoiceProcessedByUser={undefined}
                    invoiceCreatedByUser={undefined}
                    contract={contractData} 
                    invoiceType={invoiceType} 
                    customer={customerData} 
                    purchaseOrderNumber={null} 
                    isQuoted={false}
                />
            </> : null
            ,
            isComplete: true
        }
    ]

    return (
        <>
            <OuterContainer
                title='Create Service Ticket'
                description="Complete this form to create a ticket."
                maxWidth={1000}
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="Ticket"
                    isCreating={isCreating}
                    createFunc={createTicket}
                />
            </OuterContainer>
        </>
    )
}

export default CreateTicketPage