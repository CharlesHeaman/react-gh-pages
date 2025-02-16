import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer";
import DepartmentLabel from "../../../components/ui/Department/DepartmentLabel";
import Label from "../../../components/ui/General/Label/Label";
import { CalendarActivityResponseData } from "../../../types/calendarActivity.types";
import { CalendarRecordResponseData } from "../../../types/calendarRecord.types";
import { CustomerResponseData } from "../../../types/customers.types";
import { DepartmentResponseData } from "../../../types/department.types";
import { SiteResponseData } from "../../../types/sites.types";
import { TicketInvoiceRequestResponseData } from "../../../types/TicketInvoiceRequest.types";
import { TicketResponseData } from "../../../types/tickets.types";
import { UserResponseData } from "../../../types/user.types";
import filterCalendarRecordUser from "../../../utils/filterCalendarRecordUser";
import filterDateCalendarRecords from "../../../utils/filterDateCalendarRecords";
import findDepartment from "../../../utils/findDepartment";
import getUserFullName from "../../../utils/getUserFullName";
import filterTicketEngineer from "../utils/filterTicketEngineer";
import filterTicketVisitDate from "../utils/filterTicketVistiDate";
import DiaryDayEngineerTickets from "./DiaryDayEngineerTickets";
import EngineerDiaryDayTotal from "./EngineerDiaryDayTotal";

const EngineerDiaryDayEngineersTickets = (props: {
    department: DepartmentResponseData,
    departments: Array<DepartmentResponseData>,
    date: Date,
    tickets: Array<TicketResponseData>,
    engineers: Array<UserResponseData>,
    calendarRecords: Array<CalendarRecordResponseData>,
    activities: Array<CalendarActivityResponseData>,
    customers: Array<CustomerResponseData>,
    sites: Array<SiteResponseData>,
    invoiceRequests: Array<TicketInvoiceRequestResponseData>
}) => {
    return (
        <section>
            <InnerContainer>
                <section>
                    <h2>Assigned Tickets</h2>
                    <div className="table-wrapper">
                        <table>
                            <tbody>
                                {props.engineers.sort((firstEngineer, _) => firstEngineer.data.department_id === props.department.id ? -1 : 1).map((engineer, index) =>
                                    <tr key={index}>
                                        <td 
                                            style={{ 
                                                width: '120px',
                                                fontWeight: 600, 
                                                fontSize: 'var(--h3-size)', 
                                                verticalAlign: 'middle' 
                                            }}
                                        >
                                            {props.department.id !== engineer.data.department_id ?
                                                <Label 
                                                    text={getUserFullName(engineer)} 
                                                    iconFont="dashboard" 
                                                    color="purple"
                                                /> :
                                                getUserFullName(engineer)
                                            }
                                        </td>
                                        <td>
                                            <DiaryDayEngineerTickets 
                                                tickets={filterTicketEngineer(filterTicketVisitDate(props.tickets, props.date), engineer.id)} 
                                                customers={props.customers} 
                                                sites={props.sites} 
                                                invoiceRequests={props.invoiceRequests}
                                                departments={props.departments}
                                            />
                                        </td>
                                        <td 
                                            style={{ 
                                                width: '120px'
                                            }}
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--small-gap)' }}>
                                                <EngineerDiaryDayTotal 
                                                    tickets={filterTicketEngineer(filterTicketVisitDate(props.tickets, props.date), engineer.id)}
                                                    maxHours={props.department.data.day_max_hours}
                                                    calendarRecords={filterCalendarRecordUser(filterDateCalendarRecords(props.calendarRecords, props.date), engineer.id)}
                                                    activities={props.activities}
                                                    key={index}
                                                />
                                            </div>
                                        </td>
                                        {/* {[...Array(columnCount)].map((_, columnIndex) => 
                                            <EngineerDiaryTicketDay
                                                date={getCurrentDate(columnIndex)}
                                                tickets={filterTicketEngineer(filterTicketVisitDate(props.tickets, getCurrentDate(columnIndex)), engineer.id)}
                                                maxHours={props.department.data.day_max_hours}
                                                isSameMonth={true}
                                                calendarRecords={filterCalendarRecordUser(filterDateCalendarRecords(props.calendarRecords, getCurrentDate(columnIndex)), engineer.id)}
                                                activities={props.activities}
                                                short={props.month}
                                                key={columnIndex}
                                            />
                                        )} */}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </InnerContainer>
        </section>
    )
}

export default EngineerDiaryDayEngineersTickets