import { Dispatch, SetStateAction } from "react";
import { CustomerCollectionResponse } from "../../../../types/customers.types";
import getAPI from "../../../../utils/getAPI";

const checkUniqueCustomerCode = (
    code: string, 
    setCodeUnique: Dispatch<SetStateAction<boolean>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    customerID?: number,
) => {
    getAPI('customers', {
        codes: [code]
    }, (response: any) => {
        const customerData: CustomerCollectionResponse = response.data;
        const nonMatchingCustomerID = customerData.data.filter(customer => customer.id !== customerID);
        setCodeUnique(nonMatchingCustomerID.length === 0);
    }, setIsLoading)
}

export default checkUniqueCustomerCode