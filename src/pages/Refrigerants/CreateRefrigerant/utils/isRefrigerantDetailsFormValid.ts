import { CreateRefrigerantAttributes } from "../../../../types/refrigerant.types";

const isRefrigerantDetailsFormValid = (refrigerantDetails: CreateRefrigerantAttributes): boolean => {
    const nameEntered = refrigerantDetails.name.length > 0;
    const commonNameEntered = refrigerantDetails.common_name.length > 0;
    const gwpEntered = refrigerantDetails.global_warming_potential.length > 0;
   
    return (
        nameEntered &&
        commonNameEntered && 
        gwpEntered
    )
   
}

export default isRefrigerantDetailsFormValid