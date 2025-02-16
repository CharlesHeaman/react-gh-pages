import { CreateCostCentreAttributes } from "../../../types/costCentres.types";

const isCostCentreFormValid = (costCentreDetails: CreateCostCentreAttributes, associatedResourceType: number): boolean => {

    const nameEntered = costCentreDetails.name.length > 0;
    const associateResourceSelected = associatedResourceType > 0;

    return (
        nameEntered && 
        associateResourceSelected
    )
   
}

export default isCostCentreFormValid