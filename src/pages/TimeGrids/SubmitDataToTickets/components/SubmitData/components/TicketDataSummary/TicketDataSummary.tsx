import { CustomerResponseData } from "../../../../../../../types/customers.types";
import { DepartmentResponseData } from "../../../../../../../types/department.types";
import { EquipmentResponseData } from "../../../../../../../types/equipment.types";
import { TicketResponseData } from "../../../../../../../types/tickets.types";
import findCustomer from "../../../../../../../utils/findCustomer";
import { InvoiceTicketTime } from "../../../../ProcessTimegridPage";
import TimegridSummaryTicket from "./TimegridSummaryTicket";

const TicketDataSummary = (props: {
    ticketData: Array<TicketResponseData>,
    customerData: Array<CustomerResponseData>,
    equipmentData: Array<EquipmentResponseData>,
    invoiceTicketTime: Array<InvoiceTicketTime>,
    departmentData: Array<DepartmentResponseData>,
    engineerDepartment: DepartmentResponseData,
}) => {    
    return (
        <section>
            {props.ticketData.map((ticket, index) => 
                <section key={index}>
                    <TimegridSummaryTicket
                        ticket={ticket}
                        customer={findCustomer(props.customerData, ticket.data.customer_id)}
                        site={undefined}
                        departments={props.departmentData}
                        invoiceTicketTime={props.invoiceTicketTime}
                        engineerDepartment={props.engineerDepartment}
                    />
                </section>
            )}
        </section>
    )
}

export default TicketDataSummary