function sumDateTimegridTime(tickets, name) {
    return tickets.reduce((sum, ticket) => {
        return sum + ticket.engineer.engineers.find(engineer => engineer.isUser)[name]
    }, 0)
}

export default sumDateTimegridTime