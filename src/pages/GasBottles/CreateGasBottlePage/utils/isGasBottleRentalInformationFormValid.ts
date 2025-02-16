import { CreateGasBottleAttributes } from "../../../../types/gasBottle.types";

const isGasBottleRentalInformationFormValid = (gasBottleDetails: CreateGasBottleAttributes, supplierID: number | undefined): boolean => {
    const rentalMonthsSelected = gasBottleDetails.rental_months.length > 0;
   
    return (
        rentalMonthsSelected && 
        supplierID !== undefined
    )
   
}

export default isGasBottleRentalInformationFormValid