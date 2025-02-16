const getOnCallCalendarDate = (searchDate: string | null) => {
    return searchDate ? 
        new Date(searchDate) : 
        new Date()
}

export default getOnCallCalendarDate