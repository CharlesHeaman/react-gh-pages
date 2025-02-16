import { useState } from "react";
import DateInput from "../../../../../../../components/form/DateInput/DateInput";
import MoneyInput from "../../../../../../../components/form/MoneyInput/MoneyInput";
import SubmitButton from "../../../../../../../components/form/SubmitButton/SubmitButton";
import TextareaInput from "../../../../../../../components/form/TextareaInput/TextareaInput";
import TextInput from "../../../../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { QuoteResponseData } from "../../../../../../../types/quote.types";
import postAPI from "../../../../../../../utils/postAPI";

const CreateJobInterimInvoice = (props: {
    job: QuoteResponseData,
    show: boolean,
    hideFunc: () => void,
    getInterimInvoices: () => void,
}) => {
    // Form States
    const [submitting, setSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [invoiceValue, setInvoiceValue] = useState('0');
    const [notes, setNotes] = useState('');

    const isComplete = (
        invoiceNumber.length > 0 &&
        invoiceValue.length > 0
    )

    const completeJob = () => {
        setHasSubmitted(true);
        if (!isComplete) return;
        postAPI('interim_invoices/create', {}, {
            department_id: props.job.data.department_id,
            job_number: props.job.data.number,
            invoice_date: invoiceDate,
            invoice_number: invoiceNumber,
            invoice_value: invoiceValue,
            notes: notes,
        }, () => {
            props.getInterimInvoices();
            props.hideFunc();
        }, setSubmitting)
    }
    
    return (
        <WindowOverlay 
            title={"Create Interim Invoice"} 
            maxWidth={600} 
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Create Interim Invoice"
                iconFont="redeem"
                color="dark-blue"
                clickFunc={completeJob}
                submitting={submitting}
                submittingText="Creating..."
            />} 
        >
            <InfoGrid>
                <GridItem>
                    <p>Complete invoice details and write a note to create an interim invoice for this job.</p>
                </GridItem>
                <GridItem title="Invoice Value" span={2}>
                    <MoneyInput
                        name="invoice_value"
                        label="Invoice value"
                        value={invoiceValue}
                        updateFunc={(event) => setInvoiceValue(event.target.value)}
                        hasSubmitted={hasSubmitted}
                        autoFocus
                        required
                    />
                </GridItem>
                <GridItem title='Invoice Number' span={2}>
                    <TextInput
                        name="invoice_number"
                        label="Invoice number"
                        value={invoiceNumber}
                        updateFunc={(event) => setInvoiceNumber(event.target.value)}
                        hasSubmitted={hasSubmitted}
                        required
                    />
                </GridItem>
                <GridItem title='Invoice Date' span={2}>
                    <DateInput
                        name="invoice_date"
                        value={invoiceDate}
                        updateFunc={(date: Date, _name: string) => setInvoiceDate(new Date(date))}
                        hasSubmitted={hasSubmitted}
                        required
                    />
                </GridItem>
                <GridItem title='Notes'>
                    <TextareaInput
                        name="notes"
                        label="Notes"
                        value={notes}
                        updateFunc={(event) => setNotes(event.target.value)}
                        hasSubmitted={hasSubmitted}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default CreateJobInterimInvoice