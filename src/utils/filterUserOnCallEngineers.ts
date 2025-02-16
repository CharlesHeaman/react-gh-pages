import { OnCallEngineerResponseData } from "../types/OnCallEngineer.types"

const filterUserOnCallEngineers = (onCallEngineers: Array<OnCallEngineerResponseData>, userID: number) => {
    return onCallEngineers.filter(onCallEngineer => onCallEngineer.data.user_id === userID)
}

export default filterUserOnCallEngineers