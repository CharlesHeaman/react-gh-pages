import { EngineerPayablePeriodResponseData } from "../../../../../../types/engineerPayablePeriod.types";
import { TrackerActivityResponseData } from "../../../../../../types/trackerActivity.types";
import { TrackerSiteResponseData } from "../../../../../../types/trackerSites.types";

export interface TripSection {
    type: string,
    start?: Date,
    end?: Date,
    isPayable: boolean,
    isHome?: boolean,
    loc?: string,
    startLoc?: string,
    endLoc?: string,
    distance?: number,
    lat?: number,
    lng?: number,
    siteID?: string | null | undefined, 
    siteName?: string | null | undefined,
    startSiteID?: string | null | undefined, 
    startSiteName?: string | null | undefined,
    endSiteID?: string | null | undefined, 
    endSiteName?: string | null | undefined
}

const formatTravel = (
    currentActivity: TrackerActivityResponseData, 
    nextActivity: TrackerActivityResponseData, 
    sites: Array<TrackerSiteResponseData>, 
    homeCount: number, 
    geofenceCount: number, 
    payFromGeofence: boolean,
    engineerPayablePeriod: EngineerPayablePeriodResponseData | undefined
) => {
    return {
        type: 'Travel',
        start: currentActivity.data.date,
        end: nextActivity.data.date,
        distance: nextActivity.data.distance,
        startLoc: currentActivity.data.loc,
        endLoc: nextActivity.data.loc,
        startSiteID: currentActivity.data.site_id,
        endSiteID: nextActivity.data.site_id,
        startSiteName: sites.find((site) => site.id === currentActivity.data.site_id) ? sites.find((site) => site.id === currentActivity.data.site_id)?.data.name : null,
        endSiteName: sites.find((site) => site.id === nextActivity.data.site_id) ? sites.find((site) => site.id === nextActivity.data.site_id)?.data.name : null,
        isPayable: engineerPayablePeriod ? 
            (currentActivity.data.date >= engineerPayablePeriod.data.start_date && engineerPayablePeriod.data.end_date >= nextActivity.data.date) :
            payFromGeofence ? 
                geofenceCount === 1 :
                homeCount < 1
    }
}

const formatOnSite = (
    currentActivity: TrackerActivityResponseData, 
    lastActivity: TrackerActivityResponseData, 
    sites: Array<TrackerSiteResponseData>, 
    homeSiteID: string | undefined, 
    homeCount: number, 
    geofenceCount: number, 
    payFromGeofence: boolean,
    engineerPayablePeriod: EngineerPayablePeriodResponseData | undefined
) => {
    return {
        type: currentActivity.data.site_id === homeSiteID ? 'Home' : 'On-site',
        start: lastActivity.data.date,
        end: currentActivity.data.date,
        loc: currentActivity.data.loc,
        siteID: currentActivity.data.site_id,
        siteName: sites.find((site) => site.id === currentActivity.data.site_id) ? sites.find((site) => site.id === currentActivity.data.site_id)?.data.name : null,
        lat: currentActivity.data.lat,
        lng: currentActivity.data.lng,
        isHome: currentActivity.data.site_id === homeSiteID,
        isPayable: engineerPayablePeriod ? 
            (lastActivity.data.date >= engineerPayablePeriod.data.start_date && engineerPayablePeriod.data.end_date >= currentActivity.data.date) :
            payFromGeofence ? 
                geofenceCount === 1 :
                homeCount < 1
    }
}

const getTripSections = (
    activity: Array<TrackerActivityResponseData>, 
    sites: Array<TrackerSiteResponseData>, 
    homeSiteID: string | undefined,
    engineerPayablePeriod: EngineerPayablePeriodResponseData | undefined
): Array<TripSection> => {
    let startStopArray = activity.filter((activity) => ['Ignition On', 'Ignition Off'].includes(activity.data.event))
    if (startStopArray.length % 2 === 1) {
        startStopArray.pop();
    }
    let geofenceArray = activity.filter((activity) => ['Geofence Entered'].includes(activity.data.event))
    let tripSections: Array<TripSection> = [];
    let homeCount = 0;
    let geofenceCount = 0;
    let payFromGeofence = geofenceArray.length >= 2;

    for (let activityIndex = 0; activityIndex < startStopArray.length; activityIndex += 2) {
        if (startStopArray.length > activityIndex + 1) {
            let currentActivity = startStopArray[activityIndex];
            let nextActivity = startStopArray[activityIndex + 1];
            if (activityIndex > 0) {
                let lastActivity = startStopArray[activityIndex - 1];
                if (currentActivity.data.site_id === homeSiteID) homeCount++;
                // On-site/Home
                tripSections.push(formatOnSite(currentActivity, lastActivity, sites, homeSiteID, homeCount, geofenceCount, payFromGeofence, engineerPayablePeriod))
            }
            if (geofenceArray.length > 0) {
                let nextGeofence = geofenceArray[0];
                if (new Date(currentActivity.data.date).getTime() < new Date(nextGeofence.data.date).getTime() && new Date(nextGeofence.data.date).getTime() < new Date(nextActivity.data.date).getTime()) {
                    // Travel to Geofence
                    tripSections.push(formatTravel(currentActivity, nextGeofence, sites, homeCount, geofenceCount, payFromGeofence, engineerPayablePeriod))
                    // Geofence
                    geofenceCount++;
                    tripSections.push({
                        type: 'Geofence',
                        start: nextGeofence.data.date,
                        siteID: nextGeofence.data.site_id,
                        siteName: sites.find((site) => site.id === nextGeofence.data.site_id) ? sites.find((site) => site.id === nextGeofence.data.site_id)?.data.name : null,
                        loc: nextGeofence.data.loc,
                        lat: nextGeofence.data.lat,
                        lng: nextGeofence.data.lng,
                        isPayable: engineerPayablePeriod ? 
                            (nextGeofence.data.date >= engineerPayablePeriod.data.start_date && engineerPayablePeriod.data.end_date >= nextGeofence.data.date) :
                            (geofenceCount > 0 && geofenceCount < 3)
                    })
                    nextActivity = {
                        ...nextActivity,
                        data: {
                            ...nextActivity.data, 
                            distance: nextActivity.data.distance - nextGeofence.data.distance
                        }
                    }
                    // Travel from Geofence 
                    tripSections.push(formatTravel(nextGeofence, nextActivity, sites, homeCount, geofenceCount, payFromGeofence, engineerPayablePeriod))
                    geofenceArray.shift();
                    continue;
                }
            }
            // Travel with no Geofence
            tripSections.push(formatTravel(currentActivity, nextActivity, sites, homeCount, geofenceCount, payFromGeofence, engineerPayablePeriod))
        }
    }
    return tripSections
}

export default getTripSections