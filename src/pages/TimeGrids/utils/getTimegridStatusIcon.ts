const getTimeGridStatusIcon = (status: number | undefined) => {
    switch (status) {
        case 0:
            return 'done'
        case 1:
            return 'assignment_return'
        case 2:
            return 'verified'
        case 3:
            return 'check_circle'
        default:
            return 'close'
    }
}

export default getTimeGridStatusIcon 