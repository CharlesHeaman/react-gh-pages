import { OnCallEngineerResponseData } from "../types/OnCallEngineer.types"

const filterDateOnCallEngineers = (onCallEngineerPositions: Array<OnCallEngineerResponseData>, date: Date): Array<OnCallEngineerResponseData> => {
    return onCallEngineerPositions.filter(onCallEngineerPosition => 
        new Date(new Date(onCallEngineerPosition.data.start_date).setHours(0,0,0,0)) <= new Date(date) && 
        new Date(new Date(onCallEngineerPosition.data.end_date).setHours(23,59,59,999)) >= new Date(date)
    )
}

export default filterDateOnCallEngineers