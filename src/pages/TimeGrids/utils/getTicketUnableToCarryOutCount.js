function getTicketUnableToCarryOutCount(tickets) {
    let count = 0;
    tickets.forEach((obj) => {
        count += obj.engineer.isUnableToCarryOut ? 1 : 0;
    })
    return count
}

export default getTicketUnableToCarryOutCount