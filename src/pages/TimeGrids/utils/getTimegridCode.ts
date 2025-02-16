import formatDate from "../../../utils/formatDate"

const getTimegridCode = (userCode: string, date: Date) => {
    return `${userCode}-${formatDate(date, true).replaceAll('/', '-')}`
}

export default getTimegridCode