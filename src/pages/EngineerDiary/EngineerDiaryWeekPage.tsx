import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { CalendarActivityCollectionResponse, CalendarActivityResponseData } from "../../types/calendarActivity.types";
import { CalendarRecordCollectionResponse, CalendarRecordResponseData } from "../../types/calendarRecord.types";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../types/department.types";
import { DiaryNoteCollectionResponse, DiaryNoteResponseData } from "../../types/diaryNotes.types";
import { TicketCollectionResponse, TicketResponseData } from "../../types/tickets.types";
import { UserCollectionResponse, UserResponseData } from "../../types/user.types";
import formatDate from "../../utils/formatDate";
import getAPI from "../../utils/getAPI";
import getDayRelativeDate from "../../utils/getDayRelativeDate";
import getMonday from "../../utils/getMonday";
import CreateDiaryNote from "./components/CreateDiaryNote/CreateDiaryNote";
import EngineerDiaryNavigation from "./components/EngineerDairyNavigation";
import EngineerDiaryNotesWeek from "./components/EngineerDiaryNotesWeek";
import EngineerDairyPageNavigation from "./components/EngineerDiaryPageNavigation";
import EngineerDiaryTicketsWeek from "./components/EngineerDiaryTicketsWeek";
import getEngineerDiaryDate from "./utils/getEngineerDiaryDate";
import InnerContainer from "../../components/ui/Containers/InnerContainer/InnerContainer";

const EngineerDiaryWeekPage = () => {
    const { departmentName } = useParams();
    const [searchParams] = useSearchParams();

    // Form States
    const [currentCreateDate, setCurrentCreateDate] = useState<Date>();
    const [showCreate, setShowCreate] = useState(false);

    // Data States
    const [isNotesLoading, setIsNotesLoading] = useState(false);
    const [notesData, setNotesData] = useState<Array<DiaryNoteResponseData>>([]);
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isEngineersLoading, setIsEngineersLoading] = useState(false);
    const [engineerData, setEngineerData] = useState<Array<UserResponseData>>([]);
    const [isTicketsLoading, setIsTicketsLoading] = useState(false);
    const [ticketData, setTicketData] = useState<Array<TicketResponseData>>([]);
    const [isCalendarRecordsLoading, setIsCalendarRecordsLoading] = useState(true);
    const [calendarRecordsData, setCalendarRecordsData] = useState<Array<CalendarRecordResponseData>>([]);
    const [isActivitiesLoading, setIsActivitiesLoading] = useState(false);
    const [activityData, setActivityData] = useState<Array<CalendarActivityResponseData>>([]);

    const date = getEngineerDiaryDate(searchParams.get('date'));
    const firstDayOfWeek = getMonday(date);
    const lastDayOfWeek = getDayRelativeDate(date, 6);

    useEffect(() => {
        currentCreateDate && setShowCreate(true)
    }, [currentCreateDate]);

    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    useEffect(() => {
        getEngineers();
        getDiaryNotes();
    }, [departmentData, JSON.stringify(date)]);

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartmentData = departmentData.data[0];
            setDepartmentData(currentDepartmentData)
        }, setIsDepartmentLoading)
    }

    const getEngineers = () => {
        if (departmentData === undefined) return;
        getAPI('users', {
            is_active: true,
            is_engineer: true,
            is_diary_engineer: true,
            department_ids: [departmentData.id]
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setEngineerData(userData.data);
            if (userData.data.length > 0) {
                getTickets([...new Set(userData.data.map(user => user.id))]);
                getCalendarRecords([...new Set(userData.data.map(user => user.id))]);
            }
        }, setIsEngineersLoading);
    }

    const getExpandedEngineers = (userIDs: Array<number>) => {
        getAPI('users', {
            ids: userIDs,
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setEngineerData(userData.data);
            if (userData.data.length > 0) {
                getTickets([...new Set(userData.data.map(user => user.id))]);
                getCalendarRecords([...new Set(userData.data.map(user => user.id))]);
            }
        }, setIsEngineersLoading);
    }

    const getTickets = (userIDs: Array<number>) => {
        getAPI(`tickets`, {
            visit_after: firstDayOfWeek,
            visit_before: lastDayOfWeek,
            engineer_user_ids: userIDs
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData.data);
            const engineerIDs = [...new Set(ticketData.data.map(ticket => ticket.data.engineers).flat(1).map(engineer => engineer.user_id))];
            const otherDepartmentEngineerIDs = engineerIDs.filter(engineerID => !userIDs.includes(engineerID));
            if (otherDepartmentEngineerIDs.length > 0) {
                getExpandedEngineers(userIDs.concat(otherDepartmentEngineerIDs));
            }
        }, setIsTicketsLoading)    
    } 

    const getCalendarRecords = (userIDs: Array<number>) => {
        getAPI('calendar_records', {
            date_after: firstDayOfWeek,
            date_before: lastDayOfWeek,
            user_ids: userIDs
        }, (response: any) => {
            const calendarRecords: CalendarRecordCollectionResponse = response.data;
            setCalendarRecordsData(calendarRecords.data)
            if (calendarRecords.data.length > 0) {
                getActivities([...new Set(calendarRecords.data.map(calendarRecord => calendarRecord.data.calendar_event_id))]);
            }
        }, setIsCalendarRecordsLoading)
    }

    const getActivities = (activityIDs: Array<number>) => {
        getAPI('calendar_activities', {
            ids: activityIDs,
        }, (response: any) => {
            const activityData: CalendarActivityCollectionResponse = response.data;
            setActivityData(activityData.data)
        }, setIsActivitiesLoading);
    }

    const getDiaryNotes = () => {
        if (departmentData === undefined) return;
        getAPI('diary_notes', {
            date_after: firstDayOfWeek,
            date_before: lastDayOfWeek,
            department_id: departmentData.id
        }, (response: any) => {
            const diaryNotes: DiaryNoteCollectionResponse = response.data;
            setNotesData(diaryNotes.data);
            if (diaryNotes.data.length > 0) {
                getUsers([...new Set(diaryNotes.data.map(note => note.data.created_by_id))]);
            }
        }, setIsNotesLoading)
    }

    const getUsers = (userIDs: Array<number>) => {
        getAPI('users', {
            ids: userIDs,
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)   
    }

    return (
        <>
            <EngineerDairyPageNavigation location='week'/>
            <OuterContainer 
                title={`Engineer Diary Week Starting ${formatDate(firstDayOfWeek)}`}
                description="View planned labour. Assign tickets to engineers. Create notes."
                maxWidth={1200}
                noBorder
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <EngineerDiaryNavigation week/>
                        <section>
                            <InnerContainer>
                                {departmentData ? <EngineerDiaryTicketsWeek
                                    department={departmentData}
                                    startDate={firstDayOfWeek} 
                                    tickets={ticketData}
                                    engineers={engineerData}
                                    calendarRecords={calendarRecordsData}
                                    activities={activityData}
                                /> : null}
                            </InnerContainer>
                        </section>
                        <section>
                            <InnerContainer>
                                <EngineerDiaryNotesWeek
                                    startDate={firstDayOfWeek} 
                                    diaryNotes={notesData}
                                    users={userData}
                                    setCurrentCreateDate={setCurrentCreateDate}
                                />
                            </InnerContainer>
                        </section>
                    </div>
                </div>
            </OuterContainer>

            <CreateDiaryNote 
                show={showCreate} 
                hideFunc={() => setShowCreate(false)} 
                getDiaryNotes={getDiaryNotes}
                currentCreateDate={currentCreateDate}  
                departmentID={departmentData ? departmentData.id : 0}               
            />
        </>
    )
}

export default EngineerDiaryWeekPage
