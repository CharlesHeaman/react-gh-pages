import { TimegridResponseData } from "../types/timegrid.types"

const findUserTimegrid = (timegrids: Array<TimegridResponseData>, userID: number) => {
    return timegrids.find(timegrid => timegrid.data.user_id === userID)
}

export default findUserTimegrid 