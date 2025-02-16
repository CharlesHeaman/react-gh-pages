const getMonthRelativeDate = (startDate: Date, monthDifference: number): Date => {
    return new Date(new Date(startDate).setMonth(new Date(startDate).getMonth() + monthDifference))
}

export default getMonthRelativeDate