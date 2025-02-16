const getYearRelativeDate = (startDate: Date, yearDifference: number): Date => {
    return new Date(new Date(startDate).setFullYear(new Date(startDate).getFullYear() + yearDifference))
}

export default getYearRelativeDate