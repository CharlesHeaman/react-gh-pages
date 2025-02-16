import { CreateContractAttributes } from './../../../../../types/contract.types';
const isContractDetailsFormValid = (contractDetails: CreateContractAttributes, referenceNumberUnique: boolean, departmentID: number | undefined): boolean => {

    const referenceNumberEntered = contractDetails.reference_number.length > 0;
    const contractValueEntered = parseInt(contractDetails.contract_value) >= 0;
    const serviceFrequencyEntered = parseInt(contractDetails.service_per_year) > 0;

    return (
        referenceNumberUnique &&
        referenceNumberEntered &&
        contractValueEntered &&
        serviceFrequencyEntered &&
        departmentID !== undefined
    )
   
}

export default isContractDetailsFormValid