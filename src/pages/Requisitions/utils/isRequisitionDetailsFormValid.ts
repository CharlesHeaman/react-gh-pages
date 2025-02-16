import { CostCentreResponseData } from './../../../types/costCentres.types';

const isRequisitionDetailsFormValid = (
    costCentreData: CostCentreResponseData | undefined, 
    assignedToID: number | undefined, 
    customerID: number | undefined, 
    userID: number | undefined,
    vehicleID: number | undefined,
    ticketID: number | undefined,
    jobID: number | undefined,
): boolean => {

   
    return (
        assignedToID !== undefined &&
        (
            (costCentreData?.data.associated_resource_type === 5 && customerID !== undefined) || 
            (costCentreData?.data.associated_resource_type === 4 && userID !== undefined) ||
            (costCentreData?.data.associated_resource_type === 3 && vehicleID !== undefined) ||
            (costCentreData?.data.associated_resource_type === 2 && jobID !== undefined) || 
            (costCentreData?.data.associated_resource_type === 1 && ticketID !== undefined) 
        )
    )
   
}

export default isRequisitionDetailsFormValid