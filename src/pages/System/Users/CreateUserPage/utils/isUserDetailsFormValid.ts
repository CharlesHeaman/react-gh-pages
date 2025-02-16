import { CreateUserAttributes } from "../../../../../types/user.types";

const isUserDetailsFormValid = (userDetails: CreateUserAttributes, codeUnique: boolean): boolean => {
    const userNameEntered = userDetails.username.length > 0;
    const jobTitleEntered = userDetails.job_title.length > 0;
    const firstNameEntered = userDetails.first_name.length > 0;
    const lastNameEntered = userDetails.last_name.length > 0;
   
    return (
        codeUnique &&
        jobTitleEntered &&
        userNameEntered &&
        firstNameEntered && 
        lastNameEntered
    )
   
}

export default isUserDetailsFormValid