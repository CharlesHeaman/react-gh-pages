import { CreateTicketAttributes } from "../../../../types/tickets.types"

const isTicketDetailsFormValid = (ticketDetails: CreateTicketAttributes): boolean => {
   
    const jobDescriptionEntered = ticketDetails.job_description.length > 0;
    const estimatedTime = ticketDetails.estimated_time.length > 0;

    return (
        jobDescriptionEntered && 
        estimatedTime
    )
   
}

export default isTicketDetailsFormValid