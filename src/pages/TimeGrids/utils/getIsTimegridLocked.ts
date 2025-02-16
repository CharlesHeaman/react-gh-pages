import { TicketResponseData } from "../../../types/tickets.types";

const getIsTimegridLocked = (
    tickets: Array<TicketResponseData>, 
    userID: number
): boolean => {
    const incompleteTicketCount = (tickets.filter((ticket) => 
        // finds tickets with user as lead engineer 
        ticket.data.engineers.find((engineer) => engineer.is_lead && engineer.user_id === userID) &&
        // finds tickets that don't have complete reports and are not unable to attend 
        (!ticket.data.is_report_complete && !ticket.data.is_unable_to_attend)
    ).length)
    return incompleteTicketCount > 0;
}

export default getIsTimegridLocked