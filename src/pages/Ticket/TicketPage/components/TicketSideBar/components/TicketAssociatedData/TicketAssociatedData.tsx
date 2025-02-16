import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import TicketContactList from "./components/TicketContactList";
import UpdateCustomerInformation from "./components/UpdateCustomerInformation";
import { ContactResponseData } from "../../../../../../../types/contact.types";
import { ContractResponseData } from "../../../../../../../types/contract.types";
import { CustomerResponseData } from "../../../../../../../types/customers.types";
import { EquipmentResponseData } from "../../../../../../../types/equipment.types";
import { InvoiceTypeResponseData } from "../../../../../../../types/invoiceTypes.types";
import { SiteResponseData } from "../../../../../../../types/sites.types";
import { TicketResponseData } from "../../../../../../../types/tickets.types";
import PermsProtectedComponent from "../../../../../../../components/PermsProtectedComponent";

const TicketAssociatedData = (props: {
    ticket: TicketResponseData,
    customer: CustomerResponseData,
    site: SiteResponseData | undefined,
    equipment: EquipmentResponseData | undefined,
    contract: ContractResponseData | undefined,
    contact: ContactResponseData | undefined,
    invoiceType: InvoiceTypeResponseData | undefined,
    contactsCount: number,
    isComplete: boolean,
    setTicketData: Dispatch<SetStateAction<TicketResponseData | undefined>>
}) => {
    const [showContacts, setShowContacts] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    return (
        <>
            <SideBarModule title="Customer">
                <PermsProtectedComponent requiredPerms={{ tickets: 2 }}>
                    {!props.isComplete ? <SideBarButton
                        text="Update Customer Details"
                        iconFont="edit"
                        color="orange"
                        clickEvent={() => setShowUpdate(true)}
                    /> : null}
                </PermsProtectedComponent>
                <SideBarButton
                    text={`Contacts (${props.contactsCount})`}
                    iconFont="contact_phone"
                    clickEvent={() => setShowContacts(true)}
                />
            </SideBarModule>

            <TicketContactList 
                customerID={props.customer.id}
                siteID={props.site?.id} 
                totalCount={props.contactsCount} 
                show={showContacts} 
                hideFunc={() => setShowContacts(false)}
            />

            <UpdateCustomerInformation 
                ticketID={props.ticket.id} 
                ticketType={props.ticket.data.ticket_type} 
                customer={props.customer}
                site={props.site}
                equipment={props.equipment}
                contract={props.contract}
                contact={props.contact}
                invoiceType={props.invoiceType}
                show={showUpdate} 
                hideFunc={() => setShowUpdate(false)}
                setTicketData={props.setTicketData}
            />
        </>
    )
}

export default TicketAssociatedData