import { TrackerActivityResponseData } from "../../../../../../types/trackerActivity.types"
import { TrackerSiteResponseData } from "../../../../../../types/trackerSites.types"
import formatTime from "../../../../../../utils/formatTime"
import getTrackerEventLabel from "../../JourneyMap/utils/getTrackerEventLabel"

const getEventSelectionOption = (activity: TrackerActivityResponseData, site: TrackerSiteResponseData | undefined): string => {
    return (
        `${formatTime(activity.data.date)} [${getTrackerEventLabel(activity.data.event)?.props.text}] ${site ? `- ${site.data.name}` : ''}`
    )
}

export default getEventSelectionOption