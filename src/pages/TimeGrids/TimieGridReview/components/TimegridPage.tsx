import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../../components/ui/Containers/OuterContainer/OuterContainer";
import { AdditionalTimeCollectionResponse, AdditionalTimeResponseData } from "../../../../types/additionalTime.types";
import { AdditionalTimeActivityCollectionResponse, AdditionalTimeActivityResponseData } from "../../../../types/additionalTimeActivity.types";
import { CalendarActivityCollectionResponse, CalendarActivityResponseData } from "../../../../types/calendarActivity.types";
import { CalendarRecordCollectionResponse, CalendarRecordResponseData } from "../../../../types/calendarRecord.types";
import { CustomerCollectionResponse, CustomerResponseData } from "../../../../types/customers.types";
import { EngineerPayablePeriodResponseData } from "../../../../types/engineerPayablePeriod.types";
import { OnCallEngineerCollectionResponse, OnCallEngineerResponseData } from "../../../../types/OnCallEngineer.types";
import { SiteCollectionResponse, SiteResponseData } from "../../../../types/sites.types";
import { SystemConfigsResponseData } from "../../../../types/systemConfigs.types";
import { TicketCollectionResponse, TicketResponseData } from "../../../../types/tickets.types";
import { TimegridCollectionResponse, TimegridResponseData } from "../../../../types/timegrid.types";
import { TimegridActivityResponseData } from "../../../../types/timegridActivity.types";
import { TimegridAuthorisationSignatureCollectionResponse, TimegridAuthorisationSignatureResponseData } from "../../../../types/timegridAuthorisationSignatures.types";
import { TimegridNoteCollectionResponse, TimegridNoteResponseData } from "../../../../types/timegridNote.types";
import { TimegridTicketTimeCollectionResponse, TimegridTicketTimeResponseData } from "../../../../types/timegridTicketTime.types";
import { TrackerActivityResponseData } from "../../../../types/trackerActivity.types";
import { TrackerSiteResponseData } from "../../../../types/trackerSites.types";
import { UserCollectionResponse, UserResponseData } from "../../../../types/user.types";
import { VehicleResponseData } from "../../../../types/vehicles.types";
import getAPI from "../../../../utils/getAPI";
import getDayRelativeDate from "../../../../utils/getDayRelativeDate";
import TimegridSideBar from "../../components/TimegridSideBar";
import getTimegridCode from "../../utils/getTimegridCode";
import AdditionalTime from "./AdditionalTime";
import Authorisation from "./Authorisation";
import TimegridCalendarEvents from "./CalendarEvents/TimegridCalendarEvents";
import { TripSection } from "./JourneyMap/utils/getTripSections";
import TimegridHeader from "./TimegridHeader/TimegridHeader";
import TimegridHeaderSkeleton from "./TimegridHeaderSkeleton/TimegridHeaderSkeleton";
import TimegridNotes from "./TimegridNotes";
import TimegridSubmission from "./TimegridSubmission";
import TicketData from "./TimegridTickets/TimegridTickets";
import TotalTime from "./TotalTime/TotalTime";
import TimegridInformation from "./TimegridInformation";
import TimegridInformationSkeleton from "./TimegridInformationSkeleton";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../../types/department.types";

const TimegridPage = () => {
    const { userCode, date } = useParams();

    const timegridDate = new Date(date as string);

    // Data States
    const [isLoadingTimegrid, setIsLoadingTimegrid] = useState(true);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isLoadingCurrentUser, setIsLoadingCurrentUser] = useState(true);
    const [isLoadingTickets, setIsLoadingTickets] = useState(true);
    const [isLoadingCustomer, setIsLoadingCustomer] = useState(true);
    const [isLoadingSite, setIsLoadingSite] = useState(true);
    const [isNotesLoading, setIsNotesLoading] = useState(true);
    const [isLoadingEngineerUsers, setIsLoadingEngineerUsers] = useState(true);
    const [isLoadingEngineerTimegrid, setIsLoadingEngineerTimegrid] = useState(true);
    const [isLoadingTimegridTicketTime, setIsLoadingTimegridTicketTime] = useState(true);
    const [isLoadingAdditionalTime, setIsLoadingAdditionalTime] = useState(true);
    const [isLoadingActivities, setIsLoadingActivities] = useState(true);
    const [isLoadingVehicle, setIsLoadingVehicle] = useState(true);
    const [isLoadingSystemConfigs, setIsLoadingSystemConfigs] = useState(true);
    const [isLoadingTrackerActivity, setIsLoadingTrackerActivity] = useState(false);
    const [isLoadingTrackerSites, setIsLoadingTrackerSites] = useState(false);
    const [isLoadingTimegridAuthorisationUsers, setIsLoadingTimegridAuthorisationUsers] = useState(false);
    const [isLoadingTimegridAuthorisationSignatures, setIsLoadingTimegridAuthorisationSignatures] = useState(false);
    const [timegridData, setTimegridData] = useState<TimegridResponseData>();
    const [userData, setUserData] = useState<UserResponseData>();
    const [currentUserData, setCurrentUserData] = useState<UserResponseData>()
    const [ticketData, setTicketData] = useState<Array<TicketResponseData>>([]);
    const [customerData, setCustomerData] = useState<Array<CustomerResponseData>>([]);
    const [siteData, setSiteData] = useState<Array<SiteResponseData>>([]);
    const [engineerUserData, setEngineerUserData] = useState<Array<UserResponseData>>([]);
    const [engineerTimegridData, setEngineerTimegridData] = useState<Array<TimegridResponseData>>([]);
    const [timegridTicketTimeData, setTimegridTicketTimeData] = useState<Array<TimegridTicketTimeResponseData>>([]);
    const [additionalTimeData, setAdditionalTimeData] = useState<Array<AdditionalTimeResponseData>>([]);
    const [activityData, setActivityData] = useState<Array<AdditionalTimeActivityResponseData>>([]);
    const [vehicleData, setVehicleData] = useState<VehicleResponseData>();
    const [systemConfigsData, setSystemConfigsData] = useState<SystemConfigsResponseData>();
    const [timegridAuthorisationData, setTimegridAuthorisationData] = useState<Array<TimegridAuthorisationSignatureResponseData>>([]);
    const [timegridAuthorisationUserData, setTimegridAuthorisationUserData] = useState<Array<UserResponseData>>([]);
    const [trackerActivityData, setTrackerActivityData] = useState<Array<TrackerActivityResponseData>>([]);
    const [trackerSiteData, setTrackerSiteData] = useState<Array<TrackerSiteResponseData>>([]);
    const [tripSections, setTripSections] = useState<Array<TripSection>>([]);
    const [noVehicle, setNoVehicle] = useState(false);
    const [notesData, setNotesData] = useState<Array<TimegridNoteResponseData>>([]);
    const [isNotesUsersLoading, setIsNotesUsersLoading] = useState(false);
    const [notesUsersData, setNotesUsersData] = useState<Array<UserResponseData>>([]);
    const [isTimegridActivityLoading, setIsTimegridActivityLoading] = useState(true);
    const [timegridActivityData, setTimegridActivityData] = useState<Array<TimegridActivityResponseData>>([]);
    const [isTimegridActivityUsersLoading, setIsTimegridActivityUsersLoading] = useState(false);
    const [timegridActivityUsersData, setTimegridActivityUsersData] = useState<Array<UserResponseData>>([]);
    const [isOnCallEngineersLoading, setIsOnCallEngineersLoading] = useState(true);
    const [onCallEngineerData, setOnCallEngineerData] = useState<Array<OnCallEngineerResponseData>>([]);
    const [isOnCallEngineerUsersLoading, setIsOnCallEngineerUsersLoading] = useState(false);
    const [onCallEngineerUsers, setOnCallEngineerUsers] = useState<Array<UserResponseData>>([]);
    const [isCalendarRecordsLoading, setIsCalendarRecordsLoading] = useState(false);
    const [calendarRecordsData, setCalendarRecordsData] = useState<Array<CalendarRecordResponseData>>([]);
    const [isCalendarActivitiesLoading, setIsCalendarActivitiesLoading] = useState(false);
    const [calendarActivitiesData, setCalendarActivitiesData] = useState<Array<CalendarActivityResponseData>>([]);
    const [isCalendarUsersLoading, setIsCalendarUsersLoading] = useState(false);
    const [calendarUsers, setCalendarUsers] = useState<Array<UserResponseData>>([]);
    const [isEngineerPayablePeriodLoading, setIsEngineerPayablePeriodLoading] = useState(false);
    const [engineerPayablePeriodData, setEngineerPayablePeriodData] = useState<EngineerPayablePeriodResponseData>();
    const [isEngineerPayablePeriodUserLoading, setIsEngineerPayablePeriodUserLoading] = useState(false);
    const [engineerPayablePeriodUser, setEngineerPayablePeriodUser] = useState<UserResponseData>();
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);

    useEffect(() => {
        getSystemConfigs();
        getCurrentUserData();
    }, [])

    useEffect(() => {
        getUserData(userCode as string);
    }, [userCode])

    useEffect(() => {
        if (userData?.id === undefined) return;
        getTimegridData(userData.id);
    }, [userData, date]);

    const getSystemConfigs = () => {
        getAPI('system_configs', {}, (response: any) => {
            const systemConfigsData: SystemConfigsResponseData = response.data;
            setSystemConfigsData(systemConfigsData);
        }, setIsLoadingSystemConfigs)
    }

    const getUserData = (userCode: string) => {
        getAPI('users', {
            is_active: true,
            user_code: userCode
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data[0]);
            const currentUserID = userData.data[0].id;
            getTicketData(currentUserID, timegridDate);
            getAdditionalTimeData(currentUserID, timegridDate);
            getTimegridNotes(currentUserID, timegridDate);
            getOnCall(currentUserID, timegridDate);
            getCalendarRecords(currentUserID, timegridDate);
            // getVehicleData(currentUserID, currentDate);  
            // getEngineerPayablePeriod(currentUserID, currentDate);
        }, setIsLoadingUser);
    }

    const getTimegridData = (userID: number) => {
        getAPI('timegrids', {
            date: timegridDate,
            user_ids: [userID]
        }, (response: any) => {
            const timegridData: TimegridCollectionResponse = response.data;
            if (timegridData.data.length > 0) {
                const currentTimeGridData = timegridData.data[0];
                getAuthorisationSignatures(currentTimeGridData.id);
                setTimegridData(currentTimeGridData);
            }
        }, setIsLoadingTimegrid)
    }

    const getTimegridNotes = (userID: number, date: Date) => {
        getAPI(`timegrid_notes`, {
            user_ids: [userID],
            dates: [date]
        }, (response: any) => {
            const notesData: TimegridNoteCollectionResponse = response.data;
            setNotesData(notesData.data);
            getNotesUserData([...new Set(notesData.data.map(note => note.data.created_by_id))])
        }, setIsNotesLoading);
    }

    const getCurrentUserData = () => {
        getAPI(`users/${-1}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setCurrentUserData(userData)
        }, setIsLoadingCurrentUser);
    }

    const getTicketData = (userID: number, date: Date) => {
        getAPI('tickets', {
            engineer_user_ids: [userID],
            visit_date: date
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData.data);
            if (ticketData.data.length > 0) {
                getCustomerData([...new Set(ticketData.data.map((ticket) => ticket.data.customer_id))]);
                getSitesData([...new Set(ticketData.data.map((activity) => activity.data.site_id))]);
                getEngineerUserData([...new Set(ticketData.data.map((ticket) => ticket.data.engineers.map((engineer) => engineer.user_id)).flat(1))]);
                getEngineerTimegridData([...new Set(ticketData.data.map((ticket) => ticket.data.engineers.map((engineer) => engineer.user_id)).flat(1))], date);
                getTimegridTicketTime(ticketData.data.map((ticket) => {
                    return {
                        ticket_id: ticket.id,
                        ticket_type: ticket.data.ticket_type
                    }
                }));
                getDepartments([...new Set(ticketData.data.map(ticket => ticket.data.department_id))]);
            } else {
                setIsLoadingCustomer(false);
                setIsLoadingSite(false);
                setIsLoadingEngineerUsers(false);
                setIsLoadingEngineerTimegrid(false);
                setIsLoadingTimegridTicketTime(false);
            }
        }, setIsLoadingTickets);
    }

    const getDepartments = (departmentIDs: Array<number>) => {
        getAPI('departments', {
            ids: departmentIDs
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData.data)
        }, setIsDepartmentsLoading)   
    }

    const getAdditionalTimeData = (userID: number, date: Date) => {
        getAPI('additional_time', {
            user_ids: [userID],
            date: date
        }, (response: any) => {
            const additionalTimeData: AdditionalTimeCollectionResponse = response.data;
            setAdditionalTimeData(additionalTimeData.data);
            getActivitiesData([...new Set(additionalTimeData.data.map((additionalTime) => additionalTime.data.activity_id))])
        }, setIsLoadingAdditionalTime);
    }

    const getActivitiesData = (activityIds: Array<number>) => {
        getAPI('additional_time_activity', {
            ids: activityIds,
        }, (response: any) => {
            const activitiesData: AdditionalTimeActivityCollectionResponse = response.data;
            setActivityData(activitiesData.data);
        }, setIsLoadingActivities);
    }

    const getCustomerData = (customerIDs: Array<number>) => {
        getAPI(`customers`, {
            ids: customerIDs
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomerData(customerData.data)
        }, setIsLoadingCustomer)
    }

    const getSitesData = (siteIDs: Array<number>) => {
        getAPI(`sites`, {
            ids: siteIDs
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSiteData(siteData.data)
        }, setIsLoadingSite)
    }

    const getEngineerUserData = (engineerIDs: Array<number>) => {
        getAPI(`users`, {
            ids: engineerIDs
        }, (response: any) => {
            const engineerUserData: UserCollectionResponse = response.data;
            setEngineerUserData(engineerUserData.data);
        }, setIsLoadingEngineerUsers);
    }

    const getEngineerTimegridData = (engineerIDs: Array<number>, date: Date) => {
        getAPI(`timegrids`, {
            user_ids: engineerIDs,
            date: [date]
        }, (response: any) => {
            const engineerTimegridData: TimegridCollectionResponse = response.data;
            setEngineerTimegridData(engineerTimegridData.data);
        }, setIsLoadingEngineerTimegrid);
    }

    const getNotesUserData = (userIDs: Array<number>) => {
        getAPI(`users`, {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setNotesUsersData(userData.data);
        }, setIsNotesUsersLoading);
    }

    const getTimegridTicketTime = (tickets: Array<any>) => {
        getAPI(`timegrid_ticket_time`, {
            tickets: tickets
        }, (response: any) => {
            const timegridTicketTimeData: TimegridTicketTimeCollectionResponse = response.data;
            setTimegridTicketTimeData(timegridTicketTimeData.data);
        }, setIsLoadingTimegridTicketTime);
    }

    // const getVehicleData = (userID: number, date: Date) => {
    //     getAPI(`vehicles`, {
    //         user_ids: [userID]
    //     }, (response: any) => {
    //         const vehicleData: VehicleCollectionResponse = response.data;
    //         if (vehicleData.total_count === 1 && vehicleData.data[0].data.tracker_vehicle_id.length > 0) {
    //             setNoVehicle(false);
    //             setVehicleData(vehicleData.data[0]);
    //             getVehicleActivity(vehicleData.data[0].data.tracker_vehicle_id, date);
    //         } else {
    //             setNoVehicle(true);
    //         }
    //     }, setIsLoadingVehicle);
    // }

    const getAuthorisationSignatures = (timegridID: number) => {
        getAPI('timegrid_authorisation_signatures', {
            timegrid_ids: [timegridID]
        }, (response: any) => {
            const timegridAuthorisationData: TimegridAuthorisationSignatureCollectionResponse = response.data;
            setTimegridAuthorisationData(timegridAuthorisationData.data);
            // getAuthenticationUsers([...new Set(timegridAuthorisationData.data.map((signature) => signature.data.user_id))]);
        }, setIsLoadingTimegridAuthorisationSignatures);
    }

    // const getAuthenticationUsers = (userIDs: Array<number>) => {
    //     getAPI('users', {
    //         ids: userIDs
    //     }, (response: any) => {
    //         const authenticationUserData: UserCollectionResponse = response.data;
    //         setTimegridAuthorisationUserData(authenticationUserData.data);
    //     }, setIsLoadingTimegridAuthorisationUsers)
    // }

    // const getVehicleActivity = (trackerVehicleID: string, date: Date) => {
    //     getTrackerAPI(`activity`, {
    //         startDate: new Date(date),
    //         endDate: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
    //         vehicleID: trackerVehicleID
    //     }, (response: any) => {
    //         const activityData: TrackerActivityCollectionResponse = response.data;
    //         setTrackerActivityData(activityData.data);
    //     }, setIsLoadingTrackerActivity);
    // }

    // const getTrackerSites = () => {
    //     getTrackerAPI(`sites`, {}, (response: any) => {
    //         const sitesData: TrackerSiteCollectionResponse = response.data;
    //         setTrackerSiteData(sitesData.data);        
    //     }, setIsLoadingTrackerSites);
    // }

    // const getTimegridActivityData = () => {
    //     getAPI(`timegrid_activity`, {
    //         timegrid_id: props.timegridID
    //     }, (response: any) => {
    //         const timegridActivityData: TimegridActivityCollectionResponse = response.data;
    //         setTimegridActivityData(timegridActivityData.data);
    //         (timegridActivityData.data.length > 0) && getActivityUsers([...new Set(timegridActivityData.data.map(activity => activity.data.activity_by_id))]);
    //     }, setIsTimegridActivityLoading)
    // }

    // const getActivityUsers = (userIDs: Array<number>) => {
    //     getAPI(`users`, {
    //         ids: userIDs
    //     }, (response: any) => {
    //         const activityUserData: UserCollectionResponse = response.data;
    //         setTimegridActivityUsersData(activityUserData.data);
    //     }, setIsTimegridActivityUsersLoading);
    // }

    const getOnCall = (userID: number, date: Date) => {
        getAPI('on_call_engineers', {
            user_ids: [userID],
            end_date_after: date,
            start_date_before: getDayRelativeDate(date, 1)
        }, (response: any) => {
            const onCallEngineerData: OnCallEngineerCollectionResponse = response.data;
            setOnCallEngineerData(onCallEngineerData.data)
            getOnCallUsers([...new Set(onCallEngineerData.data.map(onCallEngineer => onCallEngineer.data.created_by_id))]);
        }, setIsOnCallEngineersLoading)
    }

    const getOnCallUsers = (userIDs: Array<number>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const onCallEngineerUserData: UserCollectionResponse = response.data;
            setOnCallEngineerUsers(onCallEngineerUserData.data);
        }, setIsOnCallEngineerUsersLoading)
    }

    const getCalendarRecords = (userID: number, date: Date) => {
        getAPI(`calendar_records`, {
            user_ids: [userID],
            date: date 
        }, (response: any) => {
            const calendarRecords: CalendarRecordCollectionResponse = response.data;
            setCalendarRecordsData(calendarRecords.data);
            if (calendarRecords.data.length > 0) {
                getCalendarActivities([...new Set(calendarRecords.data.map(activity => activity.data.calendar_event_id))]);
                getCalendarUsers([...new Set(calendarRecords.data.map(activity => activity.data.created_by_id))]);
            }
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

    const getCalendarUsers = (userIDs: Array<number>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const calendarUserData: UserCollectionResponse = response.data;
            setCalendarUsers(calendarUserData.data);
        }, setIsCalendarUsersLoading)
    }

    // const getEngineerPayablePeriod = (userID: number, date: Date) => {
    //     getAPI('engineer_payable_period', {
    //         date: date,
    //         user_ids: [userID]
    //     }, (response: any) => {
    //         const engineerPayablePeriodData: EngineerPayablePeriodCollectionResponse = response.data;
    //         if (engineerPayablePeriodData.data.length > 0) {
    //             setEngineerPayablePeriodData(engineerPayablePeriodData.data[0]);
    //             getEngineerPayablePeriodUsers(engineerPayablePeriodData.data[0].data.created_by_id);
    //         }
    //     }, setIsEngineerPayablePeriodLoading)
    // }

    // const getEngineerPayablePeriodUsers = (userID: number) => {
    //     getAPI(`users/${userID}`, {}, (response: any) => {
    //         const userData: UserResponseData = response.data;
    //         setEngineerPayablePeriodUser(userData);
    //     }, setIsEngineerPayablePeriodUserLoading)
    // }

    const engineerCount = [...new Set(ticketData?.map((ticket) => ticket.data.engineers.map((engineer) => engineer.user_id)).flat(1))].length;
    const submittedCount = engineerTimegridData?.filter((timegrid) => timegrid.data.status === 0 || timegrid.data.status === 2 || timegrid.data.status === 3).length;


    // useEffect(() => {
    //     setTripSections(getTripSections(trackerActivityData, trackerSiteData, userData?.data.tracker_home_site_id, engineerPayablePeriodData));
    // }, [trackerActivityData, trackerSiteData, userData, engineerPayablePeriodData])

    const isLoading = (
        isLoadingTimegrid || 
        isLoadingUser || 
        isLoadingSystemConfigs || 
        isLoadingEngineerUsers || 
        isCalendarRecordsLoading || 
        isCalendarActivitiesLoading ||
        isCalendarUsersLoading || 
        isOnCallEngineerUsersLoading || 
        isOnCallEngineersLoading ||
        isLoadingAdditionalTime || 
        isLoadingActivities || 
        isLoadingTickets ||
        isDepartmentsLoading
        // isLoadingCustomer || 
        // isLoadingTimegridTicketTime || 
        // isLoadingEngineerTimegrid || 
        // isLoadingVehicle ||
        // isNotesUsersLoading
    )

    const isHeaderLoading = (
        isLoadingTimegrid || 
        isLoadingSystemConfigs || 
        isLoadingTimegridAuthorisationSignatures || 
        isLoadingTickets || 
        isLoadingEngineerTimegrid
    )

    console.log(timegridData?.data.is_authorisation_required)
    
    return (
        <OuterContainer 
            title='Timegrid' 
            id={getTimegridCode(userCode as string, new Date(date as string))}
            headerContent={!isHeaderLoading && systemConfigsData ?
                <TimegridHeader
                    timegridData={timegridData}
                    signaturesReceivedCount={timegridAuthorisationData.length} 
                    requiredSignatureCount={systemConfigsData.data.required_timegrid_authorisation_signatures} 
                    engineerCount={engineerCount}
                    submittedCount={submittedCount}
                /> :
                <TimegridHeaderSkeleton/>
            }
            maxWidth={1000}
            bigID
        >
            <div className="page-grid">
                <div className="page-main">
                    {!isLoading && userData && systemConfigsData ? <>
                        <TimegridInformation 
                            timegrid={timegridData} 
                            user={userData} 
                            timegridDate={timegridDate}
                        />
                        {timegridData?.data.is_authorisation_required ? 
                            <Authorisation 
                                timegridAuthorisationData={timegridAuthorisationData} 
                                requiredSignatureCount={systemConfigsData.data.required_timegrid_authorisation_signatures} 
                                timegridAuthorisationUserData={timegridAuthorisationUserData}                                        
                            /> : null
                        }
                        {engineerCount > 1 ? 
                            <TimegridSubmission
                                user={userData}
                                engineerCount={engineerCount}
                                submittedCount={submittedCount}
                                engineerTimegridData={engineerTimegridData}
                                engineerUserData={engineerUserData}
                                date={timegridDate}
                            /> : null
                        }
                        {(onCallEngineerData.length > 0 || calendarRecordsData.length > 0) ? <TimegridCalendarEvents
                            user={userData}
                            date={timegridDate}
                            onCallEngineers={onCallEngineerData}
                            onCallEngineerUsers={onCallEngineerUsers}
                            calendarRecords={calendarRecordsData}
                            calendarActivities={calendarActivitiesData}
                            calendarUsers={calendarUsers}
                            /> : null
                        }
                        {ticketData.length > 0 ? 
                            <TicketData
                                userData={userData}
                                ticketData={ticketData}
                                customerData={customerData}
                                siteData={siteData}
                                engineerUserData={engineerUserData}
                                timegridTicketTimeData={timegridTicketTimeData}
                                engineerTimegridData={engineerTimegridData}
                                departments={departmentData}
                            /> : null
                        }
                        {additionalTimeData.length > 0 ?
                            <AdditionalTime 
                                additionalTimeData={additionalTimeData}
                                activityData={activityData}
                            /> : null
                        }
                        {notesData.length > 0 && <TimegridNotes
                            notesData={notesData}
                            users={notesUsersData}
                            userID={userData.id}
                            getTimegridNotes={() => getTimegridNotes(userData.id, timegridDate)}
                        />}
                        <TotalTime
                            userID={userData.id}
                            timegridTicketTime={timegridTicketTimeData}
                            additionalTimeData={additionalTimeData}
                            tripSections={tripSections}
                            noVehicle={noVehicle}
                        />
                    </>
                    : <TimegridInformationSkeleton/>
                    }
                        {/* 
                        <hr/>
                        {!noVehicle && vehicleData && trackerActivityData.length > 0 && <CalculatedTravel
                            vehicleData={vehicleData}
                            tripSections={tripSections}
                            activityData={trackerActivityData}
                            homeSiteID={userData.data.tracker_home_site_id}
                            engineerPayablePeriod={engineerPayablePeriodData}
                            engineerPayablePeriodUser={engineerPayablePeriodUser}
                        />}
                        */}
                    </div>
                    <div className="page-side">
                        <TimegridSideBar
                            timegrid={timegridData}
                            setTimegridData={setTimegridData}
                            isAuthorised={systemConfigsData ? timegridAuthorisationData.length >= systemConfigsData.data.required_timegrid_authorisation_signatures : false}
                            noOfTickets={ticketData.length}
                            getTimegridNotes={getTimegridNotes}
                            currentUserCanAuth={currentUserData ? currentUserData.data.permissions.can_auth_time : false}
                            setTimegridAuthorisationData={setTimegridAuthorisationData}
                        />
                        {/* {!noVehicle && systemConfigsData && vehicleData && <TravelInfo
                            timegridID={props.timegridID}
                            userData={userData}
                            date={timegridData.data.date}
                            vehicleData={vehicleData}
                            activityData={trackerActivityData}
                            trackerSiteData={trackerSiteData}
                            homeSiteID={userData.data.tracker_home_site_id}
                            workSiteID={systemConfigsData.data.tracker_work_site_id}
                            tickets={ticketData}
                            siteData={siteData}
                            customerData={customerData}
                            tripSections={tripSections}
                            getTimegridActivity={getTimegridActivityData}
                            engineerPayablePeriod={engineerPayablePeriodData}
                            engineerPayablePeriodUser={engineerPayablePeriodUser}
                            getEngineerPayablePeriod={getEngineerPayablePeriod}
                        />} */}
                    </div>
                </div> 
        </OuterContainer> 
    )
}

export default TimegridPage