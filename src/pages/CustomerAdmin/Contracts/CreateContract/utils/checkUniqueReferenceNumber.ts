import { Dispatch, SetStateAction } from "react";
import { ContractCollectionResponse } from "../../../../../types/contract.types";
import getAPI from "../../../../../utils/getAPI";

const checkUniqueReferenceNumber = (
    referenceNumber: string, 
    setCodeUnique: Dispatch<SetStateAction<boolean>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    contractID?: number,
) => {
    getAPI('contracts', {
        reference_number: referenceNumber,
    }, (response: any) => {
        const contractData: ContractCollectionResponse = response.data;
        const nonMatchingContractID = contractData.data.filter(customer => customer.id !== contractID);
        setCodeUnique(nonMatchingContractID.length === 0);
    }, setIsLoading)
}

export default checkUniqueReferenceNumber