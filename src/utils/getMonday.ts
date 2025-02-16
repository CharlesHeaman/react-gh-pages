const getMonday = (date: Date) => {
    var dayOfWeek = date.getDay(),
    diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); 
    return new Date(date.setDate(diff));
}

export default getMonday