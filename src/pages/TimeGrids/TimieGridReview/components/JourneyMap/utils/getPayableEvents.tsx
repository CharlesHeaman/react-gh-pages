import { EngineerPayablePeriodResponseData } from "../../../../../../types/engineerPayablePeriod.types";
import { TrackerActivityResponseData } from "../../../../../../types/trackerActivity.types";

const isPayable = (
    engineerPayablePeriod: EngineerPayablePeriodResponseData | undefined, 
    payFromGeofence: boolean,
    geofenceCount: number,
    homeCount: number,
    activity: TrackerActivityResponseData
): boolean => {
    if (engineerPayablePeriod) {
        return engineerPayablePeriod.data.start_date <= activity.data.date && activity.data.date <= engineerPayablePeriod.data.end_date
    }
    return payFromGeofence ? 
        geofenceCount === 1 || (geofenceCount === 2 && activity.data.event === 'Geofence Entered') :
        homeCount < 3
}

const getPayableEvents = (activityData: Array<TrackerActivityResponseData>, homeSiteID: string, engineerPayablePeriod: EngineerPayablePeriodResponseData | undefined): Array<boolean> => {
    let eventsArray = activityData.filter((activity) => ['Ignition On', 'Ignition Off', 'Geofence Entered'].includes(activity.data.event));
    let homeCount = 0;
    let geofenceCount = 0;
    let eventsPayable: Array<boolean> = [];
    let payFromGeofence = eventsArray.filter((activity) => activity.data.event === "Geofence Entered").length >= 2;
    for (let eventIndex = 0; eventIndex < eventsArray.length; eventIndex++) {
        if (eventsArray[eventIndex].data.event === 'Geofence Entered') geofenceCount++;
        if (eventsArray[eventIndex].data.site_id === homeSiteID) homeCount++;
        eventsPayable.push(isPayable(engineerPayablePeriod, payFromGeofence, geofenceCount, homeCount, eventsArray[eventIndex]))
    }
    return eventsPayable;
}

export default getPayableEvents