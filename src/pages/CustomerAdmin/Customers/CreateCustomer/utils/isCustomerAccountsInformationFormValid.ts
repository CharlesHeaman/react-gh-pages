import { CreateCustomerAttributes } from "../../../../../types/customers.types";
import isEmailValid from "../../../../../utils/isEmailValid";

const isCustomerAccountsInformationFormValid = (customerDetails: CreateCustomerAttributes): boolean => {

    const invoiceAddressEntered = customerDetails.invoice_address.length > 0
    const emailEntered = customerDetails.accounts_email.length > 0;
    const emailValid = isEmailValid(customerDetails.accounts_email);

    return (
        emailEntered &&
        emailValid &&
        invoiceAddressEntered
    )
}

export default isCustomerAccountsInformationFormValid