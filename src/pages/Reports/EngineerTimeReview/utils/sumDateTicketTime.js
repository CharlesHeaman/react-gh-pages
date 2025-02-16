import sumTicketTime from "./sumTicketTime"

function sumDateTicketTime(tickets, name) {
    return tickets.reduce((sum, ticket) => {
        return sum + sumTicketTime(ticket.ticketTime, name)
    }, 0)
}

export default sumDateTicketTime