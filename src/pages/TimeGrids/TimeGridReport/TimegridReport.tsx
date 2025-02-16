import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import NoneFound from "../../../components/ui/General/NoneFound/NoneFound";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import Header from "../../../components/ui/Structure/Header/Header";
import { AdditionalTimeActivityCollectionResponse, AdditionalTimeActivityResponseData } from "../../../types/additionalTimeActivity.types";
import { AdditionalTimeCollectionResponse, AdditionalTimeResponseData } from "../../../types/additionalTime.types";
import { CalendarActivityCollectionResponse, CalendarActivityResponseData } from "../../../types/calendarActivity.types";
import { CalendarRecordCollectionResponse, CalendarRecordResponseData } from "../../../types/calendarRecord.types";
import { CustomerCollectionResponse, CustomerResponseData } from "../../../types/customers.types";
import { DepartmentResponseData } from "../../../types/department.types";
import { OnCallEngineerCollectionResponse, OnCallEngineerResponseData } from "../../../types/OnCallEngineer.types";
import { TicketCollectionResponse, TicketResponseData } from "../../../types/tickets.types";
import { TimegridCollectionResponse, TimegridResponseData } from "../../../types/timegrid.types";
import { TimegridNoteCollectionResponse, TimegridNoteResponseData } from "../../../types/timegridNote.types";
import { TimegridTicketTimeCollectionResponse, TimegridTicketTimeResponseData } from "../../../types/timegridTicketTime.types";
import { UserCollectionResponse, UserResponseData } from "../../../types/user.types";
import filterUserAdditionalTime from "../../../utils/filterUserAdditionalTime";
import filterUserCalendarRecords from "../../../utils/filterUserCalendarRecords";
import filterUserOnCallEngineers from "../../../utils/filterUserOnCallEngineers";
import filterUserTimegrids from "../../../utils/filterUserTimegrids";
import filterUserTimegridTicketTime from "../../../utils/filterUserTimegridTicketTime";
import formatDate from "../../../utils/formatDate";
import getAPI from "../../../utils/getAPI";
import getDayRelativeDate from "../../../utils/getDayRelativeDate";
import getMonday from "../../../utils/getMonday";
import TimegridReportSkeleton from "./components/TimeGridReportSkeleton";
import TimegridReportUser from "./components/TimegridReportUser/TimegridReportUser";

const TimegridReport = () => {
    const {departmentName} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [usersData, setUsersData] = useState<Array<UserResponseData>>([]);
    const [isTimegridsLoading, setIsTimegridsLoading] = useState(false);
    const [timegridData, setTimegridData] = useState<Array<TimegridResponseData>>([]);
    const [isTicketsLoading, setIsTicketsLoading] = useState(false);
    const [ticketData, setTicketData] = useState<Array<TicketResponseData>>([]);
    const [isNotesLoading, setIsNotesLoading] = useState(false);
    const [notesData, setNotesData] = useState<Array<TimegridNoteResponseData>>([]);
    const [isTimegridTicketTimeLoading, setIsTimegridTicketTimeLoading] = useState(false);
    const [timegridTicketTimeData, setTimegridTicketTimeData] = useState<Array<TimegridTicketTimeResponseData>>([]);
    const [isAdditionalTimeLoading, setIsAdditionalTimeLoading] = useState(false);
    const [additionalTimeData, setAdditionalTimeData] = useState<Array<AdditionalTimeResponseData>>([]);
    const [isAdditionalTimeActivityLoading, setIsAdditionalTimeActivityLoading] = useState(false);
    const [additionalTimeActivityData, setAdditionalTimeActivityData] = useState<Array<AdditionalTimeActivityResponseData>>([]);
    const [isCalendarRecordsLoading, setIsCalendarRecordsLoading] = useState(false);
    const [calendarRecordsData, setCalendarRecordsData] = useState<Array<CalendarRecordResponseData>>([]);
    const [isCalendarActivitiesLoading, setIsCalendarActivitiesLoading] = useState(false);
    const [calendarActivitiesData, setCalendarActivitiesData] = useState<Array<CalendarActivityResponseData>>([]);
    const [isOnCallEngineersLoading, setIsOnCallEngineersLoading] = useState(false);
    const [onCallEngineerData, setOnCallEngineerData] = useState<Array<OnCallEngineerResponseData>>([]);
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<Array<CustomerResponseData>>([]);
    const [isNotesUsersLoading, setIsNotesUsersLoading] = useState(false);
    const [notesUsersData, setNotesUsersData] = useState<Array<UserResponseData>>([]);

    const startDate = getMonday(new Date(searchParams.get('date') as string));
    const endDate = getDayRelativeDate(startDate, 6);

    useEffect(() => {
        isSpecificDepartment() && getDepartment();
        getUsers();
    }, [searchParams])

    const getDepartment = () => {
        getAPI(`departments/${searchParams.get("department")}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
    }

    const getUsers = () => {
        const params = isSpecificEngineer() ? {
            ids: [searchParams.get("engineer")]
        } : isSpecificDepartment() ? {
            department_ids: [searchParams.get("department")],
            is_timegrid_engineer: true
        }: {
            is_timegrid_engineer: true
        }
        getAPI('users', params, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUsersData(userData.data);
            if (userData.data.length > 0) {
                getTimegrids(userData.data.map(user => user.id));
                getTicketData(userData.data.map(user => user.id));
                getTimegridNotes(userData.data.map(user => user.id));
                getAdditionalTime(userData.data.map(user => user.id));
                getCalendarRecords(userData.data.map(user => user.id));
                getOnCallEngineers(userData.data.map(user => user.id));
            }
        }, setIsUsersLoading);
    }

    const getTimegrids = (userIDs: Array<number>) => {
        getAPI('timegrids', {
            user_ids: userIDs,
            date_after: startDate,
            date_before: endDate
        }, (response: any) => {
            const timegridData: TimegridCollectionResponse = response.data;
            setTimegridData(timegridData.data);
        }, setIsTimegridsLoading)
    }

    const getTicketData = (userIDs: Array<number>) => {
        const ticketEnd = new Date(endDate.setHours(23, 59, 59, 999));
        getAPI('tickets', {
            engineer_user_ids: userIDs,
            visit_after: startDate,
            visit_before: ticketEnd,
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData.data);
            if (ticketData.data.length > 0) {
                getTimegridTicketTime([...new Set(ticketData.data.map((ticket) => {
                    return {
                        ticket_id: ticket.id,
                        ticket_type: ticket.data.ticket_type
                    }
                }))]);
                getCustomerData([...new Set(ticketData.data.map(ticket => ticket.data.customer_id))]);
            }
        }, setIsTicketsLoading);
    }

    const getCustomerData = (customerIDs: Array<number>) => {
        getAPI(`customers`, {
            ids: customerIDs,
            include_inactive: true
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomerData(customerData.data);
        }, setIsCustomerLoading);
    }

    const getTimegridNotes = (userIDs: Array<number>) => {
        getAPI(`timegrid_notes`, {
            user_ids: userIDs,
            date_after: startDate,
            date_before: endDate
        }, (response: any) => {
            const notesData: TimegridNoteCollectionResponse = response.data;
            setNotesData(notesData.data);
            getNotesUserData([...new Set(notesData.data.map(note => note.data.created_by_id))])
        }, setIsNotesLoading);
    }

    const getNotesUserData = (userIDs: Array<number>) => {
        getAPI(`users`, {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setNotesUsersData(userData.data);
        }, setIsNotesUsersLoading);
    }

    const getAdditionalTime = (userIDs: Array<number>) => {
        getAPI(`additional_time`, {
            user_ids: userIDs,
            date_after: startDate,
            date_before: endDate 
        }, (response: any) => {
            const additionalTime: AdditionalTimeCollectionResponse = response.data;
            setAdditionalTimeData(additionalTime.data);
            getActivitiesData([...new Set(additionalTime.data.map(additionalTime => additionalTime.data.activity_id))]);
        }, setIsAdditionalTimeLoading);
    }

    const getCalendarRecords = (userIDs: Array<number>) => {
        getAPI(`calendar_records`, {
            user_ids: userIDs,
            date_after: startDate,
            date_before: endDate 
        }, (response: any) => {
            const calendarRecords: CalendarRecordCollectionResponse = response.data;
            setCalendarRecordsData(calendarRecords.data);
            if (calendarRecords.data.length > 0) getCalendarActivities([...new Set(calendarRecords.data.map(activity => activity.data.calendar_event_id))]);
        }, setIsCalendarRecordsLoading);
    }

    const getCalendarActivities = (activityIDs: Array<number>) => {
        getAPI(`calendar_activities`, {
            ids: activityIDs,
        }, (response: any) => {
            const calendarActivitiesData: CalendarActivityCollectionResponse = response.data;
            setCalendarActivitiesData(calendarActivitiesData.data);
        }, setIsCalendarActivitiesLoading);
    }


    const getActivitiesData = (activityIds: Array<number>) => {
        getAPI('additional_time_activity', {
            ids: activityIds,
        }, (response: any) => {
            const additionalTimeActivityData: AdditionalTimeActivityCollectionResponse = response.data;
            setAdditionalTimeActivityData(additionalTimeActivityData.data);
        }, setIsAdditionalTimeActivityLoading);
    }

    const getTimegridTicketTime = (tickets: Array<any>) => {
        getAPI(`timegrid_ticket_time`, {
            tickets: tickets
        }, (response: any) => {
            const timegridTicketTimeData: TimegridTicketTimeCollectionResponse = response.data;
            setTimegridTicketTimeData(timegridTicketTimeData.data);
        }, setIsTimegridTicketTimeLoading);
    }

    const getOnCallEngineers = (userIDs: Array<number>) => {
        getAPI('on_call_engineers', {
            user_ids: userIDs,
            date_after: startDate,
            date_before: endDate 
        }, (response: any) => {
            const onCallEngineerData: OnCallEngineerCollectionResponse = response.data;
            setOnCallEngineerData(onCallEngineerData.data);
        }, setIsOnCallEngineersLoading)
    }

    const isSpecificDepartment = () => {
        return searchParams.get("department") as string !== "-1";
    }

    const isSpecificEngineer = () => {
        return searchParams.get("engineer") as string !== "-1";
    }

    const getUserFullName = () => {
        return usersData && usersData[0] ? `${usersData[0].data.first_name} ${usersData[0].data.last_name}` : ''
    }

    const getDepartmentName = () => {
        return `all ${departmentData ? departmentData.data.name.toLowerCase() : ''} department engineers`
    }

    const getReportDescription = () => {
        return `Timegrid ${searchParams.get('accounts') === "true" ? 'accounts' : ''} report for ${isSpecificEngineer() ? getUserFullName() : getDepartmentName()} for week starting ${formatDate(startDate).toLowerCase()}.` 
    }

    const isHeaderLoading = () => {
        return (
            isDepartmentLoading ||
            isUsersLoading
        )
    }

    const isLoading = () => {
        return (
            isUsersLoading ||
            isTimegridsLoading || 
            isTimegridTicketTimeLoading || 
            isNotesLoading || 
            isAdditionalTimeLoading || 
            isAdditionalTimeActivityLoading || 
            isTicketsLoading || 
            isCalendarRecordsLoading || 
            isCalendarActivitiesLoading || 
            isOnCallEngineersLoading || 
            isCustomerLoading
        )
    }

    const getBreadcrumbs = () => {
        let breadcrumbs = [
            {
                to: 'timegrids',
                text: 'Timegrids'
            },
            {
                to: `run_report${searchParams.get('accounts') === "true" ? '?accounts=true' : ''}`,
                text: `Run ${searchParams.get('accounts') === "true" ? 'Accounts' : ''} Report`
            },
            {
                to: `report${searchParams.get('accounts') === "true" ? '?accounts=true' : ''}`,
                text: `${searchParams.get('accounts') === "true" ? 'Accounts' : ''} Report`
            }
        ]
        if (departmentName !== undefined) {
            breadcrumbs.unshift({
                to: departmentName as string,
                text: (departmentName as string).charAt(0).toUpperCase() + (departmentName as string).slice(1)
            })
        }
        return breadcrumbs
    }

    return (
        <>
            <Header
                links={getBreadcrumbs()}
            />
            <OuterContainer
                title={`Timegrid ${searchParams.get('accounts') === "true" ? 'Accounts' : ''} Report`}
                headerContent={!isHeaderLoading() ? 
                    getReportDescription()
                    : <Skeleton type="text" width={375}/>
                }
                stickyHeaderContent={<p style={{ fontSize: '0.85em'}}>{getReportDescription()}</p>}
                noBorder
                hideHeaderOnPrint
                maxWidth={searchParams.get('accounts') === "true" ? 650 : 1000}
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        {(!isLoading() && usersData) ? 
                            usersData.length > 0 ?
                                usersData.map((user, index) =>
                                    <>
                                        <TimegridReportUser
                                            user={user}
                                            timegrids={filterUserTimegrids(timegridData, user.id)}
                                            tickets={ticketData}
                                            timegridNotes={notesData}
                                            additionalTime={filterUserAdditionalTime(additionalTimeData, user.id)}
                                            timegridTicketTime={filterUserTimegridTicketTime(timegridTicketTimeData, user.id)}
                                            calendarRecords={filterUserCalendarRecords(calendarRecordsData, user.id)}
                                            additionalTimeActivity={additionalTimeActivityData}
                                            calendarActivities={calendarActivitiesData}
                                            onCallEngineers={filterUserOnCallEngineers(onCallEngineerData, user.id)}
                                            notesUsers={notesUsersData}
                                            isAccounts={searchParams.get('accounts') === "true"}
                                            customers={customerData}
                                            startDate={startDate}
                                            key={index}
                                        />
                                        {index < usersData.length - 1 && <div style={{ width: '100%', margin: 'var(--big-gap) 0 var(--big-gap)', borderBottom: '1px solid var(--high-contrast)'}}></div>}
                                    </>
                                ) : 
                                <InnerContainer>
                                    <NoneFound 
                                        text="No Engineers Found"
                                        iconFont="person"
                                    />
                                </InnerContainer>
                            :
                            <TimegridReportSkeleton
                                isAccounts={searchParams.get('accounts') === "true"}
                            />
                        }
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default TimegridReport
