import { EngineerPayablePeriodResponseData } from "../../../../../../types/engineerPayablePeriod.types";
import { TrackerActivityResponseData } from "../../../../../../types/trackerActivity.types";
import formatTime from "../../../../../../utils/formatTime";
import getTrackerEventLabel from "../../JourneyMap/utils/getTrackerEventLabel";

const getCalculatedTo = (eventsPayable: Array<boolean>, eventsArray: Array<TrackerActivityResponseData>, homeSiteID: string, engineerPayablePeriod: EngineerPayablePeriodResponseData | undefined) => {
    let lastEvent: TrackerActivityResponseData | undefined;
    if (engineerPayablePeriod !== undefined) {
        lastEvent = eventsArray.find(event => event.data.date === engineerPayablePeriod.data.end_date);
    } else {
        const lastEventIndex = eventsPayable.lastIndexOf(true);
        if (lastEventIndex >= 0 && eventsArray.length > lastEventIndex) {
            lastEvent = eventsArray[lastEventIndex];
        }
    }
    if (lastEvent) {
        if (lastEvent.data.site_id === homeSiteID) {
            return <>
                {getTrackerEventLabel('Home')} at {formatTime(lastEvent.data.date)}&nbsp;
            </>
        }
        return  <>
            {getTrackerEventLabel(lastEvent.data.event)} at {formatTime(lastEvent.data.date)}&nbsp;
        </>
    }
}

export default getCalculatedTo