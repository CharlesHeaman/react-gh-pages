import { DepartmentResponseData } from "../../../types/department.types"
import { TicketResponseData } from "../../../types/tickets.types"
import getYearRelativeDate from "../../../utils/getYearRelativeDate"
import filterYearVisitTickets from "../utils/filterYearVisitTickets"
import CalloutPerformanceRowYear from "./CalloutPerformanceRowYear"

const WarrantyTicketRow = (props: {
    department: DepartmentResponseData,
    warrantyITickets: Array<TicketResponseData>
    warrantySTickets: Array<TicketResponseData>
}) => {
    return (
        <tr>
            <td>{props.department.data.name}</td>
            <td>{filterYearVisitTickets(props.warrantyITickets, getYearRelativeDate(new Date(), -3).getFullYear()).length}</td>
            <td>{filterYearVisitTickets(props.warrantySTickets, getYearRelativeDate(new Date(), -3).getFullYear()).length}</td>
            <td>{filterYearVisitTickets(props.warrantyITickets, getYearRelativeDate(new Date(), -2).getFullYear()).length}</td>
            <td>{filterYearVisitTickets(props.warrantySTickets, getYearRelativeDate(new Date(), -2).getFullYear()).length}</td>
            <td>{filterYearVisitTickets(props.warrantyITickets, getYearRelativeDate(new Date(), -1).getFullYear()).length}</td>
            <td>{filterYearVisitTickets(props.warrantySTickets, getYearRelativeDate(new Date(), -1).getFullYear()).length}</td>
        </tr>
    )
}

export default WarrantyTicketRow