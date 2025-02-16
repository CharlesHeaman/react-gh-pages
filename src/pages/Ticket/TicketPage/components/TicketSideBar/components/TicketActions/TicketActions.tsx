import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { ContractResponseData } from "../../../../../../../types/contract.types";
import { DepartmentResponseData } from "../../../../../../../types/department.types";
import { QuoteResponseData } from "../../../../../../../types/quote.types";
import { TicketResponseData } from "../../../../../../../types/tickets.types";
import CompleteTicket from "./components/CompleteTicket";
import TicketAssignEngineer from "./components/TicketAssignEngineer";
import CreateContinuation from "./components/CreateContinuation";
import { UserResponseData } from "../../../../../../../types/user.types";

const TicketActions = (props: {
    ticket: TicketResponseData,
    isInvoiced: boolean,
    setTicketData: Dispatch<SetStateAction<TicketResponseData | undefined>>,
    contract: ContractResponseData | undefined,
    engineers: Array<UserResponseData>,
    quote: QuoteResponseData | undefined,
    department: DepartmentResponseData, 
    tickets: Array<any>,
}) => {
    const navigate = useNavigate();

    const [showComplete, setShowComplete] = useState(false);
    const [showAssign, setShowAssign] = useState(false);
    const [showCreateContinuation, setShowCreateContinuation] = useState(false);

    const isComplete = props.ticket.data.completion_date !== null;
    const canCompleteTicket = props.ticket.data.engineer_report !== null || (props.ticket.data.is_job_complete && props.ticket.data.ticket_type === 1);

    return (
        <>
            <SideBarModule title="Actions">
                {!isComplete ? 
                    canCompleteTicket ? 
                        <SideBarButton
                            text="Complete Ticket"
                            iconFont="check_circle"
                            color="dark-blue"
                            clickEvent={() => props.ticket.data.ticket_type === 0 ? setShowComplete(true) : navigate('complete')}
                        /> 
                        : null 
                    :
                    !props.isInvoiced ? <SideBarButton
                        text="Create Invoice Request"
                        iconFont="credit_card"
                        color="purple"
                        clickEvent={() => navigate('create_invoice_request')}
                        
                    /> : null
                }
                {!isComplete ? <SideBarButton
                    text="Assign Ticket"
                    iconFont="assignment_ind"
                    color="light-green"
                    clickEvent={() => setShowAssign(true)}
                /> : null}
                <SideBarButton
                    text={`Create ${props.ticket.data.ticket_type === 0 ? 'Continuation' : 'Sub-ticket'}`}
                    iconFont={props.ticket.data.ticket_type === 0 ? 'local_activity' : 'confirmation_number'}
                    color="light-blue"
                    clickEvent={() => setShowCreateContinuation(true)}
                />
                {isComplete ? <SideBarButton
                    text="Create Quote"
                    iconFont="request_quote"
                    color="purple"
                    clickEvent={() => navigate(`/${props.department.data.name}/quotes/create?ticket_type=${props.ticket.data.ticket_type}&ticket_id=${props.ticket.id}`) }
                /> : null}
            </SideBarModule>

            <CompleteTicket
                ticketID={props.ticket.id}
                ticketType={props.ticket.data.ticket_type}
                show={showComplete}
                hideFunc={() => setShowComplete(false)}
                engineerReport={props.ticket.data.engineer_report ? props.ticket.data.engineer_report : ''}
                setTicketData={props.setTicketData}
            />

            {!isComplete ? <TicketAssignEngineer
                ticketID={props.ticket.id}
                ticketType={props.ticket.data.ticket_type} 
                engineers={props.engineers}           
                show={showAssign}
                hideFunc={() => setShowAssign(false)}
                currentVisitDate={props.ticket.data.visit_date}
                setTicketData={props.setTicketData}
            /> : null}

            <CreateContinuation
                ticketID={props.ticket.id}
                ticketType={props.ticket.data.ticket_type}                        
                show={showCreateContinuation}
                hideFunc={() => setShowCreateContinuation(false)}
            />
        </>
    )
}

export default TicketActions