import { CostCentreResponseData } from "../../../../types/costCentres.types"

const isPurchaseOrderDetailsFormValid = (
    costCentreData: CostCentreResponseData | undefined, 
    assignedToCustomerID: number | undefined, 
    customerID: number | undefined, 
    userID: number | undefined,
    vehicleID: number | undefined,
    ticketID: number | undefined,
    jobID: number | undefined,
): boolean => {
    return (
        assignedToCustomerID !== undefined &&
        (
            (costCentreData?.data.associated_resource_type === 5 && customerID !== undefined) || 
            (costCentreData?.data.associated_resource_type === 4 && userID !== undefined) ||
            (costCentreData?.data.associated_resource_type === 3 && vehicleID !== undefined) ||
            (costCentreData?.data.associated_resource_type === 2 && jobID !== undefined) || 
            (costCentreData?.data.associated_resource_type === 1 && ticketID !== undefined) 
        )
    )
   
}

export default isPurchaseOrderDetailsFormValid