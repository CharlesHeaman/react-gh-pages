import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { CreateCustomerAttributes, CustomerResponseData } from "../../../../../types/customers.types";
import putAPI from "../../../../../utils/putAPI";
import updateStateCheckboxParams from "../../../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateParams from "../../../../../utils/updateStateParams/updateStateParams";
import CustomerAccountsInformationForm from "../../CreateCustomer/components/CustomerAccountsInformationForm";
import CustomerDetailsForm from "../../CreateCustomer/components/CustomerDetailsForm";
import CustomerTicketRequirementsForm from "../../CreateCustomer/components/CustomerTicketRequirementsForm";
import isCustomerAccountsInformationFormValid from "../../CreateCustomer/utils/isCustomerAccountsInformationFormValid";
import isCustomerDetailsFormValid from "../../CreateCustomer/utils/isCustomerDetailsFormValid";
import checkUniqueCustomerCode from "../../utils/checkUniqueCustomerCode";
import { useNavigate } from "react-router-dom";
import CustomerLocationForm from "../../CreateCustomer/components/CustomerLocationForm";

const EditCustomerForm = (props: {
    customer: CustomerResponseData,
    setCustomerData: Dispatch<SetStateAction<CustomerResponseData | undefined>>
    disabledEdit: () => void
}) => {  
    const navigate = useNavigate();

    // Form States
    const [isUpdating, setIsUpdating] = useState(false);
    const [customerDetails, setCustomerDetails] = useState<CreateCustomerAttributes>({
        name: props.customer.data.name,
        code: props.customer.data.code,
        address: props.customer.data.address,
        postcode: props.customer.data.postcode,
        email: props.customer.data.email,
        telephone: props.customer.data.telephone,
        special_instructions: props.customer.data.special_instructions ? props.customer.data.special_instructions : '',
        accounts_notes: props.customer.data.accounts_notes ? props.customer.data.accounts_notes : '',
        sage_name: props.customer.data.sage_name ? props.customer.data.sage_name : '',
        accounts_email: props.customer.data.accounts_email ? props.customer.data.accounts_email : '',
        invoice_address: props.customer.data.invoice_address ? props.customer.data.invoice_address : '',
        accounts_status: 0,
        tickets_always_require_purchase_order: props.customer.data.tickets_always_require_purchase_order,
        tickets_always_require_rams: props.customer.data.tickets_always_require_rams,
    });
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [, setIsCodeLoading] = useState(false);
    const [codeUnique, setCodeUnique] = useState(true);

    const formComplete = (
        isCustomerDetailsFormValid(customerDetails, codeUnique) && 
        isCustomerAccountsInformationFormValid(customerDetails)
    )

    const updateCustomerParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setCustomerDetails)
    }

    const updateCustomerCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setCustomerDetails)
    }

    const updateCustomer = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`customers/${props.customer.id}/update`, {}, customerDetails, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            props.setCustomerData(customerData);
            props.disabledEdit()
            navigate(`../${customerData.data.code}`, { replace: true, relative: 'path' })
        }, setIsUpdating)
    }

    return (
        <>
            <CustomerDetailsForm
                customerDetails={customerDetails}
                updateParams={updateCustomerParams}
                customerCodeUnique={codeUnique}
                checkUniqueCustomerCode={() => checkUniqueCustomerCode(customerDetails.code, setCodeUnique, setIsCodeLoading, props.customer.id)}
                showErrors
                isEdit
            />
            <hr/>
            <CustomerLocationForm 
                customerDetails={customerDetails} 
                updateParams={updateCustomerParams}
                showErrors
                isEdit
            />
            <hr/>
            <CustomerAccountsInformationForm
                customerDetails={customerDetails}
                updateParams={updateCustomerParams}
                showErrors
                isEdit
            />
            <hr/>
            <CustomerTicketRequirementsForm 
                customerDetails={customerDetails} 
                updateCheckboxParams={updateCustomerCheckboxParams} 
                isEdit           
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    clickFunc={updateCustomer}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    iconFont="save"
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditCustomerForm