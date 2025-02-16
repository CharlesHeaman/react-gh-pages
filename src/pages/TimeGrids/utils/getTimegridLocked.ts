const getTimegridLocked = (
    tickets: Array<any>, 
    engID: number
): boolean => {
    console.log("engID", engID)
    let locked = false;
    tickets.forEach((ticket) => {
        if (ticket.engineer.engineers.findIndex((engineer: { id: number; }) => engineer.id === engID) === 0) {
            if (!(ticket.engineer.isUnableToCarryOut || ticket.engineer.isComplete)) {
                locked = true
            }
            
        }
    })
    return locked
}

export default getTimegridLocked