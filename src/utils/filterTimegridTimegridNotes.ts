import { TimegridResponseData } from "../types/timegrid.types"
import { TimegridNoteResponseData } from "../types/timegridNote.types"
import isSameDay from "./isSameData"

const filterTimegridTimegridNotes = (timegridNotes: Array<TimegridNoteResponseData>, timegrid: TimegridResponseData) => {
    return timegridNotes.filter(note => 
        note.data.user_id === timegrid.data.user_id && 
        isSameDay(new Date(note.data.date), new Date(timegrid.data.date))
    )
}

export default filterTimegridTimegridNotes