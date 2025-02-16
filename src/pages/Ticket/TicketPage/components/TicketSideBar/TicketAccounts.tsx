import { useState } from "react";
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { DepartmentResponseData } from "../../../../../types/department.types";
import { TicketResponseData } from "../../../../../types/tickets.types";
import CreateTicketInterimInvoice from "./components/CreateTicketInterimInvoice";
import CreateTicketCreditNote from "./components/CreateTicketCreditNote";

const TicketAccounts = (props: {
    ticket: TicketResponseData,
    isInvoiced: boolean,
    department: DepartmentResponseData,
    getInterimInvoices: (departmentID: number) => void,
    getCreditNotes: (departmentID: number) => void,
}) => {
    const [showCreateInterim, setShowCreateInterim] = useState(false);
    const [showCreateCredit, setShowCreateCredit] = useState(false);

    return (
        <>
            <SideBarModule title="Accounts">
                {!props.isInvoiced ? <SideBarButton
                    text="Create Interim Invoice"
                    iconFont="redeem"
                    color="light-blue"
                    clickEvent={() => setShowCreateInterim(true)}
                /> : null}
                <SideBarButton
                    text="Create Credit Note"
                    iconFont="currency_exchange"
                    color="purple"
                    clickEvent={() => setShowCreateCredit(true)}
                />
            </SideBarModule>

            <CreateTicketInterimInvoice
                ticket={props.ticket} 
                show={showCreateInterim} 
                hideFunc={() => setShowCreateInterim(false)}    
                getInterimInvoices={() => props.getInterimInvoices(props.department.id)}         
            />

            <CreateTicketCreditNote
                ticket={props.ticket} 
                show={showCreateCredit} 
                hideFunc={() => setShowCreateCredit(false)}  
                getCreditNotes={() => props.getCreditNotes(props.department.id)}  
            />
        </>
    )
}

export default TicketAccounts