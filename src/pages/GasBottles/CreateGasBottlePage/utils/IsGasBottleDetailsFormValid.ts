import { CreateGasBottleAttributes } from "../../../../types/gasBottle.types";

const isGasBottleDetailsFormValid = (gasBottleDetails: CreateGasBottleAttributes, codeUnique: boolean, refrigerantID: number | undefined): boolean => {
    const numberEntered = gasBottleDetails.number.length > 0;
    const bottleWeightEntered = gasBottleDetails.bottle_weight.length > 0;
    const tareWeightEntered = gasBottleDetails.tare_weight.length > 0;
    const bottleHeavier = parseFloat(gasBottleDetails.bottle_weight) >= parseFloat(gasBottleDetails.tare_weight)
   
    return (
        codeUnique &&
        numberEntered &&
        bottleWeightEntered &&
        tareWeightEntered &&
        refrigerantID !== undefined &&
        bottleHeavier
    )
   
}

export default isGasBottleDetailsFormValid