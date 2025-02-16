import { AdditionalTimeResponseData } from "../../../../../types/additionalTime.types"

export interface ReducedAdditionalTime {
    activity_time: number,
    travel_time: number,
    mileage: number,
    expenses: number
}

const reducedAdditionalTime = (additionalTimeData: Array<AdditionalTimeResponseData>) => {
    return additionalTimeData.reduce((reducedAdditionalTime: ReducedAdditionalTime, additionalTime) => {
        return { 
            activity_time: reducedAdditionalTime.activity_time + additionalTime.data.activity_time,
            travel_time: reducedAdditionalTime.travel_time + additionalTime.data.travel_time,
            mileage: reducedAdditionalTime.mileage + additionalTime.data.mileage,
            expenses: reducedAdditionalTime.expenses + additionalTime.data.expenses
        }
    }, {
        activity_time: 0,
        travel_time: 0,
        mileage: 0,
        expenses: 0
    })
}

export default reducedAdditionalTime