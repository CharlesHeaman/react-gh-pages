import { CreateCustomerAttributes } from "../../../../../types/customers.types";
import isPostcodeValid from "../../../../../utils/isPostcodeValid";

const isCustomerLocationFormValid = (customerDetails: CreateCustomerAttributes): boolean => {
    const addressEntered = customerDetails.address.length > 0;
    const postcodeEntered = customerDetails.postcode.length > 0;
    const postcodeValid = isPostcodeValid(customerDetails.postcode);

    return (
        addressEntered && 
        postcodeEntered &&
        postcodeValid
    )
}

export default isCustomerLocationFormValid