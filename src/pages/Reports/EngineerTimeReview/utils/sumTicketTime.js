function sumTicketTime(times, name) {
    return times.reduce((sum, time) => {
        return sum + time[name]
    }, 0)
}

export default sumTicketTime