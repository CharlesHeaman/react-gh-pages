const formatDate = (date: Date, absoluteDate?: boolean) => {
    const today = new Date()
    const displayDate = new Date(date)
    today.setHours(0,0,0,0);
    displayDate.setHours(0,0,0,0);
    if (absoluteDate) return displayDate.toLocaleDateString("en-GB")
    const diffTime = today.getTime()  - displayDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    switch (diffDays) {
        case -1: 
            return "Tomorrow"
        case 0:
            return "Today"
        case 1:
            return "Yesterday"
        default:
            return displayDate.toLocaleDateString("en-GB")
    }
}

export default formatDate
