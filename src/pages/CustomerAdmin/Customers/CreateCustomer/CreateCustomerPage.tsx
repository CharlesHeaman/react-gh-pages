import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../../components/form/FormWizardFlex";
import OuterContainer from "../../../../components/ui/Containers/OuterContainer/OuterContainer";
import { CreateCustomerAttributes, CustomerResponseData } from "../../../../types/customers.types";
import postAPI from "../../../../utils/postAPI";
import updateStateCheckboxParams from "../../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams";
import CustomerAdminNavigation from "../../components/CustomerAdminNavigation";
import CustomerAccountsInformation from "../CustomerPage/components/CustomerAccountsInformation";
import CustomerInformationDetails from "../CustomerPage/components/CustomerInformationDetails";
import CustomerTicketRequirements from "../CustomerPage/components/CustomerTicketRequirements";
import checkUniqueCustomerCode from "../utils/checkUniqueCustomerCode";
import CustomerAccountsInformationForm from "./components/CustomerAccountsInformationForm";
import CustomerDetailsForm from "./components/CustomerDetailsForm";
import CustomerTicketRequirementsForm from "./components/CustomerTicketRequirementsForm";
import isCustomerAccountsInformationFormValid from "./utils/isCustomerAccountsInformationFormValid";
import isCustomerDetailsFormValid from "./utils/isCustomerDetailsFormValid";
import CustomerLocationForm from "./components/CustomerLocationForm";
import isCustomerLocationFormValid from "./utils/isCustomerLocationFormValid";
import CustomerLocationInformation from "../CustomerPage/components/CustomerLocationInformation";

const CreateCustomerPage = () => {
    const navigate = useNavigate();

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [createCustomerDetails, setCreateCustomerDetails] = useState<CreateCustomerAttributes>({
        name: '',
        code: '',
        address: '',
        postcode: '',
        email: '',
        telephone: '',
        special_instructions: '',
        accounts_notes: '',
        sage_name: '',
        accounts_email: '',
        invoice_address: '',
        accounts_status: 0,
        tickets_always_require_purchase_order: false,
        tickets_always_require_rams: false,
    });
    const [, setIsCodeLoading] = useState(false);
    const [codeUnique, setCodeUnique] = useState(false);

    useEffect(() => {
        setCreateCustomerDetails((prevState: any) => {
            return {
                ...prevState, 
                invoice_address: `${createCustomerDetails.address}
${createCustomerDetails.postcode}`
            }
        });
    }, [createCustomerDetails.address, createCustomerDetails.postcode]);

    useEffect(() => {
        setCreateCustomerDetails((prevState: any) => {
            return {
                ...prevState, 
                accounts_email: createCustomerDetails.email
            }
        });
    }, [createCustomerDetails.email]);

    const updateCustomerParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setCreateCustomerDetails)
    }

    const updateCustomerCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setCreateCustomerDetails)
    }

    const createCustomer = () => {
        postAPI('customers/create', {}, createCustomerDetails, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            navigate(`../${customerData.data.code}`, { relative: 'path' })
        }, setIsCreating)
    }

    const previewCustomerData = {
        ...createCustomerDetails,
        is_contracted: false,
        is_active: true,
        created_at: new Date(),
        created_by_id: 0,
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Customer Details',
            form: <CustomerDetailsForm
                    customerDetails={createCustomerDetails}
                    updateParams={updateCustomerParams}
                    customerCodeUnique={codeUnique}
                    checkUniqueCustomerCode={() => checkUniqueCustomerCode(createCustomerDetails.code, setCodeUnique, setIsCodeLoading)}
                    showErrors={maxStepSubmitted > 0}
                />,
            isComplete: isCustomerDetailsFormValid(createCustomerDetails, codeUnique)
        },
        {
            header: 'Location Information',
            form: <CustomerLocationForm
                customerDetails={createCustomerDetails}
                updateParams={updateCustomerParams}
                showErrors={maxStepSubmitted > 1}
            />,
            isComplete: isCustomerLocationFormValid(createCustomerDetails)
        },
        {
            header: 'Accounts Information',
            form: <CustomerAccountsInformationForm
                    customerDetails={createCustomerDetails}
                    updateParams={updateCustomerParams}
                    showErrors={maxStepSubmitted > 2}
                />,
            isComplete: isCustomerAccountsInformationFormValid(createCustomerDetails)
        },
        {
            header: 'Ticket Requirements',
            form: <CustomerTicketRequirementsForm
                    customerDetails={createCustomerDetails}
                    updateCheckboxParams={updateCustomerCheckboxParams}
                />,
            isComplete: true
        },
        {
            header: 'Review Information',
            form: <>
                <CustomerInformationDetails 
                    customerData={previewCustomerData} 
                    isPreview
                />
                <hr/>
                <CustomerLocationInformation 
                    customerID={0}
                    customerData={previewCustomerData}     
                    isPreview           
                />
                <hr/>
                <CustomerAccountsInformation
                    customerData={previewCustomerData}
                    lastAccountsUpdate={undefined}
                    isPreview
                />
                <hr/>
                <CustomerTicketRequirements
                    customerData={previewCustomerData}
                />
            </>,
            isComplete: true
        }     
    ]

    return (
        <>
            <CustomerAdminNavigation location="customers"/>
            <OuterContainer
                title='Create Customer'
                description="Complete this form to create a customer."
                maxWidth={900}
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="Customer"
                    isCreating={isCreating}
                    createFunc={createCustomer}
                />
            </OuterContainer>
        </>
    )
}

export default CreateCustomerPage