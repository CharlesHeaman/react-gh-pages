import { DepartmentResponseData } from "../../../types/department.types"
import { TicketResponseData } from "../../../types/tickets.types"
import getYearRelativeDate from "../../../utils/getYearRelativeDate"
import filterYearVisitTickets from "../utils/filterYearVisitTickets"
import CalloutPerformanceRowYear from "./CalloutPerformanceRowYear"

const CalloutPerformanceRow = (props: {
    department: DepartmentResponseData,
    tickets: Array<TicketResponseData>
}) => {
    return (
        <tr>
            <td>{props.department.data.name}</td>
            <td>
                <CalloutPerformanceRowYear
                    tickets={filterYearVisitTickets(props.tickets, getYearRelativeDate(new Date(), -3).getFullYear())}
                />
            </td>
            <td>
                <CalloutPerformanceRowYear
                    tickets={filterYearVisitTickets(props.tickets, getYearRelativeDate(new Date(), -2).getFullYear())}
                />
            </td>
            <td>
                <CalloutPerformanceRowYear
                    tickets={filterYearVisitTickets(props.tickets, getYearRelativeDate(new Date(), -1).getFullYear())}
                />
            </td>
        </tr>
    )
}

export default CalloutPerformanceRow