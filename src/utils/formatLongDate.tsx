const formatLongDate = (date: Date) => {
    const displayDate = new Date(date)
    return displayDate.toLocaleDateString("en-GB", {year: 'numeric', month: 'long', day: 'numeric' })
}

export default formatLongDate