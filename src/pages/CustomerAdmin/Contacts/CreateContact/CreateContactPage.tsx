import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../../components/form/FormWizardFlex";
import OuterContainer from "../../../../components/ui/Containers/OuterContainer/OuterContainer";
import { ContactResponseData, CreateContactAttributes } from "../../../../types/contact.types";
import { CustomerResponseData } from "../../../../types/customers.types";
import getAPI from "../../../../utils/getAPI";
import postAPI from "../../../../utils/postAPI";
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams";
import CustomerAdminNavigation from "../../components/CustomerAdminNavigation";
import ContactInformation from "../ContactPage/components/ContactInformation";
import ContactInformationSkeleton from "../ContactPage/components/ContactInformationSkeleton";
import ContactDetailsForm from "./components/ContactDetailsForm";
import SelectSiteCustomerForm from "./components/SelectSiteCustomerForm";
import isContactDetailsFormValid from "./utils/isContactDetailsFormValid";
import isSelectSiteCustomerFormValid from "./utils/isSelectSiteCustomerFormValid";

const CreateContactPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [contactDetails, setContactDetails] = useState<CreateContactAttributes>({
        name: '',
        email: '',
        mobile: '',
        telephone: '',
        notes: ''
    });
    const [, setIsCustomerLoading] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();

    const customerIDParam = searchParams.get('customer_id');

    useEffect(() => {
        customerIDParam && getCustomer(parseInt(customerIDParam));
    }, [customerIDParam])

    const getCustomer = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setContactDetails)
    }

    const createContact = () => {
        postAPI('contacts/create', {}, {
            ...contactDetails,
            customer_id: customerData?.id
        }, (response: any) => {
            const contactData: ContactResponseData = response.data;
            navigate(`../${contactData.id}`, { relative: 'path' })
        }, setIsCreating)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Select Customer',
            form: <SelectSiteCustomerForm
                    selectedCustomer={customerData}
                    setSelectedCustomer={setCustomerData}
                    contactDetails={contactDetails}
                    updateParams={updateParams}
                    showErrors={maxStepSubmitted > 0}
                />, 
            isComplete: isSelectSiteCustomerFormValid(customerData?.id)
        },
        {
            header: 'Contact Details',
            form: <ContactDetailsForm
                    contactDetails={contactDetails}
                    updateParams={updateParams}
                    showErrors={maxStepSubmitted > 1}
                />, 
            isComplete: isContactDetailsFormValid(contactDetails)
        },
        {
            header: 'Review Information',
            form: customerData ?
                <ContactInformation 
                    contactData={{
                        ...contactDetails,
                        customer_id: customerData.id,
                        is_active: true,
                    }}
                    customerData={customerData.data}
                    isPreview
                />  :
                <ContactInformationSkeleton/>
                ,
            isComplete: true
        }, 
    ]

    return (
        <>
            <CustomerAdminNavigation location="contacts"/>
            <OuterContainer
                title='Create Contact'
                maxWidth={800}
                description="Complete this form to create a customer contact."
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="Contact"
                    isCreating={isCreating}
                    createFunc={createContact}
                />
            </OuterContainer>
        </>
    )
}

export default CreateContactPage