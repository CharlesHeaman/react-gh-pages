function getStartOfWeek(date) {
    const today = new Date(date);
    const thisMonday = new Date(today);
    return new Date(thisMonday.setDate(thisMonday.getDate() - ((today.getDay() || 7) - 1)));
}

export default getStartOfWeek