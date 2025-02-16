import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import getAPI from "../../../utils/getAPI";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { TicketResponseData, TicketCollectionResponse } from "../../../types/tickets.types";

const TicketSelect = (props: {
    selectedTicket: TicketResponseData | undefined,
    setSelectedTicket: Dispatch<SetStateAction<TicketResponseData | undefined>>,
    departmentID?: number,
    required?: boolean,
    hasSubmitted: boolean
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isTicketsLoading, setIsTicketsLoading] = useState(false);
    const [ticketsData, setTicketsData] = useState<TicketCollectionResponse>();

    useEffect(() => {
        getTickets();
    }, [searchTerm])

    const getTickets = () => {
        getAPI('tickets', {
            number_like: searchTerm,
            department_ids: props.departmentID ? [props.departmentID] : undefined,
            is_active: true,
        }, (response: any) => {
            const costCentreData: TicketCollectionResponse = response.data;
            setTicketsData(costCentreData);
        }, setIsTicketsLoading);
    }

    const showRequired = props.selectedTicket === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="confirmation_number"
                resourceName="ticket"
                resourceNamePlural="tickets"
                selectedText={props.selectedTicket ? props.selectedTicket.data.number.toString() : undefined}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={ticketsData ? ticketsData.data.map(ticket => {
                    return {
                        text: ticket.data.number.toString(),
                        clickFunc: () => props.setSelectedTicket(ticket),
                        selected: props.selectedTicket?.id === ticket.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Ticket is required`}
                show={showRequired}
            />}
        </>
    )
}

export default TicketSelect