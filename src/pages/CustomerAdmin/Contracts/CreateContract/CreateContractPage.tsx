import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../../components/form/FormWizardFlex";
import OuterContainer from "../../../../components/ui/Containers/OuterContainer/OuterContainer";
import { ContractResponseData, CreateContractAttributes } from "../../../../types/contract.types";
import { CustomerResponseData } from "../../../../types/customers.types";
import { DepartmentResponseData } from "../../../../types/department.types";
import getAPI from "../../../../utils/getAPI";
import getYearRelativeDate from "../../../../utils/getYearRelativeDate";
import postAPI from "../../../../utils/postAPI";
import updateStateCheckboxParams from "../../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateDateParams from "../../../../utils/updateStateParams/updateStateDateParams";
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams";
import CustomerAdminNavigation from "../../components/CustomerAdminNavigation";
import ContractInformation from "../ContractPage/components/ContractInformation";
import ContractInformationSkeleton from "../ContractPage/components/ContractInformationSkeleton";
import ContractCustomerForm from "./components/ContractCustomerDepartmentForm";
import ContractDetailsForm from "./components/ContractDetailsForm";
import CreateContractAccountsInformationForm from "./components/CreateContractAccountsInformationForm";
import CreateContractRatesForm from "./components/CreateContractRatesForm";
import checkUniqueReferenceNumber from "./utils/checkUniqueReferenceNumber";
import isContractCustomerDepartmentFormValid from "./utils/isContractCustomerDepartmentFormValid";
import isContractDetailsFormValid from "./utils/isContractDetailsFormValid";
import isContractRatesFormValid from "./utils/isContractRateFormValid";
import getFirstDayOfMonth from "../../../../utils/getFirstDayOfMonth";
import getMonthRelativeDate from "../../../../utils/getMonthRelativeDate";
import { get } from "http";
import ContractScheduleVisitsForm from "./components/ContractScheduledVisitsForm";
import getNewMaintenanceVisitDates from "./utils/getNewMaintenanceVisitDates";

const CreateContractPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [contractDetails, setContractDetails] = useState<CreateContractAttributes>({
        reference_number: '',
        contract_value: '0',
        start_at: getFirstDayOfMonth(getMonthRelativeDate(new Date(), 1)),
        end_at: getYearRelativeDate(getFirstDayOfMonth(getMonthRelativeDate(new Date(), 1)), 1),
        is_fixed_three_year: false,
        service_per_year: '2',
        purchase_order_number: '',
        notes: '',
        engineer_rate: '0',
        mate_rate: '0',
        mileage_rate: '0',
        material_markup: '0',
        subcontract_markup: '0',
        hire_markup: '0',
    });    
    const [scheduledVisits, setScheduledVisits] = useState<Array<Date>>([new Date(), getMonthRelativeDate(new Date(), 3), getMonthRelativeDate(new Date(), 6), getMonthRelativeDate(new Date(), 9)]);
    const [invoicePeriod, setInvoicePeriod] = useState(3);
    const [, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [, setIsContractLoading] = useState(false);
    const [, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [, setIsCodeLoading] = useState(false);
    const [codeUnique, setCodeUnique] = useState(false);
    const [selectedContractType, setSelectedContractType] = useState(4);

    const customerIDParam = searchParams.get('customer_id');
    const contractIDParam = searchParams.get('contract_id');

    useEffect(() => {
        customerIDParam && getCustomer(parseInt(customerIDParam));
    }, [customerIDParam]);

    useEffect(() => {
        contractIDParam && getContract(parseInt(contractIDParam));
    }, [contractIDParam]);

    useEffect(() => {
        setScheduledVisits(getNewMaintenanceVisitDates(contractDetails.start_at, contractDetails.end_at, parseInt(contractDetails.service_per_year)));
    }, [contractDetails.end_at, contractDetails.service_per_year, contractDetails.start_at]);

    useEffect(() => {
        if (departmentData === undefined) return;
        setContractDetails((prevState: any) => {
            return {
                ...prevState, 
                engineer_rate: departmentData.data.contract_engineer_rate.toString(),
                mate_rate: departmentData.data.contract_mate_rate.toString(),
                mileage_rate: departmentData.data.contract_mileage_rate.toString(),
                material_markup: departmentData.data.contract_material_markup.toString(),
                subcontract_markup: departmentData.data.contract_subcontract_markup.toString(),
                hire_markup: departmentData.data.contract_hire_markup.toString(),
                
            }
        })
    }, [departmentData]);
    
    useEffect(() => {
        setContractDetails((prevState: any) => {
            return {
                ...prevState, 
                end_at: getYearRelativeDate(new Date(contractDetails.start_at), contractDetails.is_fixed_three_year ? 3 : 1)
            }
        })
    }, [contractDetails.is_fixed_three_year]);

    const getCustomer = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
    }

    const getContract = (contractID: number) => {
        getAPI(`contracts/${contractID}`, {}, (response: any) => {
            const contractData: ContractResponseData = response.data;
            setContractDetails({
                reference_number: '',
                contract_value: contractData.data.contract_value.toString(),
                start_at: new Date(contractData.data.start_at),
                end_at: new Date(contractData.data.end_at),
                is_fixed_three_year: contractData.data.is_fixed_three_year,
                service_per_year: contractData.data.service_per_year.toString(),
                purchase_order_number: contractData.data.purchase_order_number ? contractData.data.purchase_order_number : '',
                notes: contractData.data.notes ? contractData.data.notes : '',
                engineer_rate: contractData.data.engineer_rate.toString(),
                mate_rate: contractData.data.mate_rate.toString(),
                mileage_rate: contractData.data.mileage_rate.toString(),
                material_markup: contractData.data.material_markup.toString(),
                subcontract_markup: contractData.data.subcontract_markup.toString(),
                hire_markup: contractData.data.hire_markup.toString(),
            });
            getDepartment(contractData.data.department_id);
            getCustomer(contractData.data.customer_id);
        }, setIsContractLoading);
    }

    const updateContractParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setContractDetails)
    }

    const updateContractCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setContractDetails)
    }

    const updateContractDateParams = (date: Date, name: string) => {
        updateStateDateParams(date, name, setContractDetails)
    }

    const createContract = () => {
        postAPI('contracts/create', {}, {
            ...contractDetails,
            customer_id: customerData?.id,
            department_id: departmentData?.id,
            invoice_period: invoicePeriod,
            invoice_type: selectedContractType,
            scheduled_visits: scheduledVisits.map((visit: Date) => visit.toISOString())
        }, (response: any) => {
            const contractData: ContractResponseData = response.data;
            navigate(`../${contractData.data.reference_number}`, { relative: 'path' })
        }, setIsCreating)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Select Customer',
            form: <ContractCustomerForm
                selectedCustomer={customerData}
                setSelectedCustomer={setCustomerData}
                contractDetails={contractDetails}
                updateParams={updateContractParams}
                showErrors={maxStepSubmitted > 0}
            />,
            isComplete: isContractCustomerDepartmentFormValid(customerData?.id)
        },
        {
            header: 'Contract Details',
            form: <ContractDetailsForm
                contractDetails={contractDetails}
                selectedDepartment={departmentData}
                setSelectedDepartment={setDepartmentData}
                selectedContractType={selectedContractType}
                setSelectedContractType={setSelectedContractType}
                updateParams={updateContractParams}
                updateCheckboxParams={updateContractCheckboxParams}
                updateDateParams={updateContractDateParams}
                referenceNumberUnique={codeUnique}
                checkUniqueReferenceNumber={() => checkUniqueReferenceNumber(contractDetails.reference_number, setCodeUnique, setIsCodeLoading)}
                showErrors={maxStepSubmitted > 1}                 
            />,
            isComplete: isContractDetailsFormValid(contractDetails, codeUnique, departmentData?.id)
        },
        {
            header: 'Rates',
            form: <CreateContractRatesForm
                contractDetails={contractDetails}
                updateParams={updateContractParams}
                showErrors={maxStepSubmitted > 1}
            />,
            isComplete: isContractRatesFormValid(contractDetails)

        },
        {
            header: 'Accounts Information',
            form: <CreateContractAccountsInformationForm
                contractDetails={contractDetails}
                updateParams={updateContractParams}
                invoicePeriod={invoicePeriod}
                setInvoicePeriod={setInvoicePeriod}
                showErrors={maxStepSubmitted > 2}
            />,
            isComplete: true
        },
        {
            header: 'Scheduled Visits',
            form: <ContractScheduleVisitsForm
                visitsPerYear={parseInt(contractDetails.service_per_year)}
                scheduledVisits={scheduledVisits}
                setScheduledVisits={setScheduledVisits}
                showErrors={maxStepSubmitted > 1}                 
            />,
            isComplete: isContractDetailsFormValid(contractDetails, codeUnique, departmentData?.id)
        },
        {
            header: 'Review Information',
            form: customerData && departmentData ? 
                <ContractInformation 
                    customerData={customerData.data}
                    contractData={{
                        ...contractDetails,
                        invoice_period: invoicePeriod,
                        contract_value: parseInt(contractDetails.contract_value),
                        service_per_year: parseInt(contractDetails.service_per_year),
                        customer_id: customerData.id,
                        department_id: departmentData.id,
                        is_active: true,
                        engineer_rate: parseFloat(contractDetails.engineer_rate),
                        mate_rate: parseFloat(contractDetails.mate_rate),
                        mileage_rate: parseFloat(contractDetails.mileage_rate),
                        material_markup: parseFloat(contractDetails.material_markup),
                        subcontract_markup: parseFloat(contractDetails.subcontract_markup),
                        hire_markup: parseFloat(contractDetails.hire_markup),
                        invoice_type: selectedContractType
                    }}
                    department={departmentData}
                    lastDeactivate={undefined}
                    isPreview 
                    scheduledVisits={[]}      
                    scheduledVisitsPreviewDates={scheduledVisits}          
                /> :
                <ContractInformationSkeleton/>,
            isComplete: true
        }
    ]

    return (
        <>
            <CustomerAdminNavigation location="contracts"/>
            <OuterContainer
                title='Create Contract'
                description="Complete this form to create a contract."
                maxWidth={1000}
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="Contract"
                    isCreating={isCreating}
                    createFunc={createContract}
                />
            </OuterContainer>
        </>
    )
}

export default CreateContractPage