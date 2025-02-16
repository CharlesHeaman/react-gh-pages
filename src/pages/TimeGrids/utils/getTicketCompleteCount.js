function getTicketCompleteCount(tickets) {
    let count = 0;
    tickets.forEach((obj) => {
        count += obj.engineer.isComplete ? 1 : 0;
    })
    return count
}

export default getTicketCompleteCount