function getTimeGridStatusColour(status: number | undefined) {
    switch (status) {
        case 0:
            return 'light-green'
        case 1:
            return 'orange'
        case 2:
            return 'purple'
        case 3:
            return 'dark-blue'
        default:
            return 'red'
    }
}

export default getTimeGridStatusColour 