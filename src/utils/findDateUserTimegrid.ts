import { TimegridResponseData } from "../types/timegrid.types"
import isSameDay from "./isSameData"

const findDateUserTimegrid = (timegrids: Array<TimegridResponseData>, userID: number, date: Date) => {
    return timegrids.find(timegrid => (
        timegrid.data.user_id === userID && 
        isSameDay(new Date(timegrid.data.date), date)
    ))
}

export default findDateUserTimegrid 