import { CreateCustomerAttributes } from "../../../../../types/customers.types";
import isEmailValid from "../../../../../utils/isEmailValid";
import isTelephoneValid from "../../../../../utils/isTelephoneValid";

const isCustomerDetailsFormValid = (customerDetails: CreateCustomerAttributes, codeUnique: boolean): boolean => {
    const nameEntered = customerDetails.name.length > 0;
    const codeEntered = customerDetails.code.length > 0;
    const emailEntered = customerDetails.email.length > 0;
    const emailValid = isEmailValid(customerDetails.email);
    const telephoneEntered = customerDetails.telephone.length > 0;
    const telephoneValid = isTelephoneValid(customerDetails.telephone);

    return (
        codeUnique &&
        nameEntered &&
        codeEntered && 
        emailEntered && 
        emailValid &&
        telephoneEntered &&
        telephoneValid

    )
}

export default isCustomerDetailsFormValid