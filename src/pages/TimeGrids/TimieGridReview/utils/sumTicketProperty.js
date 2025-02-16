function sumTicketProperty(tickets, name) {
    return tickets.reduce((sum, currentObj) => {
        return sum + currentObj.engineer.engineers.find(obj => obj.isUser)[name]
    }, 0)
}

export default sumTicketProperty