import { Dispatch, SetStateAction } from "react";
import { EngineerPayablePeriodResponseData } from "../../../../../../types/engineerPayablePeriod.types";
import { TrackerActivityResponseData } from "../../../../../../types/trackerActivity.types";
import { TrackerSiteResponseData } from "../../../../../../types/trackerSites.types";
import formatMiles from "../../../../../../utils/formatMiles";
import formatTime from "../../../../../../utils/formatTime";
import getPayableEvents from "../utils/getPayableEvents";
import getTrackerEventLabel from "../utils/getTrackerEventLabel";
import getSiteLabel from "./getSiteLabel";

function JourneyEvents(props: {
    activityData: Array<TrackerActivityResponseData>, 
    sites: Array<TrackerSiteResponseData>,
    homeSiteID: string, 
    workSiteID: string | null,
    currentActivityID: string,
    setCurrentActivityID: Dispatch<SetStateAction<string>>,
    resetSelection: () => void,
    engineerPayablePeriod: EngineerPayablePeriodResponseData | undefined,
}) {

    const eventsPayable = getPayableEvents(props.activityData, props.homeSiteID, props.engineerPayablePeriod);  

    return (
        <table className="selectTable">
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Time</th>
                    <th>Site</th>
                    <th>Miles</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {props.activityData.filter((activity) => ['Ignition On', 'Ignition Off', 'Geofence Entered'].includes(activity.data.event)).map((activity, index) =>
                    <tr 
                        style={{ opacity: (eventsPayable[index] || props.currentActivityID === activity.id) ? '1' : '0.5'}}
                        className={props.currentActivityID === activity.id ? 'selectedRow' : '' }
                        onClick={() => { 
                            props.resetSelection(); 
                            props.setCurrentActivityID(String(activity.id)); 
                        }}
                        key={index}
                    >
                        <td>{getTrackerEventLabel(activity.data.event)}</td>
                        <td style={{ whiteSpace: 'nowrap'}}>{formatTime(activity.data.date)}</td>
                        <td>{getSiteLabel(activity.data.site_id, props.sites, props.homeSiteID, props.workSiteID)}</td>
                        <td style={{ whiteSpace: 'nowrap'}}>{formatMiles(activity.data.distance) > 0 ? `${formatMiles(activity.data.distance)} mi` : null}</td>
                        <td 
                            className="text-left"
                            style={{ whiteSpace: 'nowrap'}}
                        >{activity.data.loc}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
} 

export default JourneyEvents