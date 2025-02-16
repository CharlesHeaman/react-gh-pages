const getTimeGridStatusDescription = (status: number | undefined) => {
    switch (status) {
        case 0:
            return 'This timegrid has been submitted and is awaiting validation.'
        case 1:
            return 'This timegrid was submitted and then returned to the engineer.'
        case 2:
            return 'This timegrid was submitted and has received validation.'
        case 3:
            return 'This timegrid has been validated and processed.'
        default:
            return 'This timegrid has not yet been submitted by the engineer.'
    }
}

export default getTimeGridStatusDescription 