import { useState } from "react";
import DateInput from "../../../../../../components/form/DateInput/DateInput";
import MoneyInput from "../../../../../../components/form/MoneyInput/MoneyInput";
import SubmitButton from "../../../../../../components/form/SubmitButton/SubmitButton";
import TextareaInput from "../../../../../../components/form/TextareaInput/TextareaInput";
import TextInput from "../../../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketResponseData } from "../../../../../../types/tickets.types";
import postAPI from "../../../../../../utils/postAPI";

const CreateTicketCreditNote = (props: {
    ticket: TicketResponseData,
    show: boolean,
    hideFunc: () => void,
    getCreditNotes: () => void,
}) => {
    // Form States
    const [submitting, setSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [creditNoteDate, setCreditNoteDate] = useState<Date>(new Date());
    const [creditNoteNumber, setCreditNoteNumber] = useState('');
    const [creditValue, setCreditValue] = useState('0');

    const isComplete = (
        creditNoteNumber.length > 0 &&
        creditValue.length > 0
    )

    const completeTicket = () => {
        setHasSubmitted(true);
        if (!isComplete) return;
        postAPI('credit_notes/create', {}, {
            department_id: props.ticket.data.department_id,
            ticket_number: props.ticket.data.number,
            credit_note_date: creditNoteDate,
            credit_note_number: creditNoteNumber,
            credit_note_value: creditValue,
        }, () => {
            props.getCreditNotes();
            props.hideFunc();
        }, setSubmitting)
    }
    
    return (
        <WindowOverlay 
            title={"Create Credit Note"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Create Credit Note"
                iconFont="currency_exchange"
                color="dark-blue"
                clickFunc={completeTicket}
                submitting={submitting}
                submittingText="Creating..."
            />} 
        >
            <InfoGrid>
                <GridItem>
                    <p>Complete credit note details to create a credit note for this ticket.</p>
                </GridItem>
                <GridItem title="Credit Value">
                    <MoneyInput
                        name="credit_value"
                        label="Credit value"
                        value={creditValue}
                        updateFunc={(event) => setCreditValue(event.target.value)}
                        hasSubmitted={hasSubmitted}
                        autoFocus
                        required
                    />
                </GridItem>
                <GridItem title='Credit Note Number'>
                    <TextInput
                        name="credit_note_number"
                        label="Create note number"
                        value={creditNoteNumber}
                        updateFunc={(event) => setCreditNoteNumber(event.target.value)}
                        maxWidth={150}
                        hasSubmitted={hasSubmitted}
                        required
                    />
                </GridItem>
                <GridItem title='Credit Note Date'>
                    <DateInput
                        name="credit_note_date"
                        value={creditNoteDate}
                        updateFunc={(date: Date, _name: string) => setCreditNoteDate(new Date(date))}
                        hasSubmitted={hasSubmitted}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default CreateTicketCreditNote