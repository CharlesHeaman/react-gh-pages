const getExpiryStatus = (date: Date, startDate?: boolean): number => {
    const todayTime = (new Date()).getTime();
    const plusMonthTime = new Date((new Date()).setMonth(new Date().getMonth() + 1)).getTime();
    const comparisonTime = (new Date(date)).getTime();
    if (!startDate ? todayTime > comparisonTime : comparisonTime > todayTime) {
        return -1
    }
    if (plusMonthTime > comparisonTime && !startDate) {
        return 0
    }
    return 1
}

export default getExpiryStatus