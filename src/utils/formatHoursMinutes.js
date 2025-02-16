function formatHoursMinutes(hours) {
    const wholeHours = parseInt(hours)
    const minutes = (hours - wholeHours) * 60
    return `${wholeHours > 0 ? `${parseInt(wholeHours)} hrs ` : ''}${Math.round((minutes + Number.EPSILON) * 1) / 1} min`
}

module.exports = formatHoursMinutes