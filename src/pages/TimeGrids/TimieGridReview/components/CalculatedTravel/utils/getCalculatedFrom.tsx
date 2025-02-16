import { EngineerPayablePeriodResponseData } from "../../../../../../types/engineerPayablePeriod.types";
import { TrackerActivityResponseData } from "../../../../../../types/trackerActivity.types";
import formatTime from "../../../../../../utils/formatTime";
import getTrackerEventLabel from "../../JourneyMap/utils/getTrackerEventLabel";

const getCalculatedFrom = (eventsPayable: Array<boolean>, eventsArray: Array<TrackerActivityResponseData>, homeSiteID: string, engineerPayablePeriod: EngineerPayablePeriodResponseData | undefined) => {
    let firstEvent: TrackerActivityResponseData | undefined;
    if (engineerPayablePeriod !== undefined) {
        firstEvent = eventsArray.find(event => event.data.date === engineerPayablePeriod.data.start_date);
    } else {
        const firstEventIndex = eventsPayable.indexOf(true);
        if (firstEventIndex >= 0 && eventsArray.length > firstEventIndex) {
            firstEvent = eventsArray[firstEventIndex];
        }
    }
    if (firstEvent) {
        if (firstEvent.data.site_id === homeSiteID) {
            return <>
                {getTrackerEventLabel('Home')} at {formatTime(firstEvent.data.date)}&nbsp;
            </>
        }
        return  <>
            {getTrackerEventLabel(firstEvent.data.event)} at {formatTime(firstEvent.data.date)}&nbsp;
        </>
    }
}

export default getCalculatedFrom