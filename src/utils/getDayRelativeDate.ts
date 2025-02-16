const getDayRelativeDate = (startDate: Date, dayDifference: number): Date => {
    return new Date(new Date(startDate).setDate(new Date(startDate).getDate() + dayDifference))
}

export default getDayRelativeDate