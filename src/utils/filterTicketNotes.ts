import { TicketNoteResponseData } from '../types/ticketNotes.types';

const filterTicketNotes = (ticketComments: Array<TicketNoteResponseData>, ticketID: number, ticketType: number) => {
    return ticketComments.filter(ticketNote => 
        ticketNote.data.ticket_id === ticketID && 
        ticketNote.data.ticket_type === ticketType
    )
}

export default filterTicketNotes