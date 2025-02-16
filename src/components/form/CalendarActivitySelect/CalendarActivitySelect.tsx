import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import getAPI from "../../../utils/getAPI";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { CalendarActivityCollectionResponse, CalendarActivityResponseData } from "../../../types/calendarActivity.types";
import Label from "../../ui/General/Label/Label";
import getCalendarRecordIcon from "../../../pages/HolidayCalendar/components/getCalendarRecordIcon";

const CalendarActivitySelect = (props: {
    selectedActivity: CalendarActivityResponseData | undefined,
    setSelectedActivity: Dispatch<SetStateAction<CalendarActivityResponseData | undefined>>,
    required?: boolean,
    hasSubmitted: boolean
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isActivitiesLoading, setIsActivitiesLoading] = useState(false);
    const [activitiesData, setActivitiesData] = useState<CalendarActivityCollectionResponse>();

    useEffect(() => {
        getActivities();
    }, [searchTerm])

    const getActivities = () => {
        getAPI('calendar_activities', {
            name_like: searchTerm,
            is_active: true,
        }, (response: any) => {
            const costCentreData: CalendarActivityCollectionResponse = response.data;
            setActivitiesData(costCentreData);
        }, setIsActivitiesLoading);
    }

    const showRequired = props.selectedActivity === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont={props.selectedActivity ? getCalendarRecordIcon(props.selectedActivity.id) : "event_note"}
                resourceName="activity"
                resourceNamePlural="activities"
                selectedText={props.selectedActivity ? props.selectedActivity.data.name : undefined}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={activitiesData ? activitiesData.data.map(activity => {
                    return {
                        text: activity.data.name,
                        clickFunc: () => props.setSelectedActivity(activity),
                        selected: props.selectedActivity?.id === activity.id,
                        icon: <Label 
                            iconFont={getCalendarRecordIcon(activity.id)}
                            noBackground
                        />,                    
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Type is required`}
                show={showRequired}
            />}
        </>
    )
}

export default CalendarActivitySelect