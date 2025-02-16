import { AdditionalTimeActivityResponseData } from "../types/additionalTimeActivity.types";

const findAdditionalTimeActivity = (activityData: Array<AdditionalTimeActivityResponseData>, activityID: number) => {
    return activityData.find((activity) => activity.id === Number(activityID));
}

export default findAdditionalTimeActivity