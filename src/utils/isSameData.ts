const isSameDay = (dateOne: Date, dateTwo: Date) => {
    return (
        dateOne.getFullYear() === dateTwo.getFullYear() &&
        dateOne.getMonth() === dateTwo.getMonth() &&
        dateOne.getDate() === dateTwo.getDate()
    )
}

export default isSameDay