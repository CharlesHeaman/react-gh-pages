import { CreateUserAttributes } from "../../../../../types/user.types";
import isEmailValid from "../../../../../utils/isEmailValid";
import isTelephoneValid from "../../../../../utils/isTelephoneValid";

const isUserContactDetailsFormValid = (userDetails: CreateUserAttributes): boolean => {
    const mobileEntered = userDetails.mobile.length > 0
    const mobileValid = isTelephoneValid(userDetails.mobile);
    const emailEntered = userDetails.email.length > 0;
    const emailValid = isEmailValid(userDetails.email);

    return (
        mobileValid &&
        mobileEntered &&
        emailValid && 
        emailEntered
    )
  
}

export default isUserContactDetailsFormValid