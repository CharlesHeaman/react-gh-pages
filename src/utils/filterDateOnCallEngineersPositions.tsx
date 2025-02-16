import { OnCallEngineerPositions } from "../pages/OnCallCalendar/utils/positionOnCallEngineers"

const filterDateOnCallEngineersPositions = (onCallEngineerPositions: Array<OnCallEngineerPositions>, date: Date): Array<OnCallEngineerPositions> => {
    return onCallEngineerPositions.filter(onCallEngineerPosition => 
        new Date(new Date(onCallEngineerPosition.onCallEngineer.data.start_date).setHours(0,0,0,0)) <= new Date(date) && 
        new Date(new Date(onCallEngineerPosition.onCallEngineer.data.end_date).setHours(23,59,59,999)) >= new Date(date)
    )
}

export default filterDateOnCallEngineersPositions