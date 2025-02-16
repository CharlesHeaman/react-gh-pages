import { TicketResponseData } from "../types/tickets.types"

const getTicketEngineerIndex = (ticket: TicketResponseData, userID: number) => {
    return ticket.data.engineers.findIndex(engineer => engineer.user_id === userID)
}

export default getTicketEngineerIndex