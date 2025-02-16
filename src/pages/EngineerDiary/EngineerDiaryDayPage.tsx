import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ShowCreateButton from "../../components/form/ShowCreateButton/ShowCreateButton";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import NoneFound from "../../components/ui/General/NoneFound/NoneFound";
import { TicketInvoiceRequestCollectionResponse, TicketInvoiceRequestResponseData } from "../../types/TicketInvoiceRequest.types";
import { CalendarActivityCollectionResponse, CalendarActivityResponseData } from "../../types/calendarActivity.types";
import { CalendarRecordCollectionResponse, CalendarRecordResponseData } from "../../types/calendarRecord.types";
import { CustomerCollectionResponse, CustomerResponseData } from "../../types/customers.types";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../types/department.types";
import { DiaryNoteCollectionResponse, DiaryNoteResponseData } from "../../types/diaryNotes.types";
import { SiteCollectionResponse, SiteResponseData } from "../../types/sites.types";
import { TicketCollectionResponse, TicketResponseData } from "../../types/tickets.types";
import { UserCollectionResponse, UserResponseData } from "../../types/user.types";
import findUser from "../../utils/findUser";
import formatDate from "../../utils/formatDate";
import getAPI from "../../utils/getAPI";
import TicketList from "../Tickets/components/TicketList";
import CreateDiaryNote from "./components/CreateDiaryNote/CreateDiaryNote";
import DiaryNote from "./components/DiaryNote";
import EngineerDiaryNavigation from "./components/EngineerDairyNavigation";
import EngineerDiaryDayEngineersTickets from "./components/EngineerDiaryDayEngineersTickets";
import EngineerDairyPageNavigation from "./components/EngineerDiaryPageNavigation";
import getEngineerDiaryDate from "./utils/getEngineerDiaryDate";
import InnerContainer from "../../components/ui/Containers/InnerContainer/InnerContainer";
import PermsProtectedComponent from "../../components/PermsProtectedComponent";

const EngineerDiaryDayPage = () => {
    
    const { departmentName } = useParams();
    const [searchParams] = useSearchParams();

    // Form States
    const [currentCreateDate, setCurrentCreateDate] = useState<Date>();
    const [showCreate, setShowCreate] = useState(false);    

    const [isNotesLoading, setIsNotesLoading] = useState(false);
    const [notesData, setNotesData] = useState<Array<DiaryNoteResponseData>>([]);
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentsData, setDepartmentsData] = useState<Array<DepartmentResponseData>>([]);
    const [isEngineersLoading, setIsEngineersLoading] = useState(false);
    const [engineerData, setEngineerData] = useState<Array<UserResponseData>>([]);
    const [isUnassignedTicketsLoading, setIsUnassignedTicketsLoading] = useState(false);
    const [unassignedTicketData, setUnassignedTicketData] = useState<TicketCollectionResponse>();
    const [isTicketsLoading, setIsTicketsLoading] = useState(false);
    const [ticketData, setTicketData] = useState<Array<TicketResponseData>>([]);
    const [isCalendarRecordsLoading, setIsCalendarRecordsLoading] = useState(true);
    const [calendarRecordsData, setCalendarRecordsData] = useState<Array<CalendarRecordResponseData>>([]);
    const [isActivitiesLoading, setIsActivitiesLoading] = useState(false);
    const [activityData, setActivityData] = useState<Array<CalendarActivityResponseData>>([]);
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomerData] = useState<Array<CustomerResponseData>>([]);
    const [isSitesLoading, setIsSiteLoading] = useState(false);
    const [sitesData, setSitesData] = useState<Array<SiteResponseData>>([]);
    const [isInvoiceRequestsLoading, setIsInvoiceRequestsLoading] = useState(false);
    const [invoiceRequests, setInvoiceRequests] = useState<Array<TicketInvoiceRequestResponseData>>([]);

    const date = getEngineerDiaryDate(searchParams.get('date'))

    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    useEffect(() => {
        if (departmentData === undefined) return;
        getEngineers();
        getUnassignedTickets();
        getDiaryNotes();
    }, [departmentData?.id, JSON.stringify(date)]);

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartmentData = departmentData.data[0];
            setDepartmentData(currentDepartmentData)
        }, setIsDepartmentLoading)
    }

    const getUnassignedTickets = () => {
        if (departmentData === undefined) return;
        getAPI('tickets', {
            visit_date: date,
            is_unassigned: true,
            has_completion_date: false,
            department_id: departmentData.id
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setUnassignedTicketData(ticketData);
        }, setIsUnassignedTicketsLoading)
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
        console.log("getExpandedEngineers", userIDs)
        getAPI('users', {
            ids: userIDs,
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setEngineerData(userData.data);
            if (userData.data.length > 0) {
                console.log("mappedList", [...new Set(userData.data.map(user => user.id))])
                getTickets([...new Set(userData.data.map(user => user.id))]);
                getCalendarRecords([...new Set(userData.data.map(user => user.id))]);
            }
        }, setIsEngineersLoading);
    }

    const getTickets = (userIDs: Array<number>) => {
        getAPI(`tickets`, {
            visit_date: date,
            engineer_user_ids: userIDs
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData.data);
            const engineerIDs = [...new Set(ticketData.data.map(ticket => ticket.data.engineers).flat(1).map(engineer => engineer.user_id))];
            const otherDepartmentEngineerIDs = engineerIDs.filter(engineerID => !userIDs.includes(engineerID));
            if (otherDepartmentEngineerIDs.length > 0) {
                getExpandedEngineers(userIDs.concat(otherDepartmentEngineerIDs));
            } else {
                if (ticketData.data.length > 0) {
                    getDepartments([...new Set(ticketData.data.map(ticket => ticket.data.department_id))]);
                    getCustomers([...new Set(ticketData.data.map(ticket => ticket.data.customer_id))]);
                    getSites([...new Set(ticketData.data.map(ticket => ticket.data.site_id))]);
                    getInvoiceRequests([...new Set(ticketData.data.map(ticket => {
                        return {
                            ticket_number: ticket.data.number,
                            department_id: ticket.data.department_id
                        }
                    }))]);
                }
            }
        }, setIsTicketsLoading)    
    } 

    const getDepartments = (departmentIDs: Array<number>) => {
        getAPI('departments', {
            ids: departmentIDs
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentsData(departmentData.data);
        }, setIsDepartmentsLoading);
    }

    const getCustomers = (customerIDs: Array<number>) => {
        getAPI('customers', {
            ids: customerIDs
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomerData(customerData.data)
        }, setIsCustomersLoading)
    }

    const getSites = (siteIDs: Array<number>) => {
        getAPI(`sites`, {
            ids: siteIDs,
            is_active: true,
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSitesData(siteData.data);
        }, setIsSiteLoading);
    }

    const getInvoiceRequests = (tickets: Array<any>) => {
        getAPI(`ticket_invoice_requests`, {
            tickets: tickets
        }, (response: any) => {
            const invoiceRequestData: TicketInvoiceRequestCollectionResponse = response.data;
            setInvoiceRequests(invoiceRequestData.data);
        }, setIsInvoiceRequestsLoading);
    }

    const getCalendarRecords = (userIDs: Array<number>) => {
        getAPI('calendar_records', {
            date: date,
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
        }, setIsActivitiesLoading)   
    }

    const getDiaryNotes = () => {
        if (departmentData === undefined) return;
        getAPI('diary_notes', {
            date: date,
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
            <EngineerDairyPageNavigation location='day'/>
            <OuterContainer 
                title={`Engineer Diary ${formatDate(date)}`}
                description="View planned labour. Assign tickets to engineers. View and create notes."
                maxWidth={2000}
                noBorder
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <EngineerDiaryNavigation/>
                        <section>
                            <div className="page-grid">
                                <div className="page-main">
                                    <section>
                                        <InnerContainer>
                                            <section>
                                                <h2>Unassigned Tickets Testing</h2>
                                                <TicketList 
                                                    isTicketsLoading={isUnassignedTicketsLoading} 
                                                    tickets={unassignedTicketData} 
                                                    hideVisitDate
                                                />
                                            </section>
                                        </InnerContainer>
                                    </section>
                                </div>
                                <div className="page-site">
                                    <section>
                                        <InnerContainer>
                                            <section>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '8px'
                                                }}>
                                                    <h2>Notes</h2>
                                                    <PermsProtectedComponent requiredPerms={{ calendars: 2 }}>
                                                        <ShowCreateButton
                                                            text="Create Note"
                                                            clickFunc={() => setShowCreate(true)}
                                                        />
                                                    </PermsProtectedComponent>
                                                </div>
                                                {notesData.length > 0 ?
                                                    notesData.map((note, index) => <>
                                                        {index > 0 && <hr className="small"/>}
                                                        <DiaryNote
                                                            diaryNote={note}
                                                            user={findUser(userData, note.data.created_by_id)}
                                                            vertical
                                                            key={index}
                                                        />
                                                    </>
                                                    ) : 
                                                    <NoneFound 
                                                        iconFont={"notes"} 
                                                        text={"No Notes Found"}
                                                        small
                                                    />
                                                }
                                            </section>
                                        </InnerContainer>
                                    </section>
                                </div>
                            </div>
                        </section>
                        {departmentData ? <EngineerDiaryDayEngineersTickets
                            department={departmentData}
                            departments={departmentsData}
                            date={date} 
                            tickets={ticketData}
                            engineers={engineerData}
                            customers={customerData}
                            sites={sitesData}
                            invoiceRequests={invoiceRequests}
                            calendarRecords={calendarRecordsData}
                            activities={activityData}
                        /> : null}
                    </div>
                </div>
            </OuterContainer>

            <CreateDiaryNote 
                show={showCreate} 
                hideFunc={() => setShowCreate(false)} 
                getDiaryNotes={getDiaryNotes}
                currentCreateDate={date}       
                departmentID={departmentData ? departmentData.id : 0}     
            />
        </>
    )
}

export default EngineerDiaryDayPage
