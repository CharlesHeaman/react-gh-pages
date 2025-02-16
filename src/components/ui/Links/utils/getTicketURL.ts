const getTicketURL = (departmentName: string, ticketNumber: number, ticketSuffix: number) => {
    return `/#/${departmentName}/tickets/${ticketNumber}/${ticketSuffix}`
}

export default getTicketURL