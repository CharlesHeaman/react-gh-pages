import getYYYYMMDD from "../../../utils/getYYYYMMDD"

const getTimegridURL = (departmentName: string, userCode: string, date: Date) => {
    return `/#/${departmentName}/timegrids/${userCode}/${getYYYYMMDD(date)}`
}

export default getTimegridURL