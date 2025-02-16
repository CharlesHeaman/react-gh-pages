import { CreateContactAttributes } from "../../../../../types/contact.types";
import isEmailValid from "../../../../../utils/isEmailValid";
import isTelephoneValid from "../../../../../utils/isTelephoneValid";

const isContactDetailsFormValid = (contactDetails: CreateContactAttributes): boolean => {

    const nameEntered = contactDetails.name.length > 0;
    const telephoneEntered = contactDetails.telephone.length > 0
    const telephoneValid = isTelephoneValid(contactDetails.telephone);
    const mobileEntered = contactDetails.mobile.length > 0
    const mobileValid = isTelephoneValid(contactDetails.mobile);
    const emailEntered = contactDetails.email.length > 0;
    const emailValid = isEmailValid(contactDetails.email);

    return (
        nameEntered &&
        telephoneValid && 
        telephoneEntered &&
        (mobileValid || !mobileEntered) &&
        emailValid && 
        emailEntered
    )
}

export default isContactDetailsFormValid