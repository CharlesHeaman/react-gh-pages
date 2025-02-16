import { useEffect, useState } from "react";
import SubmitButton from "../../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { EngineerPayablePeriodResponseData } from "../../../../../types/engineerPayablePeriod.types";
import { TrackerActivityResponseData } from "../../../../../types/trackerActivity.types";
import { TrackerSiteResponseData } from "../../../../../types/trackerSites.types";
import { UserResponseData } from "../../../../../types/user.types";
import findTrackerSite from "../../../../../utils/findTrackerSite";
import formatDate from "../../../../../utils/formatDate";
import formatTime from "../../../../../utils/formatTime";
import getUserFullName from "../../../../../utils/getUserFullName";
import postAPI from "../../../../../utils/postAPI";
import getPayableEvents from "../JourneyMap/utils/getPayableEvents";
import getTrackerEventLabel from "../JourneyMap/utils/getTrackerEventLabel";
import getEventSelectionOption from "./utils/getEventSelectionOption";
import EventSelectionOption from "./utils/getEventSelectionOption";

const EditPayablePeriod = (props: {
    timegridID: number,
    userData: UserResponseData,
    date: Date,
    activityData: Array<TrackerActivityResponseData>, 
    trackerSites: Array<TrackerSiteResponseData>,
    homeSiteID: string, 
    show: boolean,
    hideFunc: () => void,
    resFunc: () => void,
    engineerPayablePeriod: EngineerPayablePeriodResponseData | undefined,
}) => {
    const eventsPayable = getPayableEvents(props.activityData, props.homeSiteID, props.engineerPayablePeriod);  
    const [submitting, setSubmitting] = useState(false);

    const getFirstPayable = () => {
        return eventsPayable.findIndex(event => event);
    }

    const getLastPayable = () => {
        return (eventsPayable.length - 1) - eventsPayable.reverse().findIndex(event => event);
    }

    const [selectedStart, setSelectedStart] = useState(getFirstPayable());
    const [selectedEnd, setSelectedEnd] = useState(getLastPayable());

    useEffect(() => {
        setSelectedEnd(getLastPayable());
        setSelectedStart(getFirstPayable())
      
    }, [props.activityData, props.homeSiteID])

    const editPayablePeriod = () => {
        postAPI(`engineer_payable_period/create`, {}, {
            timegrid_id: props.timegridID,
            start_date: props.activityData.filter((activity) => ['Ignition On', 'Ignition Off', 'Geofence Entered'].includes(activity.data.event))[selectedStart].data.date,
            end_date: props.activityData.filter((activity) => ['Ignition On', 'Ignition Off', 'Geofence Entered'].includes(activity.data.event))[selectedEnd].data.date
        }, () => {
            props.resFunc();
            props.hideFunc();
        }, setSubmitting)
    }

    return (
        <WindowOverlay 
            title={"Edit Payable Period"} 
            maxWidth={500} 
            hideFunc={props.hideFunc} 
            show={props.show} 
        >
            <p>Edit payable period for {getUserFullName(props.userData)} on {formatDate(props.date)}.</p>
            <InfoGrid>
                <GridItem title='Start Time'>
                    <select
                        onChange={(e) => setSelectedStart(parseInt(e.target.value))}
                    >
                        {props.activityData.filter((activity) => ['Ignition On', 'Ignition Off', 'Geofence Entered'].includes(activity.data.event)).map((activity, index) =>
                            <option 
                                value={index}
                                selected={selectedStart === index}
                                key={index}
                            >
                                {getEventSelectionOption(activity, findTrackerSite(props.trackerSites, activity.data.site_id))}
                            </option>
                        )}
                    </select>
                </GridItem>
                <GridItem title='End Time'>
                    <select
                        onChange={(e) => setSelectedEnd(parseInt(e.target.value))}
                    >
                        {props.activityData.filter((activity) => ['Ignition On', 'Ignition Off', 'Geofence Entered'].includes(activity.data.event)).map((activity, index) =>
                            <option 
                                value={index}
                                selected={selectedEnd === index}
                                key={index}
                            >
                                {getEventSelectionOption(activity, findTrackerSite(props.trackerSites, activity.data.site_id))}
                            </option>
                        )}
                    </select>
                </GridItem>
            </InfoGrid>
            <SubmitButton
                text='Edit Payable Period'
                color="orange"
                clickFunc={editPayablePeriod}
                submitting={submitting}
                submittingText='Editing...'
            />
        </WindowOverlay>
    )
}

export default EditPayablePeriod