import { CreditNoteResponseData } from "../../../types/creditNote.types";

const reduceCreditNoteValue = (creditNotes: Array<CreditNoteResponseData>): number => {
    return creditNotes.reduce((total, invoice) => total + invoice.data.credit_note_value, 0)
}

export default reduceCreditNoteValue;