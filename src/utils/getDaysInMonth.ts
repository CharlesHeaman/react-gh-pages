const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
}

export default getDaysInMonth