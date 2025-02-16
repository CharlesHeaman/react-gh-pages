import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer"
import DeactivateOverlay from "../../components/ui/DeactivateModule/DeactivateOverlay"
import { CalendarActivityCollectionResponse, CalendarActivityResponseData } from "../../types/calendarActivity.types"
import { CalendarRecordCollectionResponse, CalendarRecordResponseData } from "../../types/calendarRecord.types"
import { UserCollectionResponse, UserResponseData } from "../../types/user.types"
import deleteAPI from "../../utils/deleteAPI"
import getAPI from "../../utils/getAPI"
import getDayRelativeDate from "../../utils/getDayRelativeDate"
import getFirstDayOfMonth from "../../utils/getFirstDayOfMonth"
import getLastDayOfMonth from "../../utils/getLastDayOfMonth"
import getMonday from "../../utils/getMonday"
import OnCallCalendarNavigation from "../OnCallCalendar/components/OnCallCalendar/components/OnCallCalendarNavigation"
import getOnCallCalendarDate from "../OnCallCalendar/utils/getOnCallCalendarDate"
import CreateCalendarRecord from "./components/CreateCalendarRecord"
import HolidayCalendar from "./components/HolidayCalendar"
import PermsProtectedComponent from "../../components/PermsProtectedComponent"

const HolidayCalendarPage = () => {
    const [searchParams] = useSearchParams();

    const [isDeleting, setIsDeleting] = useState(false);

    const [currentSelected, setCurrentSelected] = useState<number>(0);
    const [showDelete, setShowDelete] = useState(false);
    const [currentCreateDate, setCurrentCreateDate] = useState<Date>();
    const [showCreate, setShowCreate] = useState(false);

    const [isCalendarRecordsLoading, setIsCalendarRecordsLoading] = useState(true);
    const [calendarRecordsData, setCalendarRecordsData] = useState<Array<CalendarRecordResponseData>>([]);
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);
    const [isActivitiesLoading, setIsActivitiesLoading] = useState(false);
    const [activityData, setActivityData] = useState<Array<CalendarActivityResponseData>>([]);

    const date = getOnCallCalendarDate(searchParams.get('date'));

    const firstDayOfMonth = getFirstDayOfMonth(date);
    const lastDayOfMonth = getLastDayOfMonth(date);
    const startDate = getMonday(new Date(firstDayOfMonth));

    useEffect(() => {
        getCalendarRecords();
    }, [searchParams])

    useEffect(() => {
        currentSelected > 0 && setShowDelete(true)
    }, [currentSelected])

    useEffect(() => {
        currentCreateDate && setShowCreate(true)
    }, [currentCreateDate])

    const getCalendarRecords = () => {
        getAPI('calendar_records', {
            date_after: startDate,
            date_before: getDayRelativeDate(startDate, 6 * 7)
        }, (response: any) => {
            const calendarRecords: CalendarRecordCollectionResponse = response.data;
            setCalendarRecordsData(calendarRecords.data)
            if (calendarRecords.data.length > 0) {
                getUsers([...new Set(calendarRecords.data.map(calendarRecord => calendarRecord.data.user_id))]);
                getActivities([...new Set(calendarRecords.data.map(calendarRecord => calendarRecord.data.calendar_event_id))]);
            }
        }, setIsCalendarRecordsLoading)
    }

    const getUsers = (userIDs: Array<number>) => {
        getAPI('users', {
            ids: userIDs,
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)   
    }

    const getActivities = (activityIDs: Array<number>) => {
        getAPI('calendar_activities', {
            ids: activityIDs,
        }, (response: any) => {
            const activityData: CalendarActivityCollectionResponse = response.data;
            setActivityData(activityData.data)
        }, setIsActivitiesLoading)   
    }

    const deleteRecord = () => {
        deleteAPI(`calendar_records/${currentSelected}/delete`, {}, () => {
            getCalendarRecords();
            setShowDelete(false);
        }, setIsDeleting)   
    }

    return (
        <>
            <OuterContainer 
                title={`Employee Calendar ${(date).toLocaleString('default', { month: 'long', year: 'numeric' })}`}
                description="Add and remove records of employee holidays, absences and other activities."
                maxWidth={1400}
                noBorder
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <OnCallCalendarNavigation
                            showAdd={() => {
                                setCurrentCreateDate(undefined);
                                setShowCreate(true);
                            }}
                            resourceName="Calendar Record"
                        />
                        <HolidayCalendar
                            startDate={startDate}
                            firstDayOfMonth={firstDayOfMonth}
                            lastDayOfMonth={lastDayOfMonth}
                            calendarRecords={calendarRecordsData}
                            activities={activityData}
                            users={userData}
                            setCurrentSelected={setCurrentSelected}
                            setCurrentCreateDate={setCurrentCreateDate}
                        />
                    </div>
                </div>
            </OuterContainer>

            <CreateCalendarRecord
                show={showCreate}
                hideFunc={() => setShowCreate(false)}
                currentCreateDate={currentCreateDate}
                getCalendarRecords={getCalendarRecords}
            />

            <PermsProtectedComponent requiredPerms={{ calendars: 2 }}>
                <DeactivateOverlay 
                    resourceName="Calendar Record"
                    additionalText='This cannot be undone.'
                    show={showDelete} 
                    hideFunc={() => setShowDelete(false)} 
                    isSubmitting={isDeleting} 
                    submitFunc={deleteRecord}
                    actionName="Delete"
                    presentParticiple="Deleting"
                />
            </PermsProtectedComponent>
        </>
    )
}

export default HolidayCalendarPage