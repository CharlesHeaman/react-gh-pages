import formatDate from "./formatDate"
import formatTime from "./formatTime"

const formatDateTimestamp = (date: Date) => {
    return `${formatDate(date, true)} ${formatTime(date, true)}`
}

export default formatDateTimestamp
