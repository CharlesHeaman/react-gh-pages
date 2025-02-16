import { CreateContractAttributes } from './../../../../../types/contract.types';
const isContractRatesFormValid = (contractDetails: CreateContractAttributes): boolean => {

    const engineerRateEntered = contractDetails.engineer_rate.length > 0;
    const mateRateEntered = contractDetails.mate_rate.length > 0;
    const mileageRateEntered = contractDetails.mileage_rate.length > 0;
    const partsMarkupEntered = contractDetails.material_markup.length > 0;
    const subcontractMarkupEntered = contractDetails.subcontract_markup.length > 0;
    const hireMarkupEntered = contractDetails.hire_markup.length > 0;

    return (
        engineerRateEntered &&
        mateRateEntered &&
        mileageRateEntered &&
        partsMarkupEntered && 
        subcontractMarkupEntered &&
        hireMarkupEntered
    )
   
}

export default isContractRatesFormValid